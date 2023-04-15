import { CategoryModelType } from '../models'

export interface Category {
  categoryId: string
  name: string
  url: string
  parentId: string
}

export const buildCategory = (category: CategoryModelType): Category => {
  return {
    parentId: category.parentId,
    categoryId: category.categoryId,
    name: category.name,
    url: category.url
  }
}
