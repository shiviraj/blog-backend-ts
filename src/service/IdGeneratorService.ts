import type { IdGeneratorRepository, IdType } from '../repository'
import { Integer } from '../utils/extensions/number'

class IdGeneratorService {
  private readonly idGeneratorRepository: IdGeneratorRepository

  constructor(idGeneratorRepository: IdGeneratorRepository) {
    this.idGeneratorRepository = idGeneratorRepository
  }

  generate(sequenceId: IdType): Promise<string> {
    return this.idGeneratorRepository.findByName(sequenceId.name)
      .catch(() => {
        return this.idGeneratorRepository.saveOne(sequenceId.name, 0)
      })
      .then((id) => {
        const sequence = id.sequence.add(Integer.ONE)
        return this.idGeneratorRepository.updateSequenceByName(sequence, id.name)
          .then(() => {
            return sequence.toString().padStart(sequenceId.length, '0')
          })
      })
  }
}

export default IdGeneratorService
