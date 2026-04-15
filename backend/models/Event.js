import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventDate: { type: Date, required: true },
    location: { type: String, required: true },
    imageUrl: { type: String, default: '' }, // 🔥 Added for event images
  },
  { timestamps: true }
);

export default mongoose.model('Event', eventSchema);