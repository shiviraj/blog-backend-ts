import Repository from './Repository'
import { IdSequenceModel, IdSequenceModelType } from '../models'
import { UpdateWriteOpResult } from 'mongoose'

export type IdType = { name: string, length: number }
type SequenceIdType = 'comment'
export const SequenceId: Record<SequenceIdType, IdType> = {
  comment: { name: 'Comment', length: 8 }
}

class IdGeneratorRepository extends Repository<IdSequenceModelType> {
  constructor() {
    super(IdSequenceModel)
  }

  findByName(name: string): Promise<IdSequenceModelType | null> {
    return this.findOne({ name })
  }

  saveOne(name: string, sequence: number): Promise<IdSequenceModelType> {
    return this.save({ name, sequence })
  }

  updateSequenceByName(sequence: number, name: string): Promise<UpdateWriteOpResult> {
    return this.updateOne({ name }, { sequence })
  }

}

export default IdGeneratorRepository
