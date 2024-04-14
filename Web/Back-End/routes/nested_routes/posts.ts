import express, { Request, Response, NextFunction, Router } from 'express';
import PostsMaster from '../../repo/postsMaster';

const router: Router = express.Router();

// Create an instance of Posts
const posts = new PostsMaster();

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ message: err.message || 'Internal Server Error' });
};

// Middleware endpoint handler for /create route
/**
 * API route handler that creates a new post in the database.
 * 
 * @param req - Request object containing post data
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with the status of the post creation operation or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   post_id?: string;
 *   message?: string;
 * }
 */

router.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const postData = req.body;
        const result = await posts.createPost(postData);
        if(result instanceof Error) throw result as Error;
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

// Middleware endpoint handler for /user-posts route
/**
 * API route handler that retrieves all posts created by a specific user.
 * 
 * @param req - Request object containing creator ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with user posts or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     post_id: string;
 *     property_id: string;
 *     creator_id: string;
 *     content: string;
 *     replied_to?: string;
 *     posted_at: string;
 *   }[];
 *   message?: string;
 * }
 */
router.post('/user-posts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { creator_id } = req.body;
        const result = await posts.getUserPosts(creator_id);
        if(result instanceof Error) throw result as Error;
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

// Middleware endpoint handler for /property-channel-posts route
/**
 * API route handler that retrieves all posts related to a specific property.
 * 
 * @param req - Request object containing property ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with property-related posts or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     post_id: string;
 *     property_id: string;
 *     creator_id: string;
 *     content: string;
 *     replied_to?: string;
 *     posted_at: string;
 *   }[];
 *   message?: string;
 * }
 */
router.post('/property-channel-posts', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { property_id } = req.body;
        const result = await posts.getPropertyPosts(property_id);
        if(result instanceof Error) throw result as Error;
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

export default router;
