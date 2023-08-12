import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export interface TagModelType extends Document {
  tagId: string
  name: string
  url: string
  createdAt: Date
}

const schema = new Schema<TagModelType, Model<TagModelType>>({
  tagId: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  url: { type: String, unique: true, required: true },
  createdAt: { type: Date, default: new Date() }
})

const TagModel = model<TagModelType, Model<TagModelType>>('Tag', schema)

export default TagModel
