import mongoose from 'mongoose'

const medicalServiceImageSchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    imageUrls: { type: [String], default: [] }, // Multiple images per card (optional)
    alt: { type: String, required: true },
    category: { type: String, required: true },
    caption: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('MedicalServiceImage', medicalServiceImageSchema)
