import type { TagRepository } from '../repository'
import { SequenceId } from '../repository'
import type { TagModelType } from '../models'
import type { IdGeneratorService } from './index'
import { capitalized } from '../utils'

class TagService {
  private readonly tagRepository: TagRepository
  private readonly idGeneratorService: IdGeneratorService

  constructor(tagRepository: TagRepository, idGeneratorService: IdGeneratorService) {
    this.tagRepository = tagRepository
    this.idGeneratorService = idGeneratorService
  }

  getAllTags(tags?: string[]): Promise<TagModelType[]> {
    if (tags) {
      return this.tagRepository.findAllByTagIds(tags)
    }
    return this.tagRepository.findAllTags()
  }

  addNewTag(name: string): Promise<TagModelType> {
    return this.idGeneratorService.generate(SequenceId.TAG)
      .then((tagId) => {
        const url = name.toLowerCase().split(' ').join('-').split('--').join('-')
        const parsedName = name.toLowerCase().split(' ').map(partialName => capitalized(partialName)).join(' ').split('  ').join(' ')
        return this.tagRepository.saveTag(tagId, url, parsedName)
      })
      .logOnSuccess('Successfully added new tag', {}, { name })
      .logOnError('', 'Failed to add new tag', {}, { name })
  }

  getTagByUrl(tagUrl: string): Promise<TagModelType> {
    return this.tagRepository.findByUrl(tagUrl)
  }
}

export default TagService
