import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'
import { Integer } from '../utils/extensions'

const TOKEN_EXPIRY_IN_SECONDS = 604800

export interface TokenModelType extends Document {
  tokenId: string
  authorId: string
  tokenString: string
  createdAt: Date
  expAt: Date
}

const schema = new Schema<TokenModelType, Model<TokenModelType>>({
  tokenId: { type: String, unique: true, required: true },
  authorId: { type: String },
  tokenString: { type: String },
  createdAt: { type: Date, default: new Date() },
  expAt: {
    type: Date,
    default: new Date().setDate(new Date().getDate() + Integer.SEVEN),
    expires: TOKEN_EXPIRY_IN_SECONDS
  }
})

const TokenModel = model<TokenModelType, Model<TokenModelType>>('Token', schema)

export default TokenModel
