import Repository from './Repository'
import type { TokenModelType } from '../models'
import { TokenModel } from '../models'
import type { FilterQuery } from 'mongoose'

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
