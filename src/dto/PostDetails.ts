import type { AuthorModelType, CategoryModelType, CommentModelType, PostModelType, TagModelType } from '../models'
import type { Author } from './Author'
import { buildAuthor } from './Author'
import type { Tag } from './Tag'
import { buildTag } from './Tag'
import type { Category } from './Category'
import { buildCategory } from './Category'
import type { Comment } from './Comment'
import { buildComment } from './Comment'
import { buildPostSummary, generateSummary } from './PostSummary'

export interface PostDetails {
  postId: string,
  url: string,
  title: string,
  publishedOn: Date,
  lastUpdateOn: Date,
  commentsAllowed: boolean,
  author: Author,
  featuredImage?: string
  comments: Comment[],
  tags: Tag[],
  categories: Category[],
  content: any,
  likes: string[],
  summary: string
}

export const buildPostDetails = (post: PostModelType, author: AuthorModelType, tags: TagModelType[], categories: CategoryModelType[], comments: CommentModelType[]): PostDetails => {
  return {
    author: buildAuthor(author),
    commentsAllowed: post.commentsAllowed,
    lastUpdateOn: post.lastUpdateOn,
    publishedOn: post.publishedOn,
    title: post.title,
    url: post.url,
    postId: post.postId,
    featuredImage: post.featuredImage,
    comments: comments.map(buildComment),
    categories: categories.map(buildCategory),
    tags: tags.map(buildTag),
    content: post.publishedContent,
    likes: post.likes,
    summary: generateSummary(post).replace(/(<([^>]+)>)/ig, ' ')
  }
}
