import type { TagModelType } from '../models'

export interface Tag {
  tagId: string
  name: string
  url: string
}

export const buildTag = (tag: TagModelType): Tag => {
  return { name: tag.name, tagId: tag.tagId, url: tag.url }
}
