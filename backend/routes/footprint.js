import express from 'express'
import { getFootprint, createFootprint, updateFootprint, deleteFootprint } from '../controllers/footprintController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getFootprint)
router.post('/', authMiddleware, createFootprint)
router.patch('/:id', authMiddleware, updateFootprint)
router.delete('/:id', authMiddleware, deleteFootprint)

export default router

