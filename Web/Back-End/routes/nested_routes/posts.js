const express = require('express');
const router = express.Router();
const PostsMaster = require('../../repo/postsMaster'); // Adjust the path as per your project structure

// Create an instance of Posts
const posts = new PostsMaster();

const errorHandler = (err, req, res, next) => {
    res.status(500).json({ error: 'Internal Server Error' });
};

router.use(errorHandler);

// Middleware endpoint handler for /create route
router.post('/create', async (req, res, next) => {
    try {
        const postData = req.body;
        const result = await posts.createPost(postData);
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

// Middleware endpoint handler for /user-posts route
router.post('/user-posts', async (req, res, next) => {
    try {
        console.log("***USERPOSTS", req.body);
        const { creator_id } = req.body;
        const result = await posts.getUserPosts(creator_id);
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

// Middleware endpoint handler for /property-channel-posts route
router.post('/property-channel-posts', async (req, res, next) => {
    try {
        const { property_id } = req.body;
        const result = await posts.getPropertyPosts(property_id);
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

module.exports = router;
