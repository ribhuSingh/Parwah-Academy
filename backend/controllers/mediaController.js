import MediaImage from '../models/MediaImage.js'
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

export async function getMedia(req, res) {
  try {
    const { category } = req.query
    const filter = category ? { category } : {}

    const images = await MediaImage.find(filter).sort({ order: 1, createdAt: -1 }).lean()
    res.json(
      images.map((img) => ({
        ...img,
        id: img._id,
        imageUrls:
          Array.isArray(img.imageUrls) && img.imageUrls.length > 0
            ? img.imageUrls
            : img.src
              ? [img.src]
              : [],
      }))
    )
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch media images' })
  }
}

// Optional manual add (URL)
export async function postMedia(req, res) {
  try {
    const { src, alt, category, caption, order } = req.body
    if (!src || !alt || !category) {
      return res.status(400).json({ error: 'src, alt, and category are required' })
    }

    const newImage = await MediaImage.create({
      src,
      imageUrls: [src],
      alt,
      category,
      caption: caption || '',
      order: order || 0,
    })

    res.status(201).json({ message: 'Image added successfully', data: newImage })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to add image' })
  }
}

export async function patchMedia(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const updateData = { ...req.body }

    const files = []
    if (req.file) files.push(req.file)
    if (Array.isArray(req.files)) files.push(...req.files)
    if (req.files?.image?.length) files.push(...req.files.image)
    if (req.files?.images?.length) files.push(...req.files.images)

    if (files.length > 0) {
      const urls = []
      for (const file of files) {
        const uploadResult = await uploadToCloudinary(file.buffer, 'media')
        urls.push(uploadResult.secure_url)
      }
      updateData.src = urls[0]
      updateData.imageUrls = urls
    }

    const updatedImage = await MediaImage.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedImage) return res.status(404).json({ error: 'Image not found' })

    res.json({ message: 'Image updated successfully', data: updatedImage })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update image' })
  }
}

export async function deleteMedia(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const deleted = await MediaImage.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Image not found' })

    res.json({ message: 'Image deleted successfully' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete image' })
  }
}

// Cloudinary upload (supports one or many files)
export async function uploadMediaImages(req, res) {
  try {
    const files = []

    if (req.file) files.push(req.file)
    if (Array.isArray(req.files)) files.push(...req.files)
    if (req.files?.image?.length) files.push(...req.files.image)
    if (req.files?.images?.length) files.push(...req.files.images)

    if (files.length === 0) {
      return res.status(400).json({ error: 'No file uploaded' })
    }

    const { alt, category, caption, order } = req.body
    if (!category) return res.status(400).json({ error: 'category is required' })

    const urls = []
    for (const file of files) {
      const uploadResult = await uploadToCloudinary(file.buffer, 'media')
      urls.push(uploadResult.secure_url)
    }

    const safeAlt = (alt || '').trim() || (files[0]?.originalname ? files[0].originalname : 'Media image')

    const doc = await MediaImage.create({
      src: urls[0],
      imageUrls: urls,
      alt: safeAlt,
      category,
      caption: caption || '',
      order: order || 0,
    })

    res.json({ message: 'Images uploaded successfully', data: doc })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Upload failed' })
  }
}
