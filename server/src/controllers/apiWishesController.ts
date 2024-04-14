import { Request, Response } from 'express'
import express from 'express'
import { logger } from '../libs'
import { find, list, destroy, update, create } from '../services/wishesService'

const router = express.Router()

interface IndexQueryParams {
  isDone?: boolean
}

router.get('/', async (req: Request<IndexQueryParams>, res: Response) => {
  try {
    const wishes = await list({
      userUuid: res.locals.user.uuid,
      isDone: !!req.query.isDone,
    })
    res.status(200).json(wishes)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response) => {
  try {
    const wish = await find(req.params.uuid)
    res.status(200).json(wish)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

interface CreateParams {
  title: string
  priority: string
  comment: string
  link: string
  price: number
}

router.post('/', async (req: Request<CreateParams>, res: Response) => {
  try {
    const createParams = {
      title: req.body.title as string,
      priority: req.body.priority as string,
      comment: req.body.comment as string,
      link: req.body.link as string,
      price: Number(req.body.price) as number,
      userUuid: res.locals.user.uuid as string,
    }

    const wish = await create(createParams)
    res.status(200).json(wish)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

interface UpdateParams {
  uuid: string
  title: string
  priority: string
  comment: string
  link: string
  price: number
  isDone: boolean
}

router.put('/:uuid', async (req: Request<UpdateParams>, res: Response) => {
  try {
    const updateParams = {
      uuid: req.params.uuid as string,
      title: req.body.title as string,
      priority: req.body.priority as string,
      comment: req.body.comment as string,
      link: req.body.link as string,
      price: Number(req.body.price) as number,
      isDone: req.body.isDone as boolean,
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
