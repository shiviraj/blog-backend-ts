import Repository from './Repository'
import { TagModel, TagModelType } from '../models'

class TagRepository extends Repository<TagModelType> {
  constructor() {
    super(TagModel)
  }

  findAllByTagIds(tags: string[]): Promise<TagModelType[]> {
    return this.findAll({ tagId: { $in: tags } })
  }
}

export default TagRepository
