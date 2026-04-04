import express from 'express'
import auth from '../middleware/auth.js'
import { getEvents, createEvent } from '../controllers/eventController.js'

const router = express.Router()

// GET /api/events - list events (public)
router.get('/', getEvents)

// POST /api/events - create event (protected)
router.post('/', auth, createEvent)

export default router