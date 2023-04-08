import { CommentRepository, SequenceId } from '../repository'
import IdGeneratorService from './IdGeneratorService'
import { CommentModelType } from '../models'

export type CommentInputType = { user: { name: string, email: string, userId?: string }, message: string }

class CommentService {
  private commentRepository: CommentRepository
  private idGeneratorService: IdGeneratorService

  constructor(commentRepository: CommentRepository, idGeneratorService: IdGeneratorService) {
    this.commentRepository = commentRepository
    this.idGeneratorService = idGeneratorService
  }

  addNewComment(postId: string, comment: CommentInputType): Promise<{ status: boolean }> {
    return this.idGeneratorService.generate(SequenceId.comment)
      .then((commentId) => {
        return this.commentRepository.saveOne({ postId, commentId, ...comment })
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
}

export default CommentService
