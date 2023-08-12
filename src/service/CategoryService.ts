import type { CategoryRepository } from '../repository'
import { SequenceId } from '../repository'
import type { CategoryModelType } from '../models'
import type { IdGeneratorService } from './index'
import { capitalized } from '../utils'

class CategoryService {
  private readonly categoryRepository: CategoryRepository
  private readonly idGeneratorService: IdGeneratorService

  constructor(categoryRepository: CategoryRepository, idGeneratorService: IdGeneratorService) {
    this.categoryRepository = categoryRepository
    this.idGeneratorService = idGeneratorService
  }

  getAllCategory(): Promise<CategoryModelType[]> {
    return this.categoryRepository.findAllCategories()
  }

  getAllCategories(categories: string[]): Promise<CategoryModelType[]> {
    return this.categoryRepository.findAllByCategoryIds(categories)
  }

  getCategoryByUrl(categoryUrl: string): Promise<CategoryModelType> {
    return this.categoryRepository.findByUrl(categoryUrl)
  }

  addNewCategory(name: string, parentId: string): Promise<CategoryModelType> {
    return this.idGeneratorService
      .generate(SequenceId.CATEGORY)
      .then(categoryId => {
        const url = name.toLowerCase().split(' ').join('-').split('--').join('-')
        const parsedName = name
          .toLowerCase()
          .split(' ')
          .map(partialName => capitalized(partialName))
          .join(' ')
          .split('  ')
          .join(' ')
        return this.categoryRepository.addCategory(categoryId, url, parsedName, parentId)
      })
      .logOnSuccess({
        message: 'Successfully added new category',
        additionalData: {
          name
        }
      })
      .logOnError({
        errorMessage: 'Failed to add new category',
        additionalData: {
          name
        }
      })
  }
}

export default CategoryService
