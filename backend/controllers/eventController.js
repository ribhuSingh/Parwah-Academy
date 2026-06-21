import Event from '../models/Event.js'
import cloudinary from '../utils/cloudinary.js'

async function uploadToCloudinary(buffer, folder) {
  return await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) reject(error)
      else resolve(result)
    })
    stream.end(buffer)
  })
}

function collectFiles(req) {
  const files = []
  if (req.file) files.push(req.file)
  if (Array.isArray(req.files)) files.push(...req.files)
  if (req.files?.image?.length) files.push(...req.files.image)
  if (req.files?.images?.length) files.push(...req.files.images)
  return files
}

export async function getEvents(req, res) {
  try {
    const events = await Event.find().sort({ eventDate: -1 }).lean()
    res.json(events.map((e) => ({ ...e, id: e._id })))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

export async function createEvent(req, res) {
  try {
    const { title, description, eventDate, location, imageUrl } = req.body

    if (!title || !description || !eventDate || !location) {
      return res.status(400).json({ error: 'All fields are required' })
    }

    const files = collectFiles(req)
    const uploadedUrls = []
    for (const file of files) {
      const uploadResult = await uploadToCloudinary(file.buffer, 'events')
      uploadedUrls.push(uploadResult.secure_url)
    }

    const finalImageUrls = uploadedUrls.length ? uploadedUrls : []
    const finalImageUrl = finalImageUrls[0] || imageUrl || ''

    const event = await Event.create({
      title,
      description,
      eventDate: new Date(eventDate),
      location,
      imageUrl: finalImageUrl,
      imageUrls: finalImageUrls.length ? finalImageUrls : (finalImageUrl ? [finalImageUrl] : []),
    })

    res.status(201).json({ ...event.toObject(), id: event._id })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

export async function updateEvent(req, res) {
  try {
    const { id } = req.params
    const { title, description, eventDate, location, imageUrl } = req.body

    const updateData = {}
    if (title) updateData.title = title
    if (description) updateData.description = description
    if (eventDate) updateData.eventDate = new Date(eventDate)
    if (location) updateData.location = location

    const files = collectFiles(req)
    if (files.length) {
      const uploadedUrls = []
      for (const file of files) {
        const uploadResult = await uploadToCloudinary(file.buffer, 'events')
        uploadedUrls.push(uploadResult.secure_url)
      }

      updateData.imageUrls = uploadedUrls
      updateData.imageUrl = uploadedUrls[0] || ''
    } else if (imageUrl !== undefined) {
      updateData.imageUrl = imageUrl
      updateData.imageUrls = imageUrl ? [imageUrl] : []
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    if (!updatedEvent) return res.status(404).json({ error: 'Event not found' })

    res.json({ ...updatedEvent.toObject(), id: updatedEvent._id })
  } catch (err) {
    console.error(err)
    if (err.kind === 'ObjectId') return res.status(404).json({ error: 'Event not found' })
    res.status(500).json({ error: 'Database error' })
  }
}

export async function deleteEvent(req, res) {
  try {
    const { id } = req.params

    const deletedEvent = await Event.findByIdAndDelete(id)
    if (!deletedEvent) return res.status(404).json({ error: 'Event not found' })

    res.json({ message: 'Event deleted successfully', id: deletedEvent._id })
  } catch (err) {
    console.error(err)
    if (err.kind === 'ObjectId') return res.status(404).json({ error: 'Event not found' })
    res.status(500).json({ error: 'Database error' })
  }
}

