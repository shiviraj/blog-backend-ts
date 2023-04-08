import type { FilterQuery, Model, UpdateQuery, UpdateWriteOpResult } from 'mongoose'

type QueryType = Record<string, unknown>

class Repository<T> {
  private readonly model: Model<T>

  constructor(model: Model<T>) {
    this.model = model
  }

  protected findAll<Q extends QueryType>(query?: Q): Promise<T[]> {
    return this.model.find(query ?? {})
      .then((data: T[]) => data)
  }

  protected findAllWithPage<Q extends QueryType>(query: Q, skip: number, limit: number): Promise<T[]> {
    return this.model.find(query ?? {})
      .skip(skip)
      .limit(limit)
      .then((data: T[]) => data)
  }

  protected count<Q extends QueryType>(query: Q): Promise<number> {
    return this.model.count(query)
      .then((count: number) => count)
  }

  protected findOne<Q extends QueryType>(query: Q): Promise<T | null> {
    return this.model.findOne(query)
      .then((data: T | null) => data)
  }

  protected save<Q extends QueryType>(query: Q): Promise<T> {
    return new this.model(query).save()
      .then((data: T) => data)
  }

  protected updateOne(filter: FilterQuery<T>, value: UpdateQuery<T>): Promise<UpdateWriteOpResult> {
    return this.model.updateOne(filter, value)
      .then((data: UpdateWriteOpResult) => data)
  }
}

export default Repository
