import app from './app'
import connectDB from './db'

const port = Number(process.env.PORT) || 3001

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`server started on port ${port}`)
    })
  })
  .catch((error: Error) => {
    console.log('Failed to connect DB', error)
  })
