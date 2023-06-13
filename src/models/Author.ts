import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export interface AuthorModelType extends Document {
  password: string
  displayName?: string
  profile: string
  name: string
  authorId: string,
  username: string,
  registeredAt: Date
}

const schema = new Schema<AuthorModelType, Model<AuthorModelType>>({
  authorId: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  profile: { type: String, trim: true },
  displayName: { type: String, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  registeredAt: { type: Date, required: true, default: new Date() }
})

const AuthorModel = model<AuthorModelType, Model<AuthorModelType>>('Author', schema)

export default AuthorModel
