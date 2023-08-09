const express = require('express')
const router = express.Router()
const {registerUser, loginUser, getAllUsers, deleteUser, updateUser, updatePassword } = require('../controllers/userController')
// const { protect } = require('../middleware/authMiddleware')


router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/getallusers', getAllUsers)
router.post('/deleteUser/:id', deleteUser)
router.post('/updateUser', updateUser)
router.post('/updatepassword', updatePassword)
// router.get('/me', protect, getMe)

module.exports = router