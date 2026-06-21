import HeroSlide from '../models/HeroSlide.js'
import mongoose from 'mongoose'
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

export async function getHeroSlides(req, res) {
  try {
    const slides = await HeroSlide.find().sort({ order: 1, createdAt: -1 }).lean()
    res.json(slides.map((s) => ({ ...s, id: s._id })))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch hero slides' })
  }
}

export async function createHeroSlide(req, res) {
  try {
    const { title, description, alt, order } = req.body
    if (!title || !description || !alt) {
      return res.status(400).json({ error: 'title, description, and alt are required' })
    }

    let src = (req.body.src || '').trim()
    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'home-slides')
      src = uploadResult.secure_url
    }

    if (!src) return res.status(400).json({ error: 'image is required' })

    const slide = await HeroSlide.create({
      src,
      alt,
      title,
      description,
      order: order || 0,
    })

    res.status(201).json({ message: 'Slide created successfully', data: slide })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create slide' })
  }
}

export async function updateHeroSlide(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

    const updateData = { ...req.body }

    if (req.file) {
      const uploadResult = await uploadToCloudinary(req.file.buffer, 'home-slides')
      updateData.src = uploadResult.secure_url
    }

    const updated = await HeroSlide.findByIdAndUpdate(id, updateData, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ error: 'Slide not found' })

    res.json({ message: 'Slide updated successfully', data: updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update slide' })
  }
}

export async function deleteHeroSlide(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

    const deleted = await HeroSlide.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Slide not found' })

    res.json({ message: 'Slide deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete slide' })
  }
}

