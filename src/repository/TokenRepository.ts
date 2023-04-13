import Repository from './Repository'
import { TokenModel, TokenModelType } from '../models'
import { FilterQuery } from 'mongoose'

class TokenRepository extends Repository<TokenModelType> {
  constructor() {
    super(TokenModel)
  }

  findAllByTokenIds(tokens: string[]): Promise<TokenModelType[]> {
    return this.findAll({ tokenId: { $in: tokens } })
  }

  saveToken(tokenData: FilterQuery<TokenModelType>): Promise<TokenModelType> {
    return this.save(tokenData)
  }
}

export default TokenRepository
