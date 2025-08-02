const User = require('../models/User');
const Post = require('../models/Post');

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        const posts = await Post.find({ user: req.params.userId }).sort({ createdAt: -1 });

        res.json({ user, posts });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(500).send('Server Error');
    }
};