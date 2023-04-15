import type { Request, Response } from 'express'
import express from 'express'
import { postController } from '../controllers'
import type { PostModelType } from '../../models'
import { auth } from '../auth'

const router = express.Router()

router.use(auth)

router.get('', (req: Request, res: Response) => {
  postController.getAllPostsByAuthorId(req.app.locals.authorId)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.post('', (req: Request, res: Response) => {
  postController.addNewPost(req.app.locals.authorId)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:postId', (req: Request, res: Response) => {
  postController.getPostByPostIdAndAuthorId(req.params.postId, req.app.locals.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.patch('/:postId', (req: Request, res: Response) => {
  postController.updatePostByAuthorId(req.app.locals.authorId as string, req.body.post as PostModelType)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.put('/:postId/publish', (req: Request, res: Response) => {
  postController.publishPostByPostIdAndAuthorId(req.params.postId, req.app.locals.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.post('/:postId/url-available', (req: Request, res: Response) => {
  postController.getUrlAvailability(req.params.postId, req.body.url as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

export default router
