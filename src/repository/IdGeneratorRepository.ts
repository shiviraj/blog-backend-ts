import Repository from './Repository'
import { IdSequenceModel, IdSequenceModelType } from '../models'
import { UpdateWriteOpResult } from 'mongoose'

export type IdType = { name: string, length: number }
type SequenceIdType = {
  TOKEN: IdType
  VISITOR: IdType
  COMMENT: IdType
}
export const SequenceId: SequenceIdType = {
  TOKEN: { name: 'TOKEN', length: 16 },
  VISITOR: { name: 'Visitor', length: 16 },
  COMMENT: { name: 'Comment', length: 8 }
}

class IdGeneratorRepository extends Repository<IdSequenceModelType> {
  constructor() {
    super(IdSequenceModel)
  }

  findByName(name: string): Promise<IdSequenceModelType> {
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
