import Repository from './Repository'
import { CategoryModel, CategoryModelType } from '../models'

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

  findByUrl(url: string): Promise<CategoryModelType | null> {
    return this.findOne({ url })
  }
}

export default CategoryRepository
