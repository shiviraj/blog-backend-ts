import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export interface AuthorModelType extends Document {
  displayName?: string
  profile: string
  name: string
  userId: string
}

const schema: Schema = new Schema<AuthorModelType, Model<AuthorModelType>>({
  userId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  profile: { type: String },
  displayName: { type: String }
})

const AuthorModel = model<AuthorModelType, Model<AuthorModelType>>('User', schema)

export default AuthorModel
