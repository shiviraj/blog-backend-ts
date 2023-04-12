const createError = (errorCode: string, errorMessage: string) => ({ errorCode, errorMessage })

type CodeType = 'BLOG_0100'
export type ErrorType = { errorCode: string, errorMessage: string }

export const ErrorCode: Record<CodeType, ErrorType> = {
  BLOG_0100: createError('BLOG_0100', 'ServerError')
}

