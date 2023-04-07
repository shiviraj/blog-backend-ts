import type { Response } from 'express'

export {}

declare global {
  interface Promise<T> {
    sendSuccessResponse(response: Response): Promise<T>

    sendFailureResponse(response: Response, statusCode?: number, data?: Record<string, unknown>): Promise<T>
  }
}

Promise.prototype.sendSuccessResponse = function <T>(this: Promise<T>, response: Response): Promise<T> {
  return this.then((data: T) => {
    response.send(data)
    return this
  })
}

Promise.prototype.sendFailureResponse = function <T>(this: Promise<T>, response: Response, statusCode?: number, data?: Record<string, unknown>): Promise<T> {
  return this.catch(() => {
    response.status(statusCode ?? 500).send(data ?? { errorMessage: 'Server Error' })
    return this
  })
}

