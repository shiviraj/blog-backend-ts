import CategoryService from '../service/CategoryService'
import { CategoryModelType } from '../models'

class CategoryController {
  private categoryService: CategoryService

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService
  }

  getAllCategory(): Promise<CategoryModelType[]> {
    return this.categoryService.getAllCategory()
  }
}

export default CategoryController
