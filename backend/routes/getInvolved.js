import express from 'express'
import { getGetInvolved, createGetInvolved, updateGetInvolved, deleteGetInvolved } from '../controllers/getInvolvedController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', getGetInvolved)
router.post('/', authMiddleware, createGetInvolved)
router.patch('/:id', authMiddleware, updateGetInvolved)
router.delete('/:id', authMiddleware, deleteGetInvolved)

export default router

