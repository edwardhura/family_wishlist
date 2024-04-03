import { Request, Response } from "express"
import { getGoogleOAuthTokens, getGoogleUser } from '../services/googleOauthService'
import express from 'express'

const router = express.Router()

router.get('/oauth/google', async (req: Request, res: Response) => {
  try{
    const code = req.query.code as string
    const resultOAuthToken = await getGoogleOAuthTokens(code)
    const googleUser = await getGoogleUser(resultOAuthToken)
    console.log(getGoogleUser)
    res.redirect(process.env.ORIGIN as string)
  } catch(error: any) {
    console.error(error.message)
    throw new Error(error.message)
  }  
})

export default router
