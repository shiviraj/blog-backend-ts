import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export type CommentStatus = 'APPROVED' | 'UNAPPROVED'

export interface CommentModelType extends Document {
  commentId: string
  user: { userId: string; name: string; email: string }
  postId: string
  message: string
  status: CommentStatus
  commentedOn: Date
  likes: string[]
  pinned: boolean
  parentId?: string
}

const schema = new Schema<CommentModelType, Model<CommentModelType>>({
  commentId: { type: String, unique: true, required: true },
  parentId: { type: String },
  postId: { type: String, required: true },
  user: {
    userId: { type: String, required: true, default: '0001' },
    name: { type: String, required: true },
    email: { type: String, required: true }
  },
  message: { type: String, required: true },
  status: { type: String, default: 'UNAPPROVED' },
  likes: [{ type: String }],
  pinned: { type: Boolean, default: false },
  commentedOn: { type: Date, default: new Date() }
})

const CommentModel = model<CommentModelType, Model<CommentModelType>>('Comment', schema)

export default CommentModel
