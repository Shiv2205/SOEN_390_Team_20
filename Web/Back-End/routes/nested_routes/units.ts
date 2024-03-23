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
/**
 * API route handler that registers a new unit.
 *
 * @param req - Request object with UnitData in body
 * @param res - Response object
 * @param next - Next function for error handling
 *
 * @returns A Promise that resolves to an object with status
 * and result of registerUnit() call.
 * The returned object has the following structure:
 *
 * {
 *   status: number;
 *   unit_id: string
 * }
 */
router.post(
  "/register",
  async (req: Request<{}, {}, UnitData>, res: Response, next: NextFunction) => {
    try {
      const unitData: UnitData = req.body;
      const result = await unit.registerUnit(unitData);
      if (result instanceof Error) throw result as Error;
      res.status(result.status).json(result);
    } catch (error) {
      errorHandler(error as Error, req, res, next);
    }
  }
);

// Middleware endpoint handler for /get-unit route
/**
 * API route handler that retrieves details for a unit by ID.
 * 
 * @param req - Request object with unit ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with unit details or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     unit_id: string;
 *     property_id: string;
 *     size: number;
 *     monthly_rent: number;
 *     condo_fee: number;
 *     condo_balance: number;
 *   };
 *   message?: string;
 * }
 */
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
/**
 * API route handler that retrieves details for a unit associated with a user by occupant ID.
 * 
 * @param req - Request object with occupant ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with unit details or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     unit_id: string;
 *     property_id: string;
 *     size: number;
 *     monthly_rent: number;
 *     condo_fee: number;
 *     condo_balance: number;
 *   };
 *   message?: string;
 * }
 */
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
/**
 * API route handler that retrieves assets (units) associated with a property by property ID.
 * 
 * @param req - Request object with property ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with property units or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     unit_id: string;
 *     property_id: string;
 *     size: number;
 *     monthly_rent: number;
 *     condo_fee: number;
 *     condo_balance: number;
 *   }[];
 *   message?: string;
 * }
 */
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