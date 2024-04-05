import { Request, Response, NextFunction } from "express"
import { verifyJwt } from "../libs"

export const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies?.accessToken
  const refreshToken = req.cookies.refreshToken

  if (!accessToken) return next()

  const { decoded, expired } = verifyJwt(accessToken)

  if (decoded) {
    res.locals.user = decoded
    return next()
  }

  return next()
}
