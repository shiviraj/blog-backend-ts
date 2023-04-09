import type { AuthorRepository } from '../repository'
import type { AuthorModelType } from '../models'
import { IdGeneratorService } from './index'
import { SequenceId } from '../repository'

class AuthorService {
  private readonly authorRepository: AuthorRepository
  private readonly idGeneratorService: IdGeneratorService

  constructor(authorRepository: AuthorRepository, idGeneratorService: IdGeneratorService) {
    this.authorRepository = authorRepository
    this.idGeneratorService = idGeneratorService
  }

  getAllByIds(authorIds: string[]): Promise<AuthorModelType[]> {
    return this.authorRepository.getAllByAuthorIds(authorIds)
  }

  getAuthorByAuthorId(authorId: string): Promise<AuthorModelType> {
    return this.authorRepository.findByAuthorId(authorId)
  }

  getAllAuthors(): Promise<AuthorModelType[]> {
    return this.authorRepository.findAllAuthors()
  }

  createVisitor(): Promise<string> {
    return this.idGeneratorService.generate(SequenceId.VISITOR)
  }
}

export default AuthorService
