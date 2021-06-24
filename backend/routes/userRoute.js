import express from 'express'
const router = express.Router()
import {
    loginUser, getUserProfile,
    getUsers, registerUser, deleteUser, getUserById,updateUser
} from '../controllers/userController.js'

import { admin, protect } from '../middleware/authMiddleware.js'


router.route('/').post(registerUser).get(protect, getUsers)
router.post('/login', loginUser)
router.route('/profile').get(protect, getUserProfile) //validating with JWT 
router.route('/:id').delete(protect, deleteUser).get(protect, getUserById).put(protect,updateUser)

export default router
