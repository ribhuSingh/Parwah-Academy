import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/User.js' // Updated path

dotenv.config()

const SALT_ROUNDS = 10

export async function register(req, res) {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })

  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS)
    const user = await User.create({ name, email, password: hashed })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
    // return only safe fields
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token })
  } catch (err) {
    console.error(err)
    // MongoDB unique violation
    if (err?.code === 11000) return res.status(409).json({ error: 'Email already exists' })
    res.status(500).json({ error: 'Registration failed' })
  }
}

export async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
    res.json({ user: { id: user._id, name: user.name, email: user.email }, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
}
