import express from 'express'
import { getCommittee } from '../controllers/committeeController.js'

const router = express.Router()

router.get('/', getCommittee)

export default router
