import Committee from '../models/Committee.js'
import mongoose from 'mongoose'
import cloudinary from '../utils/cloudinary.js'

// GET all committee members
export async function getCommittee(req, res) {
  try {
    const committeeMembers = await Committee.find().sort({ _id: 1 }).lean()
    const result = committeeMembers.map(c => ({ ...c, id: c._id }))
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch committee members' })
  }
}

// POST new member (Supports both JSON and Multipart Image Uploads)
export async function postCommittee(req, res) {
  try {
    const { name, role, bio, category, imageUrl } = req.body
    let finalImageUrl = imageUrl || ''

    // 🔥 If a file was uploaded via multer, send it to Cloudinary
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'committee' }, // Organizes these into a specific Cloudinary folder
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        stream.end(req.file.buffer)
      })
      finalImageUrl = uploadResult.secure_url
    }

    if (!name || !role || !bio || !category) {
      return res.status(400).json({ error: 'All required fields must be provided' })
    }

    const newMember = new Committee({
      name,
      role,
      bio,
      category,
      imageUrl: finalImageUrl,
    })

    const savedMember = await newMember.save()

    res.status(201).json({
      message: 'Committee member added successfully',
      data: { ...savedMember.toObject(), id: savedMember._id }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to add committee member' })
  }
}

// PATCH (partial update, supports updating the image too)
export async function patchCommittee(req, res) {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    let updateData = { ...req.body }

    // 🔥 If they are updating the member WITH a new image file
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: 'committee' },
          (error, result) => {
            if (error) reject(error)
            else resolve(result)
          }
        )
        stream.end(req.file.buffer)
      })
      updateData.imageUrl = uploadResult.secure_url
    }

    const updatedMember = await Committee.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    )

    if (!updatedMember) {
      return res.status(404).json({ error: 'Committee member not found' })
    }

    res.json({
      message: 'Committee member updated successfully',
      data: { ...updatedMember.toObject(), id: updatedMember._id }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to update committee member' })
  }
}

// DELETE
export async function deleteCommittee(req, res) {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID' })
    }

    const deletedMember = await Committee.findByIdAndDelete(id)

    if (!deletedMember) {
      return res.status(404).json({ error: 'Committee member not found' })
    }

    res.json({
      message: 'Committee member deleted successfully'
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to delete committee member' })
  }
}