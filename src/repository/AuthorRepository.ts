import Repository from './Repository'
import type { AuthorModelType } from '../models'
import { AuthorModel } from '../models'

class AuthorRepository extends Repository<AuthorModelType> {
  constructor() {
    super(AuthorModel)
  }

  getAllByAuthorIds(authorIds: string[]): Promise<AuthorModelType[]> {
    return this.findAll({ authorId: { $in: authorIds } })
  }

  findByAuthorId(authorId: string): Promise<AuthorModelType> {
    return this.findOne({ authorId: authorId })
  }

  findAllAuthors(): Promise<AuthorModelType[]> {
    return this.findAll({})
  }

  findByEmail(email: string): Promise<AuthorModelType> {
    return this.findOne({ email })
  }
}

export default AuthorRepository
