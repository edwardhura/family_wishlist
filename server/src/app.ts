import dotenv from "dotenv"
dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

import express, { Express } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import routes from "./routes"
import path from "path"
import { logger } from "./libs"
import { deserializeUser } from './middleware'

const port = process.env.PORT || 8000
const app: Express = express()

app.use(cors({ origin: process.env.ORIGIN, credentials: true }))

app.use(cookieParser())

app.use(express.json())

app.use(deserializeUser)

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`)

  routes(app)
})