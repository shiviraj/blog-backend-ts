import CategoryService from '../service/CategoryService'
import { CategoryModelType } from '../models'
import { buildCategory, Category } from '../dto'

class CategoryController {
  private categoryService: CategoryService

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
