class DataNotFoundError extends Error {
  private readonly errorCode: string
  private readonly errorMessage: string

  constructor(errorCode = 'BLOG_ERROR', errorMessage = 'DataNotFound') {
    super(errorMessage)
    this.errorCode = errorCode
    this.errorMessage = errorMessage
  }
}

export default DataNotFoundError
