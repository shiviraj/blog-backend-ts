import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export interface CategoryModelType extends Document {
  categoryId: string
  name: string
  url: string,
  authorId: string
  createdAt: string
}

const schema = new Schema<CategoryModelType, Model<CategoryModelType>>({
  categoryId: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  url: { type: String, unique: true, required: true },
  authorId: { type: String },
  createdAt: { type: String, default: new Date().toJSON() }
})

const CategoryModel = model<CategoryModelType, Model<CategoryModelType>>('Category', schema)

export default CategoryModel
