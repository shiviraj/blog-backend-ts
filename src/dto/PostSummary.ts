import type { AuthorModelType, PostModelType } from '../models'
import type { Author } from './Author'
import { buildAuthor } from './Author'
import { Integer } from '../utils/extensions'

export type PostCount = { pageCount: number; postCount: number }

export interface PostSummary {
  postId: string
  url: string
  title: string
  publishedOn: Date
  lastUpdateOn: Date
  commentsAllowed: boolean
  author: Author
  featuredImage?: string
  summary: string
  comments: number
}

const MAX_LINE = 8
const MAX_CHARS = 200

export const generateSummary = (post: PostModelType): string => {
  return post.publishedContent.blocks
    .filter(block => block.type === 'paragraph')
    .slice(Integer.ZERO, MAX_LINE)
    .flatMap(block => block.data.text.split('<br>').concat(''))
    .slice(Integer.ZERO, MAX_LINE)
    .join('\n')
    .slice(Integer.ZERO, MAX_CHARS)
    .concat('... ')
}

export const buildPostSummary = (post: PostModelType, author: AuthorModelType, commentsCount: number): PostSummary => {
  return {
    author: buildAuthor(author),
    commentsAllowed: post.commentsAllowed,
    lastUpdateOn: post.lastUpdateOn,
    publishedOn: post.publishedOn,
    title: post.title,
    url: post.url,
    postId: post.postId,
    featuredImage: post.featuredImage,
    summary: generateSummary(post),
    comments: commentsCount
  }
}
