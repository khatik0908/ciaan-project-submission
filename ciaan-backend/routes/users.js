const express = require('express');
const router = express.Router();
const { getUserProfile } = require('../controllers/userController');

// @route   GET api/users/:userId
// @desc    Get user profile and posts
// @access  Public
router.get('/:userId', getUserProfile);

module.exports = router;