import GetInvolvedItem from '../models/GetInvolvedItem.js'
import mongoose from 'mongoose'

export async function getGetInvolved(req, res) {
  try {
    const items = await GetInvolvedItem.find().sort({ order: 1, createdAt: -1 }).lean()
    res.json(items.map((i) => ({ ...i, id: i._id })))
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch get involved items' })
  }
}

export async function createGetInvolved(req, res) {
  try {
    const { title, description, iconKey, colorClass, order } = req.body
    if (!title || !description) {
      return res.status(400).json({ error: 'title and description are required' })
    }

    const created = await GetInvolvedItem.create({
      title,
      description,
      iconKey: iconKey || '',
      colorClass: colorClass || '',
      order: order || 0,
    })

    res.status(201).json({ message: 'Item created successfully', data: created })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to create item' })
  }
}

export async function updateGetInvolved(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

    const updated = await GetInvolvedItem.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    if (!updated) return res.status(404).json({ error: 'Item not found' })

    res.json({ message: 'Item updated successfully', data: updated })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to update item' })
  }
}

export async function deleteGetInvolved(req, res) {
  try {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ error: 'Invalid ID' })

    const deleted = await GetInvolvedItem.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Item not found' })

    res.json({ message: 'Item deleted successfully' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to delete item' })
  }
}

