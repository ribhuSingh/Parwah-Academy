import express from 'express'
import {
  getMedicalServices,
  postMedicalServices,
  patchMedicalServices,
  deleteMedicalServices,
  uploadMedicalServiceImages,
} from '../controllers/medicalServicesController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { upload } from '../utils/multer.js'

const router = express.Router()

router.get('/', getMedicalServices)
router.post('/', authMiddleware, postMedicalServices)

router.post(
  '/upload',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 30 },
  ]),
  uploadMedicalServiceImages
)

router.patch(
  '/:id',
  authMiddleware,
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'images', maxCount: 30 },
  ]),
  patchMedicalServices
)
router.delete('/:id', authMiddleware, deleteMedicalServices)

export default router
