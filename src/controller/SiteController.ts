import type { SiteService } from '../service'
import { SiteModelType } from '../models'

class SiteController {
  private readonly siteService: SiteService

  constructor(siteService: SiteService) {
    this.siteService = siteService
  }

  getSiteDetails(): Promise<SiteModelType> {
    return this.siteService.getSiteDetails()
  }
}

export default SiteController
