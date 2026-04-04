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

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/users', usersRouter)
app.use('/api/auth', authRouter)
app.use('/api/contact', contactRouter)
app.use('/api/partners', partnersRouter)
app.use('/api/committee', committeeRouter)
app.use('/api/events', eventsRouter)

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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
