import type { Document, Model } from 'mongoose'
import { model, Schema } from 'mongoose'
import type { AuthorModelType } from './Author'

export type Visibility = 'PUBLIC' | 'PRIVATE'
export type PostStatus = 'PUBLISH' | 'DRAFT'

export type Block = { _id: string, type: 'paragraph', data: { text: string } }

export interface PostModelType extends Document {
  tags: string[]
  categories: string[]
  featuredImage?: string
  postId: string,
  url: string,
  title: string,
  content: object,
  publishedContent: { time: string, blocks: Array<Block> },
  publishedOn: string,
  lastUpdateOn: string,
  createdAt: string,
  authorId: string,
  visibility: Visibility,
  postStatus: PostStatus,
  commentsAllowed: boolean,
  author?: AuthorModelType
}

const schema = new Schema<PostModelType, Model<PostModelType>>({
  postId: { type: String },
  url: { type: String },
  title: { type: String },
  content: { type: Object },
  publishedContent: { type: Object },
  publishedOn: { type: String },
  lastUpdateOn: { type: String },
  createdAt: { type: String, default: new Date().toJSON() },
  authorId: { type: String, required: true },
  visibility: { type: String },
  postStatus: { type: String },
  featuredImage: { type: String },
  commentsAllowed: { type: Boolean, default: true },
  categories: [{ type: String }],
  tags: [{ type: String }]
})

const PostModel = model<PostModelType, Model<PostModelType>>('Post', schema)

export default PostModel
