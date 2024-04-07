import { Request, Response } from "express"
import express from 'express'
import { logger } from "../libs"
import { find } from '../services/usersService'

const router = express.Router()

router.get('/me', async (_req: Request, res: Response) => {
  try {
    const currentUser = res.locals.user

    if (!currentUser) { return res.status(401).json({ status: 401, code: 'Unauthorized' }) }

    const user = await find(currentUser.uuid)
    res.json(user)
  } catch(error: any) {
    logger.error(error)
    throw new Error(error.message)
  }  
})

export default router
