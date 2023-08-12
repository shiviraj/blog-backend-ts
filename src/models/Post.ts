import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'

export type Visibility = 'PUBLIC' | 'PRIVATE'
export type PostStatus = 'PUBLISH' | 'DRAFT'

export type Block = { _id: string; type: string; data: { text: string } }

export interface PostModelType extends Document {
  tags: string[]
  categories: string[]
  featuredImage?: string
  postId: string
  url: string
  title: string
  content: { time: string; blocks: Block[] }
  publishedContent: { time: string; blocks: Block[] }
  publishedOn: Date
  lastUpdateOn: Date
  createdAt: Date
  authorId: string
  visibility: Visibility
  postStatus: PostStatus
  commentsAllowed: boolean
  likes: string[]
}

const schema = new Schema<PostModelType, Model<PostModelType>>({
  postId: { type: String, required: true, unique: true },
  url: { type: String, unique: true, required: true },
  title: { type: String, default: '' },
  content: { type: Object },
  publishedContent: { type: Object },
  publishedOn: { type: Date },
  lastUpdateOn: { type: Date },
  createdAt: { type: Date, default: new Date() },
  authorId: { type: String, required: true },
  visibility: { type: String, default: 'PUBLIC' },
  postStatus: { type: String, default: 'DRAFT' },
  featuredImage: { type: String },
  commentsAllowed: { type: Boolean, default: true },
  categories: [{ type: String }],
  tags: [{ type: String }],
  likes: [{ type: String }]
})

const PostModel = model<PostModelType, Model<PostModelType>>('Post', schema)

export default PostModel
