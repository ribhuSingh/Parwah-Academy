import jwt from 'jsonwebtoken'

export function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization

  // Safely check for the header and the 'Bearer ' prefix
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token format' })
  }

  const token = authHeader.split(' ')[1]

  // Catch the edge case where the header is "Bearer " but the token string is missing
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Token is missing' })
  }

  // Prevent crashes if the environment variable is not loaded
  if (!process.env.JWT_SECRET) {
    console.error('CRITICAL: JWT_SECRET is not defined in environment variables.')
    return res.status(500).json({ error: 'Internal server error' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    // Provide granular feedback to the client
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token has expired' })
    }
    
    return res.status(401).json({ error: 'Unauthorized: Invalid token' })
  }
}