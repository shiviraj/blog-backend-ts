import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { postController } from './controllers'

const router = express.Router()

router.get('/page/:page', (req: Request, res: Response) => {
  postController.getPosts(req.params.page).sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

router.get('/count', (req: Request, res: Response) => {
  postController.getPostsCount().sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

router.get('/:postUrl', (req: Request, res: Response) => {
  postController.getPostDetails(req.params.postUrl).sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

router.put('/:postId/user-reaction', (req: Request, res: Response) => {
  const { visitorId } = req.body as { visitorId: string }
  postController
    .updateLikeOnPost(req.params.postId, visitorId)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

export default router
