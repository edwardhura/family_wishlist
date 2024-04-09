import axios from 'axios'
import qs from 'qs'
import { logger } from '../libs'

interface GoogleTokensResult {
  id_token: string
  access_token: string
  expires_in: number
  refresh_token: string
  scope: string
}

interface GoogleUserResult {
  id: string
  email: string
  verified_email: boolean
  name: string
  given_name: string
  family_name: string
  picture: string
  locale: string
}

export const getGoogleOAuthTokens = async (
  code: string,
): Promise<GoogleTokensResult> => {
  const url = process.env.GOOGLE_OAUTH2_TOKEN_URL as string

  const options = {
    code,
    client_id: process.env.GOOGLE_OAUTH2_CLIENT_ID as string,
    client_secret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_OAUTH2_REDIRECT_URL as string,
    grant_type: 'authorization_code',
  }

  try {
    const res = await axios.post<GoogleTokensResult>(
      url,
      qs.stringify(options),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )

    return res.data
  } catch (error: any) {
    logger.error(error)

    throw new Error(error.message)
  }
}

export const getGoogleUser = async ({
  id_token,
  access_token,
}: GoogleTokensResult): Promise<GoogleUserResult> => {
  const url = process.env.GOOGLE_OAUTH2_USERINFO_URL as string
  const options = { access_token }
  try {
    const res = await axios.get<GoogleUserResult>(
      `${url}?${qs.stringify(options)}`,
      {
        headers: {
          Authorization: `Bearer ${id_token}`,
        },
      },
    )
    return res.data
  } catch (error: any) {
    logger.error(error)

    throw new Error(error.message)
  }
}
