import type { Response } from 'express'
import type { Error } from 'mongoose'
import BadRequestError from '../../exceptions/BadRequestError'
import { HttpStatus } from './number'

export {}

declare global {
  interface Promise<T> {
    sendSuccessResponse(response: Response): Promise<T>

    sendFailureResponse(response: Response, data?: Record<string, unknown>): Promise<T>

    sendFailureResponseWithNoError(response: Response, data?: Record<string, unknown>): void
  }
}

Promise.prototype.sendSuccessResponse = function <T>(this: Promise<T>, response: Response): Promise<T> {
  return this.then((data: T) => {
    response.send(data)
    return data
  })
}

Promise.prototype.sendFailureResponse = function <T>(
  this: Promise<T>,
  response: Response,
  data?: Record<string, unknown>
): Promise<T> {
  return this.catch((error: Error) => {
    if (error instanceof BadRequestError) {
      response.status(HttpStatus.BAD_REQUEST).send(data ?? { errorMessage: error.message })
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(data ?? { errorMessage: error.message })
    }
    throw error
  })
}

Promise.prototype.sendFailureResponseWithNoError = function <T>(
  this: Promise<T>,
  response: Response,
  data?: Record<string, unknown>
): void {
  this.sendFailureResponse(response, data).catch(() => ({}))
}
