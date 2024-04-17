import { Request, Response } from 'express'
import express from 'express'
import { logger } from '../libs'
import { find, list, AvailableScopes } from '../services/usersService'
import { requireUser } from '../middleware'

const router = express.Router()

router.use(requireUser)

router.get('/me', async (_req: Request, res: Response) => {
  try {
    const user = await find(res.locals.user.uuid)
    res.status(200).json(user)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await list({ scope: req.query.scope as AvailableScopes })
    res.status(200).json(users)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

export default router
