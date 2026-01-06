import app from '../src/app'
import { connectDB } from '../src/config/db'

// Connect to Database
connectDB()

// Export Express app as serverless handler
export default app
