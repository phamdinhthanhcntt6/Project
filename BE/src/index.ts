import app from './app'
import { connectDB } from './config/db'
import { env } from './config/env'

const startServer = async () => {
  // Connect Database
  await connectDB()

  // Start Server
  const PORT = env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
    console.log(`📡 Environment: ${env.NODE_ENV}`)
  })
}

startServer()
