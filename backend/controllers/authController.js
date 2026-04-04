import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { db } from '../drizzle.js'
import { users } from '../schema.js'
import { eq } from 'drizzle-orm'

dotenv.config()

const SALT_ROUNDS = 10

export async function register(req, res) {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })

  try {
    const hashed = await bcrypt.hash(password, SALT_ROUNDS)
    const inserted = await db.insert(users).values({ name, email, password: hashed }).returning()
    const user = inserted[0]
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
    // return only safe fields
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token })
  } catch (err) {
    console.error(err)
    // Postgres unique violation
    if (err?.code === '23505') return res.status(409).json({ error: 'Email already exists' })
    res.status(500).json({ error: 'Registration failed' })
  }
}

export async function login(req, res) {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1)
    if (!user) return res.status(401).json({ error: 'Invalid credentials' })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: 'Invalid credentials' })

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Login failed' })
  }
}

