import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { categoryController, postController } from './controllers'
import { auth } from './auth'

const router = express.Router()

router.get('', (_req: Request, res: Response) => {
  categoryController.getAllCategory().sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

router.get('/:categoryUrl/count', (req: Request, res: Response) => {
  postController
    .getCountByCategoryUrl(req.params.categoryUrl)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:categoryUrl', (req: Request, res: Response) => {
  categoryController
    .getByCategoryUrl(req.params.categoryUrl)
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.get('/:categoryUrl/page/:page', (req: Request, res: Response) => {
  postController
    .getPostsByCategoryUrl(req.params.categoryUrl, Number(req.params.page))
    .sendSuccessResponse(res)
    .sendFailureResponseWithNoError(res)
})

router.use(auth)

router.post('', (req: Request, res: Response) => {
  const { name, parentCategory } = req.body as { name: string; parentCategory: string }
  categoryController.addNewCategory(name, parentCategory).sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

export default router
