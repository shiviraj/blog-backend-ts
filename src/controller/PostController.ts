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
      .then((postAndAuthors: { post: PostModelType; author: AuthorModelType }[]) => {
        return postAndAuthors.map(({ post, author }) => buildPostSummary(post, author))
      })
  }

  getPostsCount(): Promise<PostCount> {
    return this.postService.getPostsCount()
  }

  getPostDetails(postUrl: string): Promise<PostDetails> {
    return this.postService.getPostDetailsByUrl(postUrl)
      .then(({ post, author, tags, categories }) => buildPostDetails(post, author, tags, categories))
  }
}

export default PostController
