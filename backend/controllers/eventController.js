import { db } from '../drizzle.js'
import { events } from '../schema.js'

export async function getEvents(req, res) {
  try {
    const result = await db.select().from(events).orderBy(events.eventDate)
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

export async function createEvent(req, res) {
  try {
    const { title, description, eventDate, location } = req.body
    if (!title || !description || !eventDate || !location) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const result = await db.insert(events).values({
      title,
      description,
      eventDate: new Date(eventDate),
      location
    }).returning()
    res.status(201).json(result[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}