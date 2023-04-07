import type PostService from '../service/PostService'
import { buildPostDetails, buildPostSummary, PostCount, PostDetails, PostSummary } from '../dto'
import { AuthorModelType, PostModelType } from '../models'

class PostController {
  private readonly postService: PostService

  constructor(postService: PostService) {
    this.postService = postService
  }

  getPosts(page: string): Promise<Array<PostSummary>> {
    return this.postService.getPagePosts(Number(page))
      .then(this.buildPostSummary)
  }

  getPostsCount(): Promise<PostCount> {
    return this.postService.getPostsCount()
  }

  getPostDetails(postUrl: string): Promise<PostDetails> {
    return this.postService.getPostDetailsByUrl(postUrl)
      .then(({ post, author, tags, categories }) => buildPostDetails(post, author, tags, categories))
  }

  getCountByCategoryUrl(categoryUrl: string): Promise<PostCount> {
    return this.postService.getPostsCountByCategoryUrl(categoryUrl)
  }

  getPostsByCategoryUrl(categoryUrl: string, page: number) {
    return this.postService.getPostsByCategoryUrl(categoryUrl, page)
      .then(this.buildPostSummary)
  }

  getCountByAuthorId(authorId: string): Promise<PostCount> {
    return this.postService.getPostsCountByAuthorId(authorId)
  }

  getPostsByAuthorId(authorId: string, page: number): Promise<PostSummary[]> {
    return this.postService.getPostsByAuthorId(authorId, page)
      .then(this.buildPostSummary)
  }

  private buildPostSummary(postAndAuthors: { post: PostModelType; author: AuthorModelType }[]): PostSummary[] {
    return postAndAuthors.map(({ post, author }) => buildPostSummary(post, author))
  }

}

export default PostController
