import { Request, Response } from 'express'
import User from '../models/User'
import { generateToken } from '../utils/jwt'

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
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
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString())
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
export const login = async (req: Request, res: Response) => {
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
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id.toString())
      })
    } else {
      res.status(401).json({ message: 'Invalid email or password' })
    }
  } catch (error) {
    res.status(500).json({ message: error instanceof Error ? error.message : 'Server Error' })
  }
}
