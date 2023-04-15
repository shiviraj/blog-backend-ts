import Repository from './Repository'
import type { IdSequenceModelType } from '../models'
import { IdSequenceModel } from '../models'
import type { UpdateWriteOpResult } from 'mongoose'

export type IdType = { name: string, length: number }
type SequenceIdType = {
  TAG: IdType
  CATEGORY: IdType
  POST: IdType
  TOKEN: IdType
  VISITOR: IdType
  COMMENT: IdType
}
export const SequenceId: SequenceIdType = {
  CATEGORY: { name: 'CATEGORY', length: 5 },
  COMMENT: { name: 'Comment', length: 8 },
  POST: { name: 'POST', length: 10 },
  TAG: { name: 'TAG', length: 8 },
  TOKEN: { name: 'TOKEN', length: 16 },
  VISITOR: { name: 'Visitor', length: 16 }
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
