import mongoose from 'mongoose'

const getInvolvedItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    iconKey: { type: String, default: '' },
    colorClass: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('GetInvolvedItem', getInvolvedItemSchema)

