import app from './app'
import connectDB from './db'
import logger from 'logging-starter'
import { ErrorCode } from './exceptions'
import { PORT } from './config'

const port = Number(PORT)

connectDB()
  .then(() => {
    app.listen(port, () => {
      logger.info({ message: `server is started on port ${port}` })
    })
  })
  .catch((error: Error) => {
    logger.error({ errorCode: ErrorCode.BLOG_0100.errorCode, errorMessage: ErrorCode.BLOG_0100.errorMessage, error })
  })
