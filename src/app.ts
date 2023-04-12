import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import './controller'
import router from './router'
import { logger } from './logger'

const app = express()
app.use(express.json())
app.use(cors())

app.use((req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date()
  logger.request('Received Request', req.method, req.url, req.body)
  const send = res.send
  let isLogged = false
  res.send = function(data: Record<string, unknown>) {
    const responseTime: number = new Date().getTime() - startTime.getTime()
    if (!isLogged) {
      logger.response('Response for the request', req.method, req.url, res.statusCode, data, responseTime)
      isLogged = true
    }
    return send.call(this, data)
  }
  next()
})

app.get('/', (_req: Request, res: Response) => {
  res.send({ message: 'Hello! you have just arrived at backend server' })
})

// app.use(async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     if (req.url === '/api/users/login') {
//       return next()
//     }
//
//     const token: [boolean, string] = TokenService.validate(req.headers.authorization || '')
//     if (!token[0]) {
//       logger.error({ ...HAErrors.HA8004 as ErrorLog })
//       res.status(401).send(HAErrors.HA8004)
//       return
//     }
//
//     if (token[1] !== 'INTERNAL_USER') {
//       res.locals.user = await userService.findUserBy(token[1])
//     }
//     next()
//   } catch (e) {
//     logger.error({ ...HAErrors.HA8004 as ErrorLog })
//     res.status(401).send(HAErrors.HA8004)
//   }
// })

app.use('/api', router)

app.use((_req: Request, res: Response) => {
  res.status(404).send({ message: 'invalid request' })
})

export default app
