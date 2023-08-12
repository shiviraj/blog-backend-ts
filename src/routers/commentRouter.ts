import type { Request, Response } from 'express'
import express from 'express'
import { commentController } from './controllers'
import type { CommentInputType } from '../service'
import { auth } from './auth'
import type { CommentStatus } from '../models'

const router = express.Router()

router.post('/:postId', (req: Request, res: Response) => {
  commentController
    .addComment(req.params.postId, req.body as CommentInputType)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.put('/:commentId', (req: Request, res: Response) => {
  const { visitorId } = req.body as { visitorId: string }
  commentController
    .updateLikeOnComment(req.params.commentId, visitorId)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.use(auth)

router.get('', (req: Request, res: Response) => {
  commentController
    .getAllCommentsOnAuthorPosts(req.app.locals.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.put('/:commentId/update-status', (req: Request, res: Response) => {
  const { status } = req.body as { status: CommentStatus }
  commentController
    .updateStatus(req.params.commentId, req.app.locals.authorId as string, status)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

export default router
