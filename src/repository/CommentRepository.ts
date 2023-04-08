import Repository from './Repository'
import { CommentModel, CommentModelType } from '../models'
import { FilterQuery } from 'mongoose'

type CommentStatus = 'APPROVED' | 'UNAPPROVED'

class CommentRepository extends Repository<CommentModelType> {
  constructor() {
    super(CommentModel)
  }

  findAllCategories(): Promise<CommentModelType[]> {
    return this.findAll({})
  }

  findAllByCommentIds(categories: string[]): Promise<CommentModelType[]> {
    return this.findAll({ commentId: { $in: categories } })
  }

  findByUrl(url: string): Promise<CommentModelType | null> {
    return this.findOne({ url })
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
}

export default CommentRepository
