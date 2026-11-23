
import express from 'express'

import { registerUser } from '../controllers/registerController.js'
import { loginUser } from '../controllers/loginController.js'
import { getProfile } from '../controllers/profileController.js'
import { logoutUser } from '../controllers/logoutController.js'

import { verifyToken } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', verifyToken, getProfile)
router.post('/logout', logoutUser)

export default router
