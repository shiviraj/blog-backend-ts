import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { tagController } from './controllers'
import { auth } from './auth'

const router = express.Router()

router.get('', (req: Request, res: Response) => {
  tagController.getAllTags()
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.use(auth)

router.post('', (req: Request, res: Response) => {
  tagController.addNewTag(req.body.name as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

export default router
