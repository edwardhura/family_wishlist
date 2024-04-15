import { Request, Response } from 'express'
import {
  getGoogleOAuthTokens,
  getGoogleUser,
} from '../services/googleOauthService'
import { upsert as upsertUserData } from '../services/usersService'
import { upsertSession, reIssueAccessToken } from '../services/sessionsService'
import express from 'express'
import { logger, signJwt } from '../libs'
import { requireUser } from '../middleware'

const router = express.Router()

router.delete('/', requireUser, async (req: Request, res: Response) => {
  try {
    // update a session
    const session = await upsertSession({
      userUuid: res.locals.user.uuid,
      valid: false,
      userAgent: req.get('user-agent') || '',
    })

    console.log(session)
    if (session.valid) {
      res.status(403).json({ success: false })
    } else {
      res.clearCookie('accessToken')
      res.clearCookie('refreshToken')
      res.status(200).json({ success: true })
    }
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken
    const accessToken = await reIssueAccessToken({ refreshToken })
    // return access & refresh tokens
    if (accessToken) {
      res.cookie('accessToken', accessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: 'localhost',
        path: '/',
        sameSite: 'strict',
        secure: false,
      })

      res.status(200).json({ success: true })
    } else {
      res.status(403).json({ success: false })
    }
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.get('/oauth/google', async (req: Request, res: Response) => {
  try {
    // Take a code from callback request
    const code = req.query.code as string
    // use code to take tokens
    const resultOAuthToken = await getGoogleOAuthTokens(code)
    // use tokens for fetching user profile data and email
    const {
      name,
      id: googleId,
      email,
      verified_email: verifiedEmail,
      picture: avatar,
    } = await getGoogleUser(resultOAuthToken)

    if (!verifiedEmail) {
      return res.status(403).send('Google account is not verified')
    }

    // update/create user with google account information
    const user = await upsertUserData({ name, googleId, email, avatar })

    // create/update a session
    const session = await upsertSession({
      userUuid: user.uuid,
      valid: true,
      userAgent: req.get('user-agent') || '',
    })

    // create an access token
    const accessToken = signJwt(
      { ...user, session },
      { expiresIn: process.env.ACCESS_TOKEN_TTL as string }, // 15 minutes
    )

    // create a refresh token
    const refreshToken = signJwt(
      { ...user, session },
      { expiresIn: process.env.REFRESH_TOKEN_TTL as string }, // 1 year
    )

    // return access & refresh tokens
    res.cookie('accessToken', accessToken, {
      maxAge: 900000, // 15 mins
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: false,
    })

    res.cookie('refreshToken', refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
      domain: 'localhost',
      path: '/',
      sameSite: 'strict',
      secure: false,
    })

    res.redirect(process.env.ORIGIN as string)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

export default router
