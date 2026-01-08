import { Request, Response } from 'express'
import User from '../models/User'
import { generateAccessToken, generateRefreshToken, verifyToken } from '../utils/jwt'
import { TypedRequest, TypedResponse, AuthResponse, ErrorResponse } from '../types/auth.types'

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (
  req: TypedRequest<{ name: string; email: string; password: string }>,
  res: TypedResponse<AuthResponse | ErrorResponse>
) => {
  try {
    const { name, email, password } = req.body

    // Simple validation
    if (!name || !email || !password) {
      res.status(400).json({ message: 'Please fill all fields' })
      return
    }

    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      res.status(400).json({ message: 'User already exists' })
      return
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    })

    if (user) {
      res.status(201).json({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: generateAccessToken(user._id.toString()),
        refreshToken: generateRefreshToken(user._id.toString())
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server Error' })
  }
}

// @desc    Auth user & get token
// @route   POST /api/v1/auth/login
// @access  Public
export const login = async (
  req: TypedRequest<{ email: string; password: string }>,
  res: TypedResponse<AuthResponse | ErrorResponse>
) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' })
      return
    }

    // Check for user
    const user = await User.findOne({ email })

    if (user && (await (user as any).matchPassword(password))) {
      res.json({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: generateAccessToken(user._id.toString()),
        refreshToken: generateRefreshToken(user._id.toString())
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server Error' })
  }
}

// @desc    Get new access token using refresh token
// @route   POST /api/v1/auth/refresh-token
// @access  Public
export const refreshToken = async (
  req: TypedRequest<{ refreshToken: string }>,
  res: TypedResponse<AuthResponse | ErrorResponse>
) => {
  try {
    const { refreshToken } = req.body

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh Token is required' })
      return
    }

    // Verify refresh token
    const decoded = verifyToken(refreshToken) as { id: string }

    // Check if user still exists
    const user = await User.findById(decoded.id)
    if (!user) {
      res.status(401).json({ message: 'User not found' })
      return
    }

    // Rotate tokens (issue new pair)
    // Note: In a production app, you might want to blacklist the old refresh token here

    res.json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken: generateAccessToken(user._id.toString()),
      refreshToken: generateRefreshToken(user._id.toString())
    })
  } catch (error) {
    res.status(401).json({ message: 'Invalid Refresh Token' })
  }
}
