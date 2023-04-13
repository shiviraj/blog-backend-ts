import jwt from 'jsonwebtoken'
import { SequenceId, TokenRepository } from '../repository'
import { IdGeneratorService } from './index'
import { JWT_SECRET } from '../config'
import { TokenModelType } from '../models'

class TokenService {
  private readonly tokenRepository: TokenRepository
  private readonly idGeneratorService: IdGeneratorService

  constructor(tokenRepository: TokenRepository, idGeneratorService: IdGeneratorService) {
    this.tokenRepository = tokenRepository
    this.idGeneratorService = idGeneratorService
  }

  generate(authorId: string): Promise<TokenModelType> {
    return this.idGeneratorService.generate(SequenceId.TOKEN)
      .then((tokenId: string) => {
        const tokenString = jwt.sign({ tokenId, authorId }, JWT_SECRET)
        return this.tokenRepository.saveToken({ tokenId, authorId, tokenString })
      })
      .logOnSuccess('Successfully generated token')
      .logOnError('', 'Failed to generate token')
  }
}

export default TokenService
