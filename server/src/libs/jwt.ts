import jwt, { SignOptions } from "jsonwebtoken"

const privateKey = process.env.RSA_PRIVATE_KEY as string
const publicKey = process.env.RSA_PUBLIC_KEY as string

export function signJwt(object: Object, options?: SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  })
}

export function verifyJwt(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    console.error(e)
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    }
  }
}
