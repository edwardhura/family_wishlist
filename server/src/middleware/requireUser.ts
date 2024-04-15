import { Request, Response, NextFunction } from 'express'

export const requireUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = res.locals.user

  if (!user) {
    return res.status(401).json({ status: 401, code: 'Unauthorized' })
  }

  return next()
}
