import express, { Request, Response, NextFunction, Router } from 'express';
import PostsMaster from '../../repo/postsMaster';

const router: Router = express.Router();

// Create an instance of Posts
const posts = new PostsMaster();

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err.message || 'Internal Server Error' });
};

router.use(errorHandler);

// Middleware endpoint handler for /create route
router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postData = req.body;
        const result = await posts.createPost(postData);
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

// Middleware endpoint handler for /user-posts route
router.post('/user-posts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { creator_id } = req.body;
        const result = await posts.getUserPosts(creator_id);
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

// Middleware endpoint handler for /property-channel-posts route
router.post('/property-channel-posts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { property_id } = req.body;
        const result = await posts.getPropertyPosts(property_id);
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

export default router;
