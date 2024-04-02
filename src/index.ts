import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import cors from "cors"
import { sessionsOauthGoogleHandler } from "./controllers/sessionsController"

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

const app: Express = express()

app.use(express.json())
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  const vars = [
    process.env.GOOGLE_OAUTH2_CLIENT_ID,
    process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH2_REDIRECT_URL,
  ]
  res.send(vars)
})

app.get('/api/sessions/oauth/google', sessionsOauthGoogleHandler)

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Listening port: ${port}`)
})
