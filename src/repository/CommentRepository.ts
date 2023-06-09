import Repository from './Repository'
import type { CommentModelType } from '../models'
import { CommentModel } from '../models'
import type { FilterQuery, UpdateWriteOpResult } from 'mongoose'

type CommentStatus = 'APPROVED' | 'UNAPPROVED'

class CommentRepository extends Repository<CommentModelType> {
  constructor() {
    super(CommentModel)
  }

  saveOne(query: FilterQuery<CommentModelType>): Promise<CommentModelType> {
    return this.save(query)
  }

  findAllByPostIdAndStatus(postId: string, status: CommentStatus): Promise<CommentModelType[]> {
    return this.findAll({ postId, status })
  }

  countByPostIdAndStatus(postId: string, status: string): Promise<number> {
    return this.count({ postId, status })
  }

  findByCommentId(commentId: string): Promise<CommentModelType> {
    return this.findOne({ commentId })
  }

  updateLikesByCommentId(likes: string[], commentId: string): Promise<UpdateWriteOpResult> {
    return this.updateOne({ commentId }, { likes })
  }

  findAllByPostIds(postIds: string[]): Promise<CommentModelType[]> {
    return this.findAll({ postId: { $in: postIds } })
  }

  updateStatusByCommentId(status: CommentStatus, commentId: string): Promise<UpdateWriteOpResult> {
    return this.updateOne({ commentId }, { status })
  }
}

export default CommentRepository
