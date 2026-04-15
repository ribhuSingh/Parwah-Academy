import mongoose from 'mongoose';

const committeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    category: { type: String, required: true },
    imageUrl: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Committee', committeeSchema);