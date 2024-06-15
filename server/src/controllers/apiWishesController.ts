import { Request, Response } from 'express'
import express from 'express'
import { logger } from '../libs'
import { find, list, destroy, update, create, AvailableScopes } from '../services/wishesService'
import { requireUser } from '../middleware'

const router = express.Router()

router.use(requireUser)

interface IndexQueryParams {
  isDone?: boolean
  scope?: AvailableScopes
  userUuid?: string
}

interface WishResponse {
  uuid: string
  title: string
  comment: string | null
  priority: string
  link: string | null
  price: number | null
  isDone: boolean
  userUuid: string
}

router.get('/', async (req: Request<IndexQueryParams>, res: Response<WishResponse[] | null>) => {
  try {
    const wishes = await list({
      familyUuid: res.locals.user.familyUuid,
      userUuid: req.query.userUuid ? req.query.userUuid : res.locals.user.uuid,
      isDone: !!req.query.isDone,
      scope: req.query.scope as AvailableScopes,
    })
    res.status(200).json(wishes)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response<WishResponse | null>) => {
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

router.post('/', async (req: Request<CreateParams>, res: Response<WishResponse | null>) => {
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

router.put('/:uuid', async (req: Request<UpdateParams>, res: Response<WishResponse | null>) => {
  try {
    const updateParams = {
      uuid: req.params.uuid as string,
      title: req.body.title as string,
      priority: req.body.priority as string,
      comment: req.body.comment as string,
      link: req.body.link as string,
      price: Number(req.body.price) as number,
      isDone: req.body.isDone as boolean,
    }

    const wish = await update(updateParams)
    res.status(200).json(wish)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.delete('/:uuid', async (req: Request<{ uuid: string }>, res: Response<{ success: boolean }>) => {
  try {
    await destroy(req.params.uuid as string)
    res.status(200).json({ success: true })
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

export default router
