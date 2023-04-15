import type PostService from '../service/PostService'
import type { PostCount, PostDetails, PostSummary } from '../dto'
import { buildPostDetails, buildPostSummary } from '../dto'
import type { AuthorModelType, PostModelType } from '../models'

class PostController {
  private readonly postService: PostService

  constructor(postService: PostService) {
    this.postService = postService
  }

  getPosts(page: string): Promise<PostSummary[]> {
    return this.postService.getPagePosts(Number(page))
      .then(this.buildPostSummary)
  }

  getPostsCount(): Promise<PostCount> {
    return this.postService.getPostsCount()
  }

  getPostDetails(postUrl: string): Promise<PostDetails> {
    return this.postService.getPostDetailsByUrl(postUrl)
      .then((postDetails) => {
        const { post, author, tags, categories, comments } = postDetails
        return buildPostDetails(post, author, tags, categories, comments)
      })
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

  private buildPostSummary(postAndAuthors: Array<{
    post: PostModelType;
    author: AuthorModelType,
    commentsCount: number
  }>): PostSummary[] {
    return postAndAuthors.map(({ post, author, commentsCount }) => buildPostSummary(post, author, commentsCount))
  }

  updateLikeOnPost(postId: string, visitorId: string): Promise<{ likes: string[] }> {
    return this.postService.updateLikeOnPost(postId, visitorId)
  }

  getAllPostsByAuthorId(authorId: string): Promise<PostModelType[]> {
    return this.postService.getAllByAuthorId(authorId)
  }

  addNewPost(authorId: string): Promise<PostModelType> {
    return this.postService.addNewPost(authorId)
  }

  getPostByPostIdAndAuthorId(postId: string, authorId: string): Promise<PostModelType> {
    return this.postService.getPostByPostIdAndAuthorId(postId, authorId)
  }

  publishPostByPostIdAndAuthorId(postId: string, authorId: string): Promise<{ status: true }> {
    return this.postService.publishPostByPostIdAndAuthorId(postId, authorId)
      .then(() => ({ status: true }))
  }

  updatePostByAuthorId(authorId: string, post: PostModelType): Promise<{ status: true }> {
    return this.postService.updatePostByAuthorId(authorId, post)
      .then(() => ({ status: true }))
  }

  getUrlAvailability(postId: string, url: string): Promise<{ status: boolean }> {
    return this.postService.getUrlAvailability(postId, url)
      .then(status => ({ status }))
  }

  getAllCommentsOnAuthorPosts(authorId: string): Promise<PostModelType[]> {
    return this.postService.getAllByAuthorId(authorId)
  }

  isValidAuthor(postId: string, authorId: string): Promise<boolean> {
    return this.postService.isValidAuthor(postId, authorId)
  }
}

export default PostController
