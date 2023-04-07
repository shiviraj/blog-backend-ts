import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { postController } from './controllers'

const router = express.Router()

router.get('/page/:page', (req: Request, res: Response) => {
  return postController.getPosts(req.params.page)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/count', (req: Request, res: Response) => {
  return postController.getPostsCount()
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/:postUrl', (req: Request, res: Response) => {
  return postController.getPostDetails(req.params.postUrl)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

export default router
