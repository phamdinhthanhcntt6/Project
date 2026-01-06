import dotenv from 'dotenv'

dotenv.config()

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI:
    process.env.MONGO_URI ||
    'mongodb+srv://thanhdev236_db_user:LjWJool23Z49ICKt@clusterthanh.pv64hqz.mongodb.net/?appName=ClusterThanh',
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'secret_key_123'
}
