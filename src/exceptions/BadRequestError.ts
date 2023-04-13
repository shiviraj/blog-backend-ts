import { ErrorType } from './ErrorCodes'

class BadRequestError extends Error {
  private errorCode: string
  private errorMessage: string

  constructor(error: ErrorType | string, errorMessage: string = 'Invalid Request') {
    if (typeof error === 'string') {
      super(errorMessage)
      this.errorCode = error
      this.errorMessage = errorMessage
    } else {
      super(error.errorMessage)
      this.errorCode = error.errorCode
      this.errorMessage = error.errorMessage
    }
  }

}

export default BadRequestError
