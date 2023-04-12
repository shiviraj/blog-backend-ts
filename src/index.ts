import app from './app'
import connectDB from './db'
import { logger } from './logger'
import { ErrorCode } from './exceptions'

const port = Number(process.env.PORT) || 3001

connectDB()
  .then(() => {
    app.listen(port, () => {
      logger.info(`server is started on port ${port}`)
    })
  })
  .catch((error: Error) => {
    logger.error(ErrorCode.BLOG_0100, '', error)
  })
