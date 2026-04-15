import express from 'express'
import { protect, admin } from '../middleware/auth.js';
import { upload } from '../utils/multer.js'; // 🔥 Import multer
import { 
  getEvents, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/eventController.js'

const router = express.Router()

// GET /api/events - list events (public)
router.get('/', getEvents)

// POST /api/events - create event (protected, admin)
// 🔥 Add upload.single('image') AFTER auth middleware
router.post('/', protect, admin, upload.single('image'), createEvent)

// PATCH /api/events/:id - update event (protected, admin)
// 🔥 Add upload.single('image')
router.patch('/:id', protect, admin, upload.single('image'), updateEvent)

// DELETE /api/events/:id - delete event (protected, admin)
router.delete('/:id', protect, admin, deleteEvent)

export default router