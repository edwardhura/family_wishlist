import { Request, Response } from "express"
import { getGoogleOAuthTokens, getGoogleUser } from '../services/googleOauthService'

export const sessionsOauthGoogleHandler = async (req: Request, res: Response) => {
  try{
    const code = req.query.code as string
    const resultOAuthToken = await getGoogleOAuthTokens(code)
    const googleUser = await getGoogleUser(resultOAuthToken)
    res.send(googleUser)
  } catch(error: any) {
    console.error(error.message)
    throw new Error(error.message)
  }  
}
