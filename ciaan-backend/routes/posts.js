const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
// Import all post functions
const { createPost, getAllPosts, deletePost, updatePost } = require('../controllers/postController');

router.post('/', authMiddleware, createPost);
router.get('/', getAllPosts);
router.delete('/:postId', authMiddleware, deletePost);

// This is the new route for editing/updating
router.put('/:postId', authMiddleware, updatePost);

module.exports = router;