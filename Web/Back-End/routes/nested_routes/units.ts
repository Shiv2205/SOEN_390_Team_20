import express, { Request, Response, NextFunction, Router } from 'express';
import UnitMaster from '../../repo/unitMaster';
import { UnitData } from '../../types/DBTypes';

const router: Router = express.Router();
const unit = new UnitMaster();

// Define the error format explicitly for clarity and maintainability
interface Error {
    status?: number;
    message: string;
}

// Middleware to handle errors consistently
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    res.status(status).send({ message: err.message || 'Something went wrong!' });
};

// Middleware endpoint handler for /register route
router.post('/register', async (req: Request<{}, {}, UnitData>, res: Response, next: NextFunction) => {
    try {
        const unitData: UnitData = req.body;
        const result = await unit.registerUnit(unitData);
        if(result instanceof Error) throw result as Error;
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

// Middleware endpoint handler for /get-unit route
router.post('/get-unit', async (req: Request<{}, {}, { unit_id: string }>, res: Response, next: NextFunction) => {
    try {
        const { unit_id } = req.body;
        const result = await unit.getUnit(unit_id);
        if(result instanceof Error) throw result as Error;
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

// Middleware endpoint handler for /get-user-unit route
router.post('/get-user-unit', async (req: Request<{}, {}, { occupant_id: string }>, res: Response, next: NextFunction) => {
    try {
        const { occupant_id } = req.body;
        const result = await unit.getUserUnit(occupant_id);
        if(result instanceof Error) throw result as Error;
        res.status(result.status).json(result);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

// Middleware endpoint handler for /property-assets route
router.post('/property-assets', async (req: Request<{}, {}, { property_id: string }>, res: Response, next: NextFunction) => {
    try {
        const { property_id } = req.body;
        const units = await unit.getPropertyUnits(property_id);
        if(units instanceof Error) throw units as Error;
        res.status(units.status).json(units);
    } catch (error) {
        errorHandler(error as Error, req, res, next);
    }
});

export default router;