import type { Request, Response } from 'express'
import express, { NextFunction } from 'express'
import '../utils/extensions'
import { tagController } from './controllers'

const router = express.Router()

router.get('', (req: Request, res: Response) => {
  return tagController.getAllTags()
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.app.locals.authorId) {
    return next()
  }
  return res.status(401).send({ errorMessage: 'Unauthorized user' })
})

router.post('', (req: Request, res: Response) => {
  return tagController.addNewTag(req.body.name as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

export default router
