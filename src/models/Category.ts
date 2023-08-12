import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export interface CategoryModelType extends Document {
  parentId: string
  categoryId: string
  name: string
  url: string
  createdAt: Date
}

const schema = new Schema<CategoryModelType, Model<CategoryModelType>>({
  categoryId: { type: String, unique: true, required: true },
  name: { type: String, unique: true, required: true },
  url: { type: String, unique: true, required: true },
  parentId: { type: String },
  createdAt: { type: Date, default: new Date() }
})

const CategoryModel = model<CategoryModelType, Model<CategoryModelType>>('Category', schema)

export default CategoryModel
