import Partner from '../models/Partner.js' // Updated path

export async function getPartners(req, res) {
  try {
    const partners = await Partner.find().sort({ _id: 1 }).lean()
    const result = partners.map(p => ({ ...p, id: p._id }))
    res.json(result)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Failed to fetch partners' })
  }
}
