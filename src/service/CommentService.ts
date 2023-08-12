import type { CommentRepository } from '../repository'
import { SequenceId } from '../repository'
import type IdGeneratorService from './IdGeneratorService'
import type { CommentModelType, CommentStatus } from '../models'
import type { UpdateWriteOpResult } from 'mongoose'

export type CommentInputType = {
  user: { name: string; email: string; userId?: string }
  message: string
  parentId?: string
}

class CommentService {
  private readonly commentRepository: CommentRepository
  private readonly idGeneratorService: IdGeneratorService

  constructor(commentRepository: CommentRepository, idGeneratorService: IdGeneratorService) {
    this.commentRepository = commentRepository
    this.idGeneratorService = idGeneratorService
  }

  addNewComment(postId: string, comment: CommentInputType): Promise<{ status: boolean }> {
    return this.idGeneratorService
      .generate(SequenceId.COMMENT)
      .then(commentId => {
        return this.commentRepository.saveOne({
          postId,
          commentId,
          user: { name: comment.user.name.trim(), email: comment.user.email.trim(), userId: comment.user.userId },
          message: comment.message.trim(),
          parentId: comment.parentId
        })
      })
      .then(() => ({ status: true }))
      .catch(() => ({ status: false }))
  }

  getAllComments(postId: string): Promise<CommentModelType[]> {
    return this.commentRepository.findAllByPostIdAndStatus(postId, 'APPROVED')
  }

  countByPostId(postId: string): Promise<number> {
    return this.commentRepository.countByPostIdAndStatus(postId, 'APPROVED')
  }

  updateLikeOnComment(commentId: string, visitorId: string): Promise<{ likes: string[] }> {
    return this.commentRepository.findByCommentId(commentId).then((comment: CommentModelType) => {
      const likes = comment.likes.includes(visitorId)
        ? comment.likes.filter(like => like !== visitorId)
        : comment.likes.concat(visitorId)
      return this.commentRepository.updateLikesByCommentId(likes, commentId).then(() => ({ likes }))
    })
  }

  getAllCommentsByPostIds(postIds: string[]): Promise<CommentModelType[]> {
    return this.commentRepository.findAllByPostIds(postIds)
  }

  getCommentByCommentId(commentId: string): Promise<CommentModelType> {
    return this.commentRepository.findByCommentId(commentId)
  }

  updateStatusByCommentId(status: CommentStatus, commentId: string): Promise<UpdateWriteOpResult> {
    return this.commentRepository
      .updateStatusByCommentId(status, commentId)
      .logOnSuccess({
        message: 'Successfully updated comment status by commentId',
        additionalData: { commentId, status }
      })
      .logOnError({
        errorMessage: 'Failed to update comment status by commentId',
        additionalData: { commentId, status }
      })
  }
}

export default CommentService
