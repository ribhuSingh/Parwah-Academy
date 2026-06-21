import ProgramItem from '../models/ProgramItem.js'
import mongoose from 'mongoose'

export async function getPrograms(req, res) {
  try {
    const items = await ProgramItem.find().sort({ order: 1, createdAt: -1 }).lean()
    res.json(items.map((i) => ({ ...i, id: i._id })))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch programs' })
  }
}

export async function createProgram(req, res) {
  try {
    const { title, subtitle, description, iconKey, colorClass, order } = req.body
    if (!title || !description) {
      return res.status(400).json({ error: 'title and description are required' })
    }

    const created = await ProgramItem.create({
      title,
      subtitle: subtitle || '',
      description,
      iconKey: iconKey || '',
      colorClass: colorClass || '',
      order: order || 0,
    })

    res.status(201).json({ message: 'Program created successfully', data: created })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create program' })
  }
}

export async function updateProgram(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

    const updated = await ProgramItem.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ error: 'Program not found' })

    res.json({ message: 'Program updated successfully', data: updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update program' })
  }
}

export async function deleteProgram(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

    const deleted = await ProgramItem.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Program not found' })

    res.json({ message: 'Program deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete program' })
  }
}

