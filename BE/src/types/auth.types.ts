import { Request, Response } from 'express'
import { Send } from 'express-serve-static-core'

export interface TypedRequest<T> extends Request {
  body: T
}

export interface TypedResponse<T> extends Response {
  json: Send<T, this>
}

export interface AuthResponse {
  _id: string
  name: string
  email: string
  role: string
  accessToken: string
  refreshToken: string
}

export interface ErrorResponse {
  message: string
}
