const express = require('express');
const router = express.Router();
const PostsMaster = require('../../repo/postsMaster'); // Adjust the path as per your project structure

// Create an instance of Posts
const posts = new PostsMaster();

// Middleware endpoint handler for /create route
router.post('/create', async (req, res) => {
    try {
        const postData = req.body;
        const result = await posts.createPost(postData);
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Middleware endpoint handler for /user-posts route
router.post('/user-posts', async (req, res) => {
    try {
        const { creator_id } = req.body;
        const posts = await posts.getUserPosts(creator_id);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Middleware endpoint handler for /property-channel-posts route
router.post('/property-channel-posts', async (req, res) => {
    try {
        const { property_id } = req.body;
        const posts = await posts.getPropertyPosts(property_id);
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
