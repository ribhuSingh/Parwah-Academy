import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, default: '' }, // Legacy single image URL
    imageUrls: { type: [String], default: [] }, // Multiple images (optional)
  },
  { timestamps: true }
)

export default mongoose.model('Event', eventSchema)

