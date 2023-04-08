import CommentService, { CommentInputType } from '../service/CommentService'

class CommentController {
  private commentService: CommentService

  constructor(commentService: CommentService) {
    this.commentService = commentService
  }

  addComment(postId: string, comment: CommentInputType): Promise<{ status: boolean }> {
    return this.commentService.addNewComment(postId, comment)
  }
}

export default CommentController
