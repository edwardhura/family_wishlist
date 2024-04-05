import { Express, Request, Response } from "express"
import apiSessionsController from "./controllers/apiSessionsController"
import apiUsersController from './controllers/apiUsersController'

const routes = (app: Express) => {
  app.get("/healthcheck", (_req: Request, res: Response) => res.sendStatus(200))

  app.use('/api/sessions', apiSessionsController)
  app.use('/api/users', apiUsersController)
}

export default routes
