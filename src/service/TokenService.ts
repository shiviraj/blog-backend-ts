import jwt from 'jsonwebtoken'
import type { TokenRepository } from '../repository'
import { SequenceId } from '../repository'
import type { IdGeneratorService } from './index'
import { JWT_SECRET } from '../config'
import type { TokenModelType } from '../models'

class TokenService {
  private readonly tokenRepository: TokenRepository
  private readonly idGeneratorService: IdGeneratorService

  constructor(tokenRepository: TokenRepository, idGeneratorService: IdGeneratorService) {
    this.tokenRepository = tokenRepository
    this.idGeneratorService = idGeneratorService
  }

  generate(authorId: string): Promise<TokenModelType> {
    return this.idGeneratorService
      .generate(SequenceId.TOKEN)
      .then((tokenId: string) => {
        const tokenString = jwt.sign({ tokenId, authorId }, JWT_SECRET)
        return this.tokenRepository.saveToken({ tokenId, authorId, tokenString })
      })
      .logOnSuccess({ message: 'Successfully generated token' })
      .logOnError({ errorMessage: 'Failed to generate token' })
  }

  validate(tokenString: string): Promise<TokenModelType> {
    return this.tokenRepository.findByTokenString(tokenString)
  }
}

export default TokenService
