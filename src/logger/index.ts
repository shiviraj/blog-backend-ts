import type { ErrorType } from '../exceptions'

const logInfo = <T extends Record<string, unknown>>(data: T) => {
  console.log(JSON.stringify(data))
}

const logError = <T extends Record<string, unknown>>(data: T) => {
  console.error(JSON.stringify(data))
}

const encryptData = <D extends Record<string, unknown>>(data: {}) => ''

const getTimeStamp = () => new Date().toJSON()

export const logger = {

  request<D extends Record<string, unknown>>(message: string, method: string, url: string, data: D) {
    logInfo({
      timeStamp: getTimeStamp(),
      message,
      method,
      url,
      encryptedData: encryptData(data),
      label: 'API_REQUEST'
    })
  },

  response<D extends Record<string, unknown>>(message: string, method: string, url: string, statusCode: number, responseData: D, responseTime: number) {
    logInfo({
      timeStamp: getTimeStamp(),
      message,
      method,
      url,
      statusCode,
      encryptedData: encryptData(responseData),
      responseTime,
      label: 'API_RESPONSE'
    })
  },

  info<D extends Record<string, unknown>>(message: string, data?: D, additionalData?: D, searchableFields?: D) {
    logInfo({
      timeStamp: getTimeStamp(),
      message,
      encryptedData: encryptData(data ?? {}),
      additionalData,
      searchableFields,
      label: 'INFO'
    })
  },

  error<D extends Record<string, unknown>>(errorCode: string | ErrorType, errorMessage: string = '', error?: Error, data?: D, additionalData?: D, searchableFields?: D): void {
    let code: string, message: string
    if (typeof errorCode === 'string') {
      code = errorCode
      message = errorMessage
    } else {
      code = errorCode.errorCode
      message = errorCode.errorMessage
    }
    logError({
      timeStamp: getTimeStamp(),
      errorCode: code,
      errorMessage: message,
      encryptedData: encryptData(data ?? {}),
      additionalData,
      searchableFields,
      label: 'ERROR'
    })
  }
}
