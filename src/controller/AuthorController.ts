import type { AuthorService } from '../service'
import type { Author } from '../dto'
import { buildAuthor } from '../dto'
import type { AuthorModelType, TokenModelType } from '../models'

class AuthorController {
  private readonly authorService: AuthorService

  constructor(authorService: AuthorService) {
    this.authorService = authorService
  }

  getAllAuthors(): Promise<Author[]> {
    return this.authorService
      .getAllAuthors()
      .then((authors: AuthorModelType[]) => authors.map((author: AuthorModelType) => buildAuthor(author)))
  }

  createVisitorId(): Promise<{ visitorId: string }> {
    return this.authorService.createVisitor().then((visitorId: string) => ({ visitorId }))
  }

  login(email: string, password: string): Promise<{ token: string }> {
    return this.authorService.login(email, password).then((token: TokenModelType) => ({ token: token.tokenString }))
  }

  getAuthorByToken(token: string): Promise<Author> {
    return this.authorService.getAuthorByToken(token).then(buildAuthor)
  }

  getByUsername(username: string): Promise<AuthorModelType> {
    return this.authorService.getAuthorByUsername(username)
  }
}

export default AuthorController
