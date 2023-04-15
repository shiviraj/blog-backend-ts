import Repository from './Repository'
import { TagModel, TagModelType } from '../models'

class TagRepository extends Repository<TagModelType> {
  constructor() {
    super(TagModel)
  }

  findAllByTagIds(tags: string[]): Promise<TagModelType[]> {
    return this.findAll({ tagId: { $in: tags } })
  }

  findAllTags(): Promise<TagModelType[]> {
    return this.findAll({})
  }

  saveTag(tagId: string, url: string, name: string): Promise<TagModelType> {
    return this.save({ tagId, name, url })
  }
}

export default TagRepository
