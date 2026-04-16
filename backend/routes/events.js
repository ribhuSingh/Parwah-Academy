import express from 'express';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../controllers/eventController.js';
import { createRegistration, getEventRegistrations } from '../controllers/registrationController.js';
import {admin,protect} from '../middleware/auth.js'
import { upload } from '../utils/multer.js'; // Corrected import path

const router = express.Router();

// --- Event Management Routes (for Admins) ---
router.route('/')
    .get(getEvents) // Publicly viewable
    .post(protect, admin, upload.single('image'), createEvent);

router.route('/:id')
    .patch(protect, admin, upload.single('image'), updateEvent)
    .delete(protect, admin, deleteEvent);


// --- Event Registration Routes ---
router.route('/:id/register')
    .post(createRegistration); // Public route for students to register

router.route('/:id/registrations')
    .get(protect, admin, getEventRegistrations); // Admin-only route to see who registered

export default router;