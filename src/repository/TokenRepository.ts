import Repository from './Repository'
import { TokenModel, TokenModelType } from '../models'
import { FilterQuery } from 'mongoose'

class TokenRepository extends Repository<TokenModelType> {
  constructor() {
    super(TokenModel)
  }

  saveToken(tokenData: FilterQuery<TokenModelType>): Promise<TokenModelType> {
    return this.save(tokenData)
  }

  findByTokenString(tokenString: string): Promise<TokenModelType> {
    return this.findOne({ tokenString })
  }
}

export default TokenRepository
