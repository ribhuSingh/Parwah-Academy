import express from 'express'
import auth from '../middleware/auth.js'
import { getUsers } from '../controllers/userController.js'

const router = express.Router()

// GET /api/users - list users (protected)
router.get('/', auth, getUsers)

export default router
