// routes/auth.js
const express = require('express');
const router = express.Router();

// We get the functions from our controller file
const { registerUser, loginUser } = require('../controllers/authController');

// This route already existed
router.post('/register', registerUser);

// This is the new route we are adding
router.post('/login', loginUser);

module.exports = router;