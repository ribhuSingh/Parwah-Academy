import Event from '../models/Event.js' 
import cloudinary from '../utils/cloudinary.js' // 🔥 Import Cloudinary

export async function getEvents(req, res) {
  try {
    const events = await Event.find().sort({ eventDate: -1 }).lean()
    const result = events.map(e => ({ ...e, id: e._id }))
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

export async function createEvent(req, res) {
  try {
    const { title, description, eventDate, location, imageUrl } = req.body
    let finalImageUrl = imageUrl || ''

    // 🔥 Upload file to Cloudinary if it exists
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'events' }, // Save in an "events" folder
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        stream.end(req.file.buffer)
      })
      finalImageUrl = uploadResult.secure_url
    }

    if (!title || !description || !eventDate || !location) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const event = await Event.create({
      title,
      description,
      eventDate: new Date(eventDate),
      location,
      imageUrl: finalImageUrl // 🔥 Save the URL to DB
    })

    res.status(201).json({ ...event.toObject(), id: event._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

// PATCH /api/events/:id - Update an event
export async function updateEvent(req, res) {
  try {
    const { id } = req.params
    const { title, description, eventDate, location, imageUrl } = req.body

    // Build the update object dynamically
    const updateData = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (eventDate) updateData.eventDate = new Date(eventDate)
    if (location) updateData.location = location
    if (imageUrl !== undefined) updateData.imageUrl = imageUrl // Keep existing text URL if passed

    // 🔥 If updating with a new image file, upload it
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'events' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        stream.end(req.file.buffer)
      })
      updateData.imageUrl = uploadResult.secure_url
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // Return the modified document
    )

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json({ ...updatedEvent.toObject(), id: updatedEvent._id })
  } catch (err) {
    console.error(err)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.status(500).json({ error: 'Database error' })
  }
}

// DELETE /api/events/:id - Delete an event
export async function deleteEvent(req, res) {
  try {
    const { id } = req.params

    const deletedEvent = await Event.findByIdAndDelete(id)

    if (!deletedEvent) {
      return res.status(404).json({ error: 'Event not found' })
    }

    res.json({ message: 'Event deleted successfully', id: deletedEvent._id })
  } catch (err) {
    console.error(err)
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.status(500).json({ error: 'Database error' })
  }
}