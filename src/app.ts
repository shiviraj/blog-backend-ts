import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import cors from 'cors'
import './controller'
import router from './router'

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (_req: Request, res: Response) => {
  res.send({ message: 'Hello! you have just arrived at Poetry server' })
})

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log({ message: 'Received Request', data: { method: req.method, url: req.url } })
  const send = res.send
  res.send = function(data: any) {
    console.log({
      message: 'Response for the request',
      data: { method: req.method, url: req.url, statusCode: res.statusCode }
    })
    return send.call(this, data)
  }
  next()
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