import type { Request, Response } from 'express'
import express, { NextFunction } from 'express'
import { postController } from '../controllers'
import { PostModelType } from '../../models'

const router = express.Router()

router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.app.locals.authorId) {
    return next()
  }
  return res.status(401).send({ errorMessage: 'Unauthorized user' })
})

router.get('', (req: Request, res: Response) => {
  return postController.getAllPostsByAuthorId(req.app.locals.authorId)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.post('', (req: Request, res: Response) => {
  return postController.addNewPost(req.app.locals.authorId)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:postId', (req: Request, res: Response) => {
  return postController.getPostByPostIdAndAuthorId(req.params.postId as string, req.app.locals.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.patch('/:postId', (req: Request, res: Response) => {
  return postController.updatePostByAuthorId(req.app.locals.authorId as string, req.body.post as PostModelType)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.put('/:postId/publish', (req: Request, res: Response) => {
  return postController.publishPostByPostIdAndAuthorId(req.params.postId as string, req.app.locals.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.post('/:postId/url-available', (req: Request, res: Response) => {
  return postController.getUrlAvailability(req.params.postId as string, req.body.url as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

export default router
