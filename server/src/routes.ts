import { Express, Request, Response } from 'express'
import apiSessionsController from './controllers/apiSessionsController'
import apiUsersController from './controllers/apiUsersController'
import apiWishesController from './controllers/apiWishesController'
import apiFamiliesController from './controllers/apiFamiliesController'

const routes = (app: Express) => {
  app.get('/api/healthcheck', (_req: Request, res: Response) => res.sendStatus(200))

  app.use('/api/sessions', apiSessionsController)
  app.use('/api/users', apiUsersController)
  app.use('/api/wishes', apiWishesController)
  app.use('/api/families', apiFamiliesController)
}

export default routes
