import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
    index: true, // Add index for faster lookups by event
  },
  studentName: {
    type: String,
    required: [true, 'Student name is required'],
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // Not required, but if provided, should be a valid email
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
  },
  schoolName: { // As requested
    type: String,
    trim: true,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

// To prevent a student from registering for the same event multiple times with the same phone number.
registrationSchema.index({ eventId: 1, phone: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;