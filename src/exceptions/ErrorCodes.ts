const createError = (errorCode: string, errorMessage: string) => ({ errorCode, errorMessage })

export type ErrorType = { errorCode: string; errorMessage: string }

export const ErrorCode: Record<string, ErrorType> = {
  BLOG_0100: createError('BLOG_0100', 'ServerError'),
  BLOG_0101: createError('BLOG_0101', 'Invalid Credentials')
}
