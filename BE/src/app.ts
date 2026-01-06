import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import authRoutes from './routes/authRoutes'

const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
// Test Route
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to English Learning Platform API 🚀',
    uptime: process.uptime(),
    timestamp: new Date()
  })
})

app.use('/api/v1/auth', authRoutes)

export default app
