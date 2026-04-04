import { db } from '../drizzle.js'
import { partners } from '../schema.js'

export async function getPartners(req, res) {
  try {
    const result = await db.select().from(partners).orderBy(partners.id)
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch partners' })
  }
}
