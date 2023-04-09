import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { postController } from './controllers'

const router = express.Router()

router.get('/page/:page', (req: Request, res: Response) => {
  return postController.getPosts(req.params.page)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/count', (req: Request, res: Response) => {
  return postController.getPostsCount()
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:postUrl', (req: Request, res: Response) => {
  return postController.getPostDetails(req.params.postUrl)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.put('/:postId/user-reaction', (req: Request, res: Response) => {
  return postController.updateLikeOnPost(req.params.postId, req.body.visitorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

export default router
