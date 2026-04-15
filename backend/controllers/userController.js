import User from '../models/User.js' // Updated path

export async function getUsers(req, res) {
  try {
    const users = await User.find().select('_id name email').limit(100).lean()
    // Map _id to id for frontend compatibility
    const result = users.map(u => ({ id: u._id, name: u.name, email: u.email }))
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Database error' })
  }
}
