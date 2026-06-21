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

  // Keep behavior aligned with authController.js: allow a dev fallback secret.
  const secret = process.env.JWT_SECRET || 'dev-secret'

  try {
    const decoded = jwt.verify(token, secret)
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
