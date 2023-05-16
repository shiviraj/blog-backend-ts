import Repository from './Repository'
import type { SiteModelType } from '../models'
import { SiteModel } from '../models'

class SiteRepository extends Repository<SiteModelType> {
  constructor() {
    super(SiteModel)
  }

  findSiteDetails(): Promise<SiteModelType> {
    return this.findOne({})
  }
}

export default SiteRepository
