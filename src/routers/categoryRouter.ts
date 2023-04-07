import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { CategoryController } from '../controller'
import { CategoryService } from '../service'
import { CategoryRepository } from '../repository'

const router = express.Router()

const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)
router.get('', (_req: Request, res: Response) => {
  return categoryController.getAllCategory()
    .sendSuccessResponse(res)
    .sendFailureResponse(res)
})

export default router
