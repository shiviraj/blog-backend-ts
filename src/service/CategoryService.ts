import { CategoryRepository } from '../repository'
import { CategoryModelType } from '../models'

class CategoryService {
  private categoryRepository: CategoryRepository

  constructor(categoryRepository: CategoryRepository) {
    this.categoryRepository = categoryRepository
  }

  getAllCategory(): Promise<CategoryModelType[]> {
    return this.categoryRepository.findAllCategories()
  }

  getAllCategories(categories: string[]): Promise<CategoryModelType[]> {
    return this.categoryRepository.findAllByCategoryIds(categories)
  }
}

export default CategoryService
