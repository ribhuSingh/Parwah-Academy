import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function (req, res, next) {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ error: 'No token provided' })

  const parts = auth.split(' ')
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ error: 'Invalid auth format' })

  const token = parts[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'dev-secret')
    req.user = { id: payload.userId }
    next()
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
