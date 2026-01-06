import mongoose from 'mongoose'
import { env } from './env'

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(env.MONGO_URI)
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`)
  } catch (error) {
    if (error instanceof Error) {
      console.error(`❌ Error: ${error.message}`)
    } else {
      console.error(`❌ Unknown connection error`)
    }
    process.exit(1)
  }
}
