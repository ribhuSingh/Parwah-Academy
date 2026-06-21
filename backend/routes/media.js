import express from 'express'
import {
  getMedia,
  postMedia,
  patchMedia,
  deleteMedia,
  uploadMediaImages,
} from '../controllers/mediaController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router.get('/', getMedia)

router.post('/', authMiddleware, postMedia)

// Supports either `image` (single) or `images` (multiple).
router.post(
  '/upload',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 30 },
  ]),
  uploadMediaImages
)

router.patch(
  '/:id',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 30 },
  ]),
  patchMedia
)
router.delete('/:id', authMiddleware, deleteMedia)

export default router
