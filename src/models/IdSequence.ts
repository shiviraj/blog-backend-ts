import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export interface IdSequenceModelType extends Document {
  name: string
  sequence: number
}

const schema = new Schema<IdSequenceModelType, Model<IdSequenceModelType>>({
  name: { type: String, unique: true, required: true },
  sequence: { type: Number, required: true }
})

const IdSequenceModel = model<IdSequenceModelType, Model<IdSequenceModelType>>('IdSequence', schema)

export default IdSequenceModel
