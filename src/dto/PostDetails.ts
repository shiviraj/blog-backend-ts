import { AuthorModelType, CategoryModelType, CommentModelType, PostModelType, TagModelType } from '../models'
import { Author, buildAuthor } from './Author'
import { buildTag, Tag } from './Tag'
import { buildCategory, Category } from './Category'
import { buildComment, Comment } from './Comment'

export interface PostDetails {
  postId: string,
  url: string,
  title: string,
  publishedOn: string,
  lastUpdateOn: string,
  commentsAllowed: boolean,
  author: Author,
  featuredImage?: string
  comments: Comment[],
  tags: Tag[],
  categories: Category[],
  content: any,
  likes: string[],
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
    likes: post.likes
  }
}
