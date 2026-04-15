import express from 'express'
import { protect, admin } from '../middleware/auth.js';
import { getUsers } from '../controllers/userController.js'

const router = express.Router()

// GET /api/users - list users (protected)
router.get('/', protect, admin, getUsers)

export default router
