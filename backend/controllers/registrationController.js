import Registration from '../models/Registration.js';
import Event from '../models/Event.js';
import mongoose from 'mongoose';

// @desc    Register a student for an event
// @route   POST /api/events/:id/register
// @access  Public
export async function createRegistration(req, res) {
  try {
    const { id: eventId } = req.params;
    const { studentName, email, phone, age, schoolName } = req.body;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: 'Invalid Event ID' });
    }

    // Check if the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Basic validation
    if (!studentName || !phone || !age) {
      return res.status(400).json({ message: 'Student name, phone, and age are required' });
    }

    const newRegistration = new Registration({
      eventId,
      studentName,
      email,
      phone,
      age,
      schoolName,
    });

    await newRegistration.save();

    res.status(201).json({
      message: 'Successfully registered for the event.',
      registration: newRegistration,
    });

  } catch (err) {
    console.error(err);
    // Handle duplicate key error (from the unique index)
    if (err.code === 11000) {
      return res.status(409).json({ message: 'This phone number is already registered for this event.' });
    }
    res.status(500).json({ message: 'Server error during registration.' });
  }
}

// @desc    Get all registrations for a specific event
// @route   GET /api/events/:id/registrations
// @access  Private/Admin
export async function getEventRegistrations(req, res) {
  try {
    const { id: eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
      return res.status(400).json({ message: 'Invalid Event ID' });
    }

    const registrations = await Registration.find({ eventId }).sort({ registrationDate: -1 });

    res.status(200).json(registrations);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching registrations.' });
  }
}