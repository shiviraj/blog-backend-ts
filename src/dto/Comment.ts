import { CommentModelType } from '../models'

export interface Comment {
  user: { name: string, userId: string }
  commentId: string
  message: string
  commentedOn: string
  likes: string[]
  dislikes: string[]
}

export const buildComment = (comment: CommentModelType): Comment => {
  return {
    commentId: comment.commentId,
    commentedOn: comment.commentedOn,
    message: comment.message,
    user: { name: comment.user.name, userId: comment.user.userId },
    likes: [],
    dislikes: []
  }
}