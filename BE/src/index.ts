import { connectDB } from './config/db'
import { env } from './config/env'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

const app = express()

import authRoutes from './routes/authRoutes'

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/v1/auth', authRoutes)

const startServer = async () => {
  await connectDB()

  const PORT = env.PORT
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`)
    console.log(`📡 Environment: ${env.NODE_ENV}`)
  })
}

startServer()
