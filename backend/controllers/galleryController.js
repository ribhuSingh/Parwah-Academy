import GalleryImage from '../models/GalleryImage.js'
import mongoose from 'mongoose'
import cloudinary from '../utils/cloudinary.js'

// GET all images
export async function getGallery(req, res) {
  try {
    const { category } = req.query

    let filter = {}
    if (category) filter.category = category

    const images = await GalleryImage.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean()

    const result = images.map(img => ({ ...img, id: img._id }))

    res.json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch gallery images' })
  }
}

// POST (manual URL - keep for fallback)
export async function postGallery(req, res) {
  try {
    const { src, alt, category, caption, order } = req.body

    if (!src || !alt || !category) {
      return res.status(400).json({ error: 'src, alt, and category are required' })
    }

    const newImage = await GalleryImage.create({
      src,
      alt,
      category,
      caption: caption || '',
      order: order || 0,
    })

    res.status(201).json({
      message: 'Image added successfully',
      data: newImage
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to add image' })
  }
}

// PATCH
export async function patchGallery(req, res) {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const updatedImage = await GalleryImage.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    )

    if (!updatedImage) {
      return res.status(404).json({ error: 'Image not found' })
    }

    res.json({
      message: 'Image updated successfully',
      data: updatedImage
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update image' })
  }
}

// DELETE
export async function deleteGallery(req, res) {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const deletedImage = await GalleryImage.findByIdAndDelete(id)

    if (!deletedImage) {
      return res.status(404).json({ error: 'Image not found' })
    }

    res.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete image' })
  }
}

// 🔥 CLOUDINARY UPLOAD (MAIN FEATURE)
export async function uploadGalleryImage(req, res) {
  try {
    const file = req.file

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    if (!req.body.alt || !req.body.category) {
      return res.status(400).json({ error: 'alt and category are required' })
    }

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: 'gallery' },
        (error, result) => {
          if (error) reject(error)
          else resolve(result)
        }
      )
      stream.end(file.buffer)
    })

    const newImage = await GalleryImage.create({
      src: uploadResult.secure_url,
      alt: req.body.alt,
      category: req.body.category,
      caption: req.body.caption || '',
      order: req.body.order || 0,
    })

    res.json({
      message: 'Image uploaded successfully',
      data: newImage
    })

  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
}