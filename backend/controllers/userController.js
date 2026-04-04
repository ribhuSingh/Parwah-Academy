import { db } from '../drizzle.js'
import { users } from '../schema.js'

export async function getUsers(req, res) {
  try {
    const result = await db.select({ id: users.id, name: users.name, email: users.email }).from(users).limit(100)
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}

