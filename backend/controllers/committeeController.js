import { db } from '../drizzle.js'
import { committee } from '../schema.js'

export async function getCommittee(req, res) {
  try {
    const result = await db.select().from(committee).orderBy(committee.id)
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch committee members' })
  }
}
