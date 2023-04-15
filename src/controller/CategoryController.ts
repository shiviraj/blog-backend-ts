import type CategoryService from '../service/CategoryService'
import type { CategoryModelType } from '../models'
import type { Category } from '../dto'
import { buildCategory } from '../dto'

class CategoryController {
  private readonly categoryService: CategoryService

  constructor(categoryService: CategoryService) {
    this.categoryService = categoryService
  }

  getAllCategory(): Promise<CategoryModelType[]> {
    return this.categoryService.getAllCategory()
  }

  getByCategoryUrl(categoryUrl: string): Promise<CategoryModelType> {
    return this.categoryService.getCategoryByUrl(categoryUrl)
  }

  addNewCategory(name: string, parentId: string): Promise<Category> {
    return this.categoryService.addNewCategory(name, parentId)
      .then(buildCategory)
  }
}

export default CategoryController
