import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { authorController, postController } from './controllers'

const router = express.Router()

router.get('', (_req: Request, res: Response) => {
  return authorController.getAllAuthors()
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/visitor', (_req: Request, res: Response) => {
  return authorController.createVisitorId()
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/:authorId/count', (req: Request, res: Response) => {
  return postController.getCountByAuthorId(req.params.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/:authorId', (req: Request, res: Response) => {
  return authorController.getByAuthorId(req.params.authorId as string)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/:authorId/page/:page', (req: Request, res: Response) => {
  return postController.getPostsByAuthorId(req.params.authorId as string, Number(req.params.page))
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

export default router
