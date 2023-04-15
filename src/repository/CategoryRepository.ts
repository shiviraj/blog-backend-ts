import Repository from './Repository'
import type { CategoryModelType } from '../models'
import { CategoryModel } from '../models'

class CategoryRepository extends Repository<CategoryModelType> {
  constructor() {
    super(CategoryModel)
  }

  findAllCategories(): Promise<CategoryModelType[]> {
    return this.findAll({})
  }

  findAllByCategoryIds(categories: string[]): Promise<CategoryModelType[]> {
    return this.findAll({ categoryId: { $in: categories } })
  }

  findByUrl(url: string): Promise<CategoryModelType> {
    return this.findOne({ url })
  }

  addCategory(categoryId: string, url: string, name: string, parentId: string): Promise<CategoryModelType> {
    return this.save({ categoryId, url, name, parentId })
  }
}

export default CategoryRepository
