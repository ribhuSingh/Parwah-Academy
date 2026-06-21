import express from 'express'
import {
  getHeroSlides,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} from '../controllers/heroSlidesController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router.get('/', getHeroSlides)
router.post('/', authMiddleware, upload.single('image'), createHeroSlide)
router.patch('/:id', authMiddleware, upload.single('image'), updateHeroSlide)
router.delete('/:id', authMiddleware, deleteHeroSlide)

export default router

