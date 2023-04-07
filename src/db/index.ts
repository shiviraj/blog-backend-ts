import type { Mongoose } from 'mongoose'
import mongoose from 'mongoose'
import { MONGODB_URL } from '../config'

const connectDB = (): Promise<Mongoose> => {
  return mongoose.connect(MONGODB_URL)
}

export default connectDB
