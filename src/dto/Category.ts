import { CategoryModelType } from '../models'

export interface Category {
  categoryId: string
  name: string
  url: string
  authorId: string
  createdAt: string
}

export const buildCategory = (category: CategoryModelType): Category => {
  return {
    authorId: category.authorId,
    categoryId: category.categoryId,
    createdAt: category.createdAt,
    name: category.name,
    url: category.url
  }
}
