import type { NextFunction, Request, Response } from 'express'
import { HttpStatus } from '../utils/extensions'

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (req.app.locals.authorId) {
    next()
  } else {
    res.status(HttpStatus.UNAUTHORIZED).send({ errorMessage: 'Unauthorized user' })
  }
}
