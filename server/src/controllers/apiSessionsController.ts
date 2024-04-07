import { Request, Response } from "express"
import { getGoogleOAuthTokens, getGoogleUser } from '../services/googleOauthService'
import { upsert as upsertUserData } from '../services/usersService'
import { upsertSession } from "../services/sessionsService"
import express from 'express'
import { logger, signJwt } from "../libs"

const router = express.Router()

router.get('/oauth/google', async (req: Request, res: Response) => {
  try {
    // Take a code from callback request
    const code = req.query.code as string
    // use code to take tokens
    const resultOAuthToken = await getGoogleOAuthTokens(code)
    // use tokens for fetching user profile data and email
    const { name, id: googleId, email, verified_email: verifiedEmail, picture: avatar } = await getGoogleUser(resultOAuthToken)

    if (!verifiedEmail) {
      return res.status(403).send("Google account is not verified");
    }

    // update/create user with google account information
    const user = await upsertUserData({ name, googleId, email, avatar })

    // create/update a session
    await upsertSession({ userUuid: user.uuid, valid: true, userAgent: req.get("user-agent") || ""})

    // create an access token
    const accessToken = signJwt(
      { ...user },
      { expiresIn: process.env.ACCESS_TOKEN_TTL as string } // 15 minutes
    )

    // create a refresh token
    const refreshToken = signJwt(
      { ...user },
      { expiresIn: process.env.REFRESH_TOKEN_TTL as string } // 1 year
    )

    // return access & refresh tokens
    res.cookie("accessToken", accessToken, {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    })

    res.cookie("refreshToken", refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: "localhost",
      path: "/",
      sameSite: "strict",
      secure: false,
    })

    res.redirect(process.env.ORIGIN as string)
  } catch(error: any) {
    logger.error(error)
    throw new Error(error.message)
  }  
})

export default router
