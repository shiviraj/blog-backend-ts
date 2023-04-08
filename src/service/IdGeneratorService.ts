import { IdGeneratorRepository, IdType } from '../repository'
import { Integer } from '../utils/extensions/number'

class IdGeneratorService {
  private idGeneratorRepository: IdGeneratorRepository

  constructor(idGeneratorRepository: IdGeneratorRepository) {
    this.idGeneratorRepository = idGeneratorRepository
  }

  generate(idType: IdType): Promise<string> {
    return this.idGeneratorRepository.findByName(idType.name)
      .then((id) => {
        if (id === null) {
          return this.idGeneratorRepository.saveOne(idType.name, 0)
        }
        return id
      })
      .then((id) => {
        const sequence = id.sequence.add(Integer.ONE)
        return this.idGeneratorRepository.updateSequenceByName(sequence, id.name)
          .then(() => {
            return sequence.toString().padStart(idType.length, '0')
          })
      })
  }
}

export default IdGeneratorService
