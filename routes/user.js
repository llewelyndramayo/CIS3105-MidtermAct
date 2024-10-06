const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register a new user
router.post('/register', userController.registerUser);

// Log in an existing user
router.post('/login', userController.loginUser);

// Get user profile (only if logged in)
router.get('/profile', authMiddleware, userController.getUserProfile);

module.exports = router;
