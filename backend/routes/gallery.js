import express from 'express'
import {
  getGallery,
  postGallery,
  patchGallery,
  deleteGallery,
  uploadGalleryImage // ✅ ADD THIS
} from '../controllers/galleryController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


import { upload } from '../utils/multer.js' // ✅ ADD THIS

const router = express.Router()

// GET all images
router.get('/', getGallery)

// POST (manual URL - optional)
router.post('/',authMiddleware, postGallery)

// 🔥 CLOUDINARY UPLOAD (MAIN)
router.post('/upload',authMiddleware, upload.single('image'), uploadGalleryImage)

// PATCH
router.patch('/:id', authMiddleware, upload.single('image'), patchGallery)

// DELETE
router.delete('/:id',authMiddleware, deleteGallery)

export default router