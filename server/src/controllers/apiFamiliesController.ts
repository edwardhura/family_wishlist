import { Request, Response } from 'express'
import express from 'express'
import { logger } from '../libs'

import { requireUser } from '../middleware'
import { create, find, update } from '../services/familiesService'

const router = express.Router()

router.use(requireUser)

interface FamilyResponseParams {
  uuid: string
  name: string
}

interface FamilyCreateParams {
  name: string
}

interface FamilyUpdateParams extends FamilyCreateParams {
  uuid: string
}

router.get('/:uuid', async (req: Request<{ uuid: string }>, res: Response<FamilyResponseParams | null>) => {
  try {
    const family = await find(req.params.uuid)
    if (family) {
      res.status(200).json(family)
    } else {
      res.sendStatus(404)
    }
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.post('/', async (req: Request<FamilyCreateParams>, res: Response<FamilyResponseParams>) => {
  try {
    const family = await create({ name: req.body.name, userUuid: res.locals.user.uuid })
    res.status(200).json(family)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

router.put('/:uuid', async (req: Request<FamilyUpdateParams>, res: Response<FamilyResponseParams>) => {
  try {
    const family = await update({
      uuid: req.params.uuid,
      name: req.body.name,
    })
    res.status(200).json(family)
  } catch (error: any) {
    logger.error(error)
    res.sendStatus(500)
  }
})

// router.patch('/:uuid/generateToken', async (req: Request<{ uuid: string }>, res: Response<FamilyResponseParams>) => {
//   try {
//     res.status(200).json(family)
//   } catch (error: any) {
//     logger.error(error)
//     res.sendStatus(500)
//   }
// })

export default router
