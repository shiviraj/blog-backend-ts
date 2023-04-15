import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import './controller'
import router from './router'
import { logger } from './logger'
import { authorController } from './routers/controllers'
import { Author } from './dto'

const app = express()
app.use(express.json())
app.use(cors())

app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date()
  const url = req.url
  logger.request('Received Request', req.method, url, req.body)
  const send = res.send
  let isLogged = false
  res.send = function(data: Record<string, unknown>) {
    const responseTime: number = new Date().getTime() - startTime.getTime()
    if (!isLogged) {
      logger.response('Response for the request', req.method, url, res.statusCode, data, responseTime)
      isLogged = true
    }
    return send.call(this, data)
  }
  next()
})

app.get('/', (_req: Request, res: Response) => {
  res.send({ message: 'Hello! you have just arrived at backend server' })
})

app.use(async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    return await authorController.getAuthorByToken(req.headers.authorization)
      .then((author: Author) => {
        req.app.locals.authorId = author.authorId
        req.app.locals.author = author
        next()
      })
      .catch(() => next())
  }
  next()
})

app.use('/api', router)

app.use((_req: Request, res: Response) => {
  res.status(404).send({ message: 'invalid request' })
})

export default app
