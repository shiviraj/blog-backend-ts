import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export interface AuthorModelType extends Document {
  password: string
  displayName?: string
  profile: string
  name: string
  authorId: string
}

const schema = new Schema<AuthorModelType, Model<AuthorModelType>>({
  authorId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  profile: { type: String },
  displayName: { type: String }
})

const AuthorModel = model<AuthorModelType, Model<AuthorModelType>>('Author', schema)

export default AuthorModel
