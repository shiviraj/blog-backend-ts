import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { authorController, postController } from './controllers'

const router = express.Router()

router.get('', (_req: Request, res: Response) => {
  authorController.getAllAuthors().sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

router.get('/visitor', (_req: Request, res: Response) => {
  authorController.createVisitorId().sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

router.get('/:username/count', (req: Request, res: Response) => {
  authorController
    .getByUsername(req.params.username)
    .then(author => postController.getCountByAuthorId(author.authorId))
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/validate', (req: Request, res: Response) => {
  if (req.app.locals.authorId) {
    Promise.resolve(req.app.locals.author).sendSuccessResponse(res)
  } else {
    Promise.reject('').sendFailureResponseWithNoError(res)
  }
})

router.get('/:username', (req: Request, res: Response) => {
  authorController.getByUsername(req.params.username).sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

router.get('/:username/page/:page', (req: Request, res: Response) => {
  authorController
    .getByUsername(req.params.username)
    .then(author => postController.getPostsByAuthorId(author.authorId, Number(req.params.page)))
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.post('/login', (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string }
  authorController.login(email, password).sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

export default router
