import type { Request, Response } from 'express'
import express from 'express'
import { commentController } from './controllers'
import { CommentInputType } from '../service'

const router = express.Router()

router.post('/:postId', (req: Request, res: Response) => {
  return commentController.addComment(req.params.postId as string, req.body as CommentInputType)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.put('/:commentId', (req: Request, res: Response) => {
  return commentController.updateLikeOnComment(req.params.commentId as string, req.body.visitorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

export default router
