import type { NextFunction, Request, Response } from 'express'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.app.locals.authorId) {
    next(); return
  }
  return res.status(401).send({ errorMessage: 'Unauthorized user' })
}
