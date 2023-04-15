import type { AuthorModelType, PostModelType } from '../models'
import type { Author} from './Author'
import { buildAuthor } from './Author'

export type PostCount = { pageCount: number; postCount: number }

export interface PostSummary {
  postId: string,
  url: string,
  title: string,
  publishedOn: Date,
  lastUpdateOn: Date,
  commentsAllowed: boolean,
  author: Author,
  featuredImage?: string
  summary: string
  comments: number
}

const generateSummary = (post: PostModelType): string => {
  return post.publishedContent.blocks
    .filter(block => block.type === 'paragraph')
    .slice(0, 8)
    .flatMap(block => block.data.text.split('<br>').concat(''))
    .slice(0, 8)
    .join('\n')
    .slice(0, 200)
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
