import type { Request, Response } from 'express'
import express from 'express'
import '../utils/extensions'
import { siteController } from './controllers'

const router = express.Router()

router.get('', (req: Request, res: Response) => {
  siteController.getSiteDetails().sendSuccessResponse(res).sendFailureResponseWithNoError(res)
})

export default router
