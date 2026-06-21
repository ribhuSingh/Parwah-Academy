import express from 'express'
import { getPrograms, createProgram, updateProgram, deleteProgram } from '../controllers/programsController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getPrograms)
router.post('/', authMiddleware, createProgram)
router.patch('/:id', authMiddleware, updateProgram)
router.delete('/:id', authMiddleware, deleteProgram)

export default router

