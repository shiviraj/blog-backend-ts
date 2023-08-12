import type { SiteRepository } from '../repository'
import type { SiteModelType } from '../models'

class SiteService {
  private readonly siteRepository: SiteRepository

  constructor(siteRepository: SiteRepository) {
    this.siteRepository = siteRepository
  }

  getSiteDetails(): Promise<SiteModelType> {
    return this.siteRepository.findSiteDetails()
  }
}

export default SiteService
