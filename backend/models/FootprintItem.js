import mongoose from 'mongoose'

const footprintItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconKey: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('FootprintItem', footprintItemSchema)

