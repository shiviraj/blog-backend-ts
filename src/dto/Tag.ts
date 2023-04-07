import { TagModelType } from '../models'

export interface Tag {
  tagId: string
  name: string
  url: string
  authorId: string
  createdAt: string
}

export const buildTag = (tag: TagModelType): Tag => {
  return { authorId: tag.authorId, createdAt: tag.createdAt, name: tag.name, tagId: tag.tagId, url: tag.url }
}
