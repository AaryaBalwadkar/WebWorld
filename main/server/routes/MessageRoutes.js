import express from 'express'
import { getMessages, sendMessage } from '../controller/MessageController.js'
import protectRoute from '../middleware/ProtectRoute.js'

const router = express.Router()

router.get("/:id", protectRoute, getMessages)
router.post("/send/:id", protectRoute, sendMessage)

export default router