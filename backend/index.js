import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import usersRouter from './routes/users.js'
import authRouter from './routes/auth.js'
import contactRouter from './routes/contact.js'
import partnersRouter from './routes/partners.js'
import committeeRouter from './routes/committee.js'
import eventsRouter from './routes/events.js'
import galleryRouter from './routes/gallery.js'; // New import
import connectDB from './db.js'

dotenv.config()

// Connect to MongoDB
connectDB()

const app = express()
const PORT = process.env.PORT || 5000

const defaultAllowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3001',
]

const configuredOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...configuredOrigins])]

const corsOptions = {
  origin(origin, callback) {
    // Allow same-origin, proxy, and server-to-server requests that omit Origin.
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`))
  },
  credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/contact', contactRouter)
app.use('/api/partners', partnersRouter)
app.use('/api/committee', committeeRouter)
app.use('/api/events', eventsRouter)
app.use('/api/gallery', galleryRouter); // New route

app.get('/', (req, res) => res.send('PERN backend running'))

// Serve frontend static files if present (built Vite app)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const distPath = path.resolve(__dirname, '..', 'frontend', 'dist')

if (fs.existsSync(distPath)) {
	app.use(express.static(distPath))

	// For SPA client-side routing, serve index.html for unknown routes (except /api)
	app.get('*', (req, res, next) => {
		if (req.path.startsWith('/api')) return next()
		res.sendFile(path.join(distPath, 'index.html'))
	})
}

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message, stack: process.env.NODE_ENV === 'production' ? null : err.stack });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
