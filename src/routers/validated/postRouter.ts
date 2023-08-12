import type { Request, Response } from 'express'
import express from 'express'
import { postController } from '../controllers'
import type { PostModelType } from '../../models'
import { auth } from '../auth'

const router = express.Router()

router.use(auth)

router.get('', (req: Request, res: Response) => {
  postController
    .getAllPostsByAuthorId(req.app.locals.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.post('', (req: Request, res: Response) => {
  postController
    .addNewPost(req.app.locals.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:postId', (req: Request, res: Response) => {
  postController
    .getPostByPostIdAndAuthorId(req.params.postId, req.app.locals.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.patch('/:postId', (req: Request, res: Response) => {
  const { post } = req.body as { post: PostModelType }
  postController
    .updatePostByAuthorId(req.app.locals.authorId as string, post)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.put('/:postId/publish', (req: Request, res: Response) => {
  postController
    .publishPostByPostIdAndAuthorId(req.params.postId, req.app.locals.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.post('/:postId/url-available', (req: Request, res: Response) => {
  const { url } = req.body as { url: string }
  postController.getUrlAvailability(req.params.postId, url).sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

export default router
