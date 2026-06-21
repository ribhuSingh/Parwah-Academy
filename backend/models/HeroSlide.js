import mongoose from 'mongoose'

const heroSlideSchema = new mongoose.Schema(
  {
    src: { type: String, required: true },
    alt: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('HeroSlide', heroSlideSchema)

