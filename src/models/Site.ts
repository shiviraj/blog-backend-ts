import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export interface SiteModelType extends Document {
  title: string
  shortTitle: string
  tagline?: string
  developer: {
    name: string,
    url: string
  },
  hostname: string
}

const schema = new Schema<SiteModelType, Model<SiteModelType>>({
  title: { type: String, unique: true, required: true },
  shortTitle: { type: String, unique: true, required: true },
  tagline: { type: String },
  developer: {
    name: { type: String },
    url: { type: String }
  },
  hostname: { type: String }
})

const SiteModel = model<SiteModelType, Model<SiteModelType>>('Site', schema)

export default SiteModel
