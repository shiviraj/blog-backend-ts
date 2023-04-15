import { CategoryRepository, SequenceId } from '../repository'
import { CategoryModelType } from '../models'
import { IdGeneratorService } from './index'
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
    return this.idGeneratorService.generate(SequenceId.CATEGORY)
      .then((categoryId) => {
        const url = name.toLowerCase().split(' ').join('-').split('--').join('-')
        const parsedName = name.toLowerCase().split(' ').map(partialName => capitalized(partialName)).join(' ').split('  ').join(' ')
        return this.categoryRepository.addCategory(categoryId, url, parsedName, parentId)
      })
      .logOnSuccess('Successfully added new category', {}, { name })
      .logOnError('', 'Failed to add new category', {}, { name })
  }
}

export default CategoryService
