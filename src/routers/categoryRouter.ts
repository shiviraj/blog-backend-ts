import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { categoryController, postController } from './controllers'

const router = express.Router()

router.get('', (_req: Request, res: Response) => {
  return categoryController.getAllCategory()
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/:categoryUrl/count', (req: Request, res: Response) => {
  return postController.getCountByCategoryUrl(req.params.categoryUrl as string)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/:categoryUrl', (req: Request, res: Response) => {
  return categoryController.getByCategoryUrl(req.params.categoryUrl as string)
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

router.get('/:categoryUrl/page/:page', (req: Request, res: Response) => {
  return postController.getPostsByCategoryUrl(req.params.categoryUrl as string, Number(req.params.page))
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

export default router
