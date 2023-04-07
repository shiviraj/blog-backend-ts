import type { AuthorRepository } from '../repository'
import type { AuthorModelType } from '../models'

class AuthorService {
  private readonly authorRepository: AuthorRepository

  constructor(authorRepository: AuthorRepository) {
    this.authorRepository = authorRepository
  }

  getAllByIds(authorIds: string[]): Promise<AuthorModelType[]> {
    return this.authorRepository.getAllByAuthorIds(authorIds)
  }

  getAuthorByAuthorId(authorId: string): Promise<AuthorModelType | null> {
    return this.authorRepository.findByAuthorId(authorId)
  }

  getAllAuthors(): Promise<AuthorModelType[]> {
    return this.authorRepository.findAllAuthors()
  }
}

export default AuthorService
