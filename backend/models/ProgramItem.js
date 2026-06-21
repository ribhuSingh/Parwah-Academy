import mongoose from 'mongoose'

const programItemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, default: '' },
    description: { type: String, required: true },
    iconKey: { type: String, default: '' },
    colorClass: { type: String, default: '' },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

export default mongoose.model('ProgramItem', programItemSchema)

