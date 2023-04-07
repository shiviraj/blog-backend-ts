import { TagRepository } from '../repository'
import { TagModelType } from '../models'

class TagService {
  private tagRepository: TagRepository

  constructor(tagRepository: TagRepository) {
    this.tagRepository = tagRepository
  }

  getAllTags(tags: string[]): Promise<TagModelType[]> {
    return this.tagRepository.findAllByTagIds(tags)
  }
}

export default TagService
