import { AuthorModelType } from '../models'

export interface Author {
  profile: string
  displayName: string
  authorId: string
  name: string

}

export const buildAuthor = (author: AuthorModelType): Author => {
  return {
    profile: author.profile,
    authorId: author.authorId,
    name: author.name,
    displayName: author.displayName ?? author.name
  }
}
