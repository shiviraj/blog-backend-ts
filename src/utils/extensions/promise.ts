import type { Response } from 'express'
import { Error } from 'mongoose'

export {}

declare global {
  interface Promise<T> {
    sendSuccessResponse(response: Response): Promise<T>

    sendFailureResponse(response: Response, statusCode?: number, data?: Record<string, unknown>): Promise<T>

    sendFailureResponseWithNoError(response: Response, statusCode?: number, data?: Record<string, unknown>): void

    logOnSuccess<D extends Record<string, unknown>>(message: string, data?: D): Promise<T>

    logOnError<D extends Record<string, unknown>>(errorCode: string, errorMessage: string, data?: D): Promise<T>
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
    response.status(statusCode ?? 500).send(data ?? { errorMessage: 'Server Error' })
    throw error
  })
}

Promise.prototype.sendFailureResponseWithNoError = function <T>(this: Promise<T>, response: Response, statusCode?: number, data?: Record<string, unknown>): void {
  this.sendFailureResponse(response, statusCode, data).catch()
}

Promise.prototype.logOnSuccess = function <T, D extends Record<string, unknown>>(this: Promise<T>, message: string, data?: D): Promise<T> {
  return this.then((param: T) => {
    console.log({ message, data, level: 'INFO' })
    return param
  })
}

Promise.prototype.logOnError = function <T, D extends Record<string, unknown>>(this: Promise<T>, errorCode: string, errorMessage: string, data?: D): Promise<T> {
  return this.catch((error: Error) => {
    console.error({ errorCode, errorMessage, data, level: 'ERROR' })
    throw error
  })
}

