import express from 'express'
import {
  getCommittee,
  postCommittee,
  patchCommittee,
  deleteCommittee
} from '../controllers/committeeController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../utils/multer.js' 

const router = express.Router()

router.get('/', getCommittee)

// 🔥 Add upload.single('image') AFTER authMiddleware
router.post('/', authMiddleware, upload.single('image'), postCommittee)

router.patch('/:id', authMiddleware, upload.single('image'), patchCommittee)

router.delete('/:id', authMiddleware, deleteCommittee)

export default router;