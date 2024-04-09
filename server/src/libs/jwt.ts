import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken'

const privateKey = process.env.RSA_PRIVATE_KEY as string
const publicKey = process.env.RSA_PUBLIC_KEY as string

interface SessionDecodedJwt {
  userUuid: string
  valid: string
  userAgent: string
  createdAt: string
  updatedAt: string
}

interface DecodedJwt {
  uuid: string
  email: string
  name: string
  googleId: string
  avatar: string
  createdAt: string
  updatedAt: string
  session: SessionDecodedJwt
  iat: string
  exp: string
}

interface VerifiedJwt {
  valid: boolean
  expired: boolean
  decoded: DecodedJwt | JwtPayload | string | null
}

export function signJwt(object: Object, options?: SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: 'RS256',
  })
}

export function verifyJwt(token: string): VerifiedJwt {
  try {
    let decoded = jwt.verify(token, publicKey)

    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    console.error(e)
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    }
  }
}
