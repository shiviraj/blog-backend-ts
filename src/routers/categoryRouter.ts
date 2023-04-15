import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { categoryController, postController } from './controllers'
import { auth } from './auth'

const router = express.Router()

router.get('', (_req: Request, res: Response) => {
  categoryController.getAllCategory()
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:categoryUrl/count', (req: Request, res: Response) => {
  postController.getCountByCategoryUrl(req.params.categoryUrl )
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:categoryUrl', (req: Request, res: Response) => {
  categoryController.getByCategoryUrl(req.params.categoryUrl )
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:categoryUrl/page/:page', (req: Request, res: Response) => {
  postController.getPostsByCategoryUrl(req.params.categoryUrl, Number(req.params.page))
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.use(auth)

router.post('', (req: Request, res: Response) => {
  categoryController.addNewCategory(req.body.name as string, req.body.parentCategory as string)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

export default router
