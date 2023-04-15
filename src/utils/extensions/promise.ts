import type { Response } from 'express'
import type { Error } from 'mongoose'
import BadRequestError from '../../exceptions/BadRequestError'
import { logger } from '../../logger'

export {}

declare global {
  interface Promise<T> {
    sendSuccessResponse(response: Response): Promise<T>

    sendFailureResponse(response: Response, statusCode?: number, data?: Record<string, unknown>): Promise<T>

    sendFailureResponseWithNoError(response: Response, statusCode?: number, data?: Record<string, unknown>): void

    logOnSuccess<D extends Record<string, unknown>>(message: string, data?: D, additionalData?: D, searchableFields?: D): Promise<T>

    logOnError<D extends Record<string, unknown>>(errorCode: string, errorMessage: string, data?: D, additionalData?: D, searchableFields?: D): Promise<T>
  }
}

Promise.prototype.sendSuccessResponse = function <T>(this: Promise<T>, response: Response): Promise<T> {
  return this.then((data: T) => {
    response.send(data)
    return data
  })
}

Promise.prototype.sendFailureResponse = function <T>(this: Promise<T>, response: Response, statusCode?: number, data?: Record<string, unknown>): Promise<T> {
  return this.catch((error: Error) => {
    if (error instanceof BadRequestError) {
      response.status(400).send(data ?? { errorMessage: error.message || 'Bad Request' })
    } else {
      response.status(500).send(data ?? { errorMessage: error.message || 'Server Error' })
    }
    throw error
  })
}

Promise.prototype.sendFailureResponseWithNoError = function <T>(this: Promise<T>, response: Response, statusCode?: number, data?: Record<string, unknown>): void {
  this.sendFailureResponse(response, statusCode, data).catch(() => {
  })
}

Promise.prototype.logOnSuccess = function <T, D extends Record<string, unknown>>(this: Promise<T>, message: string, data?: D, additionalData?: D, searchableFields?: D): Promise<T> {
  return this.then((param: T) => {
    logger.info(message, data, additionalData, searchableFields)
    return param
  })
}

Promise.prototype.logOnError = function <T, D extends Record<string, unknown>>(this: Promise<T>, errorCode: string, errorMessage: string, data?: D, additionalData?: D, searchableFields?: D): Promise<T> {
  return this.catch((error: Error) => {
    logger.error(errorCode, errorMessage, error, data, additionalData, searchableFields)
    throw error
  })
}

