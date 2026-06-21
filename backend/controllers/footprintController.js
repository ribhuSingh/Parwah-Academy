import FootprintItem from '../models/FootprintItem.js'
import mongoose from 'mongoose'

export async function getFootprint(req, res) {
  try {
    const items = await FootprintItem.find().sort({ order: 1, createdAt: -1 }).lean()
    res.json(items.map((i) => ({ ...i, id: i._id })))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch footprint items' })
  }
}

export async function createFootprint(req, res) {
  try {
    const { title, description, iconKey, order } = req.body
    if (!title || !description) {
      return res.status(400).json({ error: 'title and description are required' })
    }

    const created = await FootprintItem.create({
      title,
      description,
      iconKey: iconKey || '',
      order: order || 0,
    })

    res.status(201).json({ message: 'Footprint item created successfully', data: created })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create footprint item' })
  }
}

export async function updateFootprint(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

    const updated = await FootprintItem.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ error: 'Footprint item not found' })

    res.json({ message: 'Footprint item updated successfully', data: updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update footprint item' })
  }
}

export async function deleteFootprint(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

    const deleted = await FootprintItem.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Footprint item not found' })

    res.json({ message: 'Footprint item deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete footprint item' })
  }
}

