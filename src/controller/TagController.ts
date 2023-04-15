import type TagService from '../service/TagService'
import type { Tag } from '../dto'
import { buildTag } from '../dto'

class TagController {
  private readonly tagService: TagService

  constructor(tagService: TagService) {
    this.tagService = tagService
  }

  getAllTags(): Promise<Tag[]> {
    return this.tagService.getAllTags()
      .then((tags) => tags.map(buildTag))
  }

  addNewTag(name: string): Promise<Tag> {
    return this.tagService.addNewTag(name)
      .then(buildTag)
  }
}

export default TagController
