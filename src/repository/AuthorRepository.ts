import Repository from './Repository'
import type { AuthorModelType } from '../models'
import { AuthorModel } from '../models'

class AuthorRepository extends Repository<AuthorModelType> {
  constructor() {
    super(AuthorModel)
  }

  getAllByAuthorIds(authorIds: string[]): Promise<AuthorModelType[]> {
    return this.findAll({ userId: { $in: authorIds } })
  }

  findByAuthorId(authorId: string): Promise<AuthorModelType | null> {
    return this.findOne({ userId: authorId })
  }
}

export default AuthorRepository
