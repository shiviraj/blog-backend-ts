const createError = (errorCode: string, errorMessage: string) => ({ errorCode, errorMessage })

type CodeType = 'BLOG_0100' | 'BLOG_0101'
export type ErrorType = { errorCode: string, errorMessage: string }

export const ErrorCode: Record<CodeType, ErrorType> = {
  BLOG_0100: createError('BLOG_0100', 'ServerError'),
  BLOG_0101: createError('BLOG_0101', 'Invalid Credentials')
}

