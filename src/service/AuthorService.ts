import bcrypt from 'bcrypt'
import type { AuthorRepository } from '../repository'
import { SequenceId } from '../repository'
import type { AuthorModelType, TokenModelType } from '../models'
import { IdGeneratorService, TokenService } from './index'
import BadRequestError from '../exceptions/BadRequestError'
import { ErrorCode } from '../exceptions'

class AuthorService {
  private readonly authorRepository: AuthorRepository
  private readonly idGeneratorService: IdGeneratorService
  private readonly tokenService: TokenService

  constructor(authorRepository: AuthorRepository, idGeneratorService: IdGeneratorService, tokenService: TokenService) {
    this.authorRepository = authorRepository
    this.idGeneratorService = idGeneratorService
    this.tokenService = tokenService
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

  login(email: string, password: string): Promise<TokenModelType> {
    return this.authorRepository.findByEmail(email)
      .logOnError('', 'Failed to find author by email')
      .then((author: AuthorModelType) => {
        console.log(password, author.password)
        return bcrypt.compare(password, author.password)
          .then((match) => {
            if (!match) {
              throw new BadRequestError(ErrorCode.BLOG_0101)
            }
            return this.tokenService.generate(author.authorId)
          })
          .logOnError('', 'Failed to compare the password')
      })
      .catch(() => {
        throw new BadRequestError(ErrorCode.BLOG_0101)
      })
  }
}

export default AuthorService
