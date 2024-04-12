import { Request, Response } from 'express'
import express from 'express'
import { logger } from '../libs'
import { find, list, destroy, update, create } from '../services/wishesService'

const router = express.Router()

router.get('/', async (_req: Request, res: Response) => {
  try {
    const wishes = await list({ userUuid: res.locals.user.uuid })
    res.status(200).json(wishes)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.get('/:uuid', async (req: Request, res: Response) => {
  try {
    const wish = await find(req.params.uuid as string)
    res.status(200).json(wish)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.post('/', async (req: Request, res: Response) => {
  try {
    const createParams = {
      title: req.query.title as string,
      priority: req.query.priority as string,
      comment: req.query.comment as string,
      link: req.query.link as string,
      price: Number(req.query.price) as number,
      userUuid: res.locals.user.uuid as string,
    }

    const wish = await create(createParams)
    res.status(200).json(wish)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.put('/:uuid', async (req: Request, res: Response) => {
  try {
    const updateParams = {
      uuid: req.params.uuid as string,
      title: req.query.title as string,
      priority: req.query.priority as string,
      comment: req.query.comment as string,
      link: req.query.link as string,
      price: Number(req.query.price) as number,
      userUuid: res.locals.user.uuid as string,
    }

    const wish = await update(updateParams)
    res.status(200).json(wish)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.delete('/:uuid', async (req: Request, res: Response) => {
  try {
    await destroy(req.params.uuid as string)
    res.status(200).json({ success: true })
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

export default router
