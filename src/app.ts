import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import './controller'
import router from './router'
import { authorController } from './routers/controllers'
import type { Author } from './dto'
import logger from 'logging-starter'
import { HttpStatus } from './utils/extensions'

const app = express()
app.use(express.json())
app.use(cors())

app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date()
  const url = req.url
  logger.request({
    message: 'Received Request',
    method: req.method,
    url: url,
    data: { body: req.body as Record<string, unknown> }
  })
  const send = res.send
  let isLogged = false
  res.send = function (data: Record<string, unknown>) {
    const responseTime: number = new Date().getTime() - startTime.getTime()
    if (!isLogged) {
      logger.response({
        message: 'Response for the request',
        method: req.method,
        url: url,
        statusCode: res.statusCode,
        responseTime,
        data: { body: req.body as Record<string, unknown> }
      })
      isLogged = true
    }
    return send.call(this, data)
  }
  next()
})

app.get('/', (_req: Request, res: Response) => {
  res.send({ message: 'Hello! you have just arrived at backend server' })
})

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    authorController
      .getAuthorByToken(req.headers.authorization)
      .then((author: Author) => {
        req.app.locals.authorId = author.authorId
        req.app.locals.author = author
      })
      .finally(next)
  } else {
    next()
  }
})

app.use('/api', router)

app.use((_req: Request, res: Response) => {
  res.status(HttpStatus.NOT_FOUND).send({ message: 'invalid request' })
})

export default app
