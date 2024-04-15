import express, { Request, Response, NextFunction, Router } from 'express';
import EventMaster from '../repo/eventMaster';
import { EventData } from '../types/DBTypes';
import DBController from "../controllers/DBController";

const router: Router = express.Router();
const eventMaster = new EventMaster(new DBController());

// Middleware for error handling
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong!';
    res.status(status).send({ message });
};


router.post('/create/event', async (req: Request<{}, {}, EventData>, res: Response, next: NextFunction) => {
    try {
        const result = await eventMaster.createNewEvent(req.body);
        if (result.status !== 201) throw new Error(`Creation failed: ${result.message}`);
        res.status(result.status).json(result);
    } catch (error) {
        next(error); // Pass to error-handling middleware
    }
});
router.get('/events-by-host/:host_id', async (req: Request<{ host_id: string }>, res: Response, next: NextFunction) => {
    try {
        const { host_id } = req.params;
        const result = await eventMaster.getHostEvents(host_id);
        if (result.status !== 200) throw result;
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error, req, res, next);
    }
});

export default router;
