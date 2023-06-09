import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { categoryController, postController, tagController } from './controllers'
import { auth } from './auth'

const router = express.Router()

router.get('', (req: Request, res: Response) => {
  tagController.getAllTags()
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:tagUrl', (req: Request, res: Response) => {
  tagController.getByTagUrl(req.params.tagUrl)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:tagUrl/count', (req: Request, res: Response) => {
  postController.getCountByTagUrl(req.params.tagUrl)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:tagUrl/page/:page', (req: Request, res: Response) => {
  postController.getPostsByTagUrl(req.params.tagUrl, Number(req.params.page))
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
