import type { Request, Response } from 'express'
import express, { NextFunction } from 'express'
import '../utils/extensions'
import { categoryController, postController } from './controllers'

const router = express.Router()

router.get('', (_req: Request, res: Response) => {
  return categoryController.getAllCategory()
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:categoryUrl/count', (req: Request, res: Response) => {
  return postController.getCountByCategoryUrl(req.params.categoryUrl as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:categoryUrl', (req: Request, res: Response) => {
  return categoryController.getByCategoryUrl(req.params.categoryUrl as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:categoryUrl/page/:page', (req: Request, res: Response) => {
  return postController.getPostsByCategoryUrl(req.params.categoryUrl as string, Number(req.params.page))
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.use((req: Request, res: Response, next: NextFunction) => {
  if (req.app.locals.authorId) {
    return next()
  }
  return res.status(401).send({ errorMessage: 'Unauthorized user' })
})

router.post('', (req: Request, res: Response) => {
  return categoryController.addNewCategory(req.body.name as string, req.body.parentCategory as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

export default router
