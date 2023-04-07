class DataNotFoundError extends Error {
  private errorCode: string
  private errorMessage: string

  constructor(errorCode: string = 'BLOG_ERROR', errorMessage: string = 'DataNotFound') {
    super(errorMessage)
    this.errorCode = errorCode
    this.errorMessage = errorMessage
  }
}

export default DataNotFoundError
