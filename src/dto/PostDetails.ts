import { AuthorModelType, CategoryModelType, PostModelType, TagModelType } from '../models'
import { Author, buildAuthor } from './Author'
import { buildTag, Tag } from './Tag'
import { buildCategory, Category } from './Category'

export interface PostDetails {
  postId: string,
  url: string,
  title: string,
  publishedOn: string,
  lastUpdateOn: string,
  commentsAllowed: boolean,
  author: Author,
  featuredImage?: string
  comments: string[],
  tags: Tag[],
  categories: Category[],
  content: any

}

export const buildPostDetails = (post: PostModelType, author: AuthorModelType, tags: TagModelType[], categories: CategoryModelType[]): PostDetails => {
  return {
    author: buildAuthor(author),
    commentsAllowed: post.commentsAllowed,
    lastUpdateOn: post.lastUpdateOn,
    publishedOn: post.publishedOn,
    title: post.title,
    url: post.url,
    postId: post.postId,
    featuredImage: post.featuredImage,
    comments: [],
    categories: categories.map(buildCategory),
    tags: tags.map(buildTag),
    content: post.publishedContent
  }
}
