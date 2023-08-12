import type { CommentInputType } from '../service'
import type CommentService from '../service/CommentService'
import type { PostController } from './index'
import type { CommentModelType, CommentStatus } from '../models'

class CommentController {
  private readonly commentService: CommentService
  private readonly postController: PostController

  constructor(commentService: CommentService, postController: PostController) {
    this.commentService = commentService
    this.postController = postController
  }

  addComment(postId: string, comment: CommentInputType): Promise<{ status: boolean }> {
    return this.commentService.addNewComment(postId, comment)
  }

  updateLikeOnComment(commentId: string, visitorId: string): Promise<{ likes: string[] }> {
    return this.commentService.updateLikeOnComment(commentId, visitorId)
  }

  getAllCommentsOnAuthorPosts(authorId: string): Promise<CommentModelType[]> {
    return this.postController
      .getAllPostsByAuthorId(authorId)
      .then(posts => posts.map(post => post.postId))
      .then(postIds => this.commentService.getAllCommentsByPostIds(postIds))
  }

  updateStatus(commentId: string, authorId: string, commentStatus: CommentStatus): Promise<{ status: boolean }> {
    return this.commentService
      .getCommentByCommentId(commentId)
      .then(comment => {
        return this.postController.isValidAuthor(comment.postId, authorId)
      })
      .then(status => {
        if (status) {
          return this.commentService.updateStatusByCommentId(commentStatus, commentId).then(() => ({ status }))
        }
        return { status }
      })
  }
}

export default CommentController
