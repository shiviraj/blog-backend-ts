import type { FilterQuery, Model, UpdateQuery, UpdateWriteOpResult } from 'mongoose'
import { DataNotFoundError } from '../exceptions'

class Repository<T> {
  private readonly model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  protected findAll(query: FilterQuery<T>): Promise<T[]> {
    return this.model.find(query ?? {})
      .then((data: T[]) => data)
  }

  protected findAllWithPage(query: FilterQuery<T>, skip: number, limit: number): Promise<T[]> {
    return this.model.find(query ?? {})
      .skip(skip)
      .limit(limit)
      .then((data: T[]) => data)
  }

  protected count(query: FilterQuery<T>): Promise<number> {
    return this.model.count(query)
      .then((count: number) => count)
  }

  protected findOne(query: FilterQuery<T>): Promise<T> {
    return this.model.findOne(query)
      .then((data: T | null) => {
        if (data === null) {
          throw new DataNotFoundError(this.model.name)
        }
        return data
      })
  }

  protected save(query: FilterQuery<T>): Promise<T> {
    return new this.model(query).save()
      .then((data: T) => data)
  }

  protected updateOne(filter: FilterQuery<T>, value: UpdateQuery<T>): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filter, value)
      .then((data: UpdateWriteOpResult) => data)
  }
}

export default Repository
