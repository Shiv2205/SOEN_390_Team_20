import express, { Request, Response, NextFunction, Router } from 'express';
import PropertyOpsMaster from "../../repo/propertyOpsMaster";
import {PropertyOpsData, PropertyOpsDetails, UnitData} from "../../types/DBTypes";

const router: Router = express.Router();
const opsMaster = new PropertyOpsMaster();

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

router.post(
    "/register",
    async (req: Request<{}, {}, PropertyOpsData>, res: Response, next: NextFunction) => {
        try {
            const opsData: PropertyOpsData = req.body;
            const result = await opsMaster.createOperation(opsData);
            if (result instanceof Error) throw result as Error;
            res.status(result.status).json(result);
        } catch (error) {
            errorHandler(error as Error, req, res, next);
        }
    }
);

router.post(
    "/get",
    async (req: Request<{}, {}, {property_id: string}>, res: Response, next: NextFunction) => {
        try {
            const {property_id}= req.body;
            const result = await opsMaster.getOperations(property_id);
            if (result instanceof Error) throw result as Error;
            res.status(result.status).json(result);
        } catch (error) {
            errorHandler(error as Error, req, res, next);
        }
    }
);

router.post(
    "/update",
    async (req: Request<{}, {}, PropertyOpsDetails>, res: Response, next: NextFunction) => {
        try {
            const opsDetails = req.body;
            const result = await opsMaster.updateOperations(opsDetails);
            if (result instanceof Error) throw result as Error;
            res.status(result.status).json(result);
        } catch (error) {
            errorHandler(error as Error, req, res, next);
        }
    }
);

router.post(
    "/delete",
    async (req: Request<{}, {}, {operation_id: string}>, res: Response, next: NextFunction) => {
        try {
            const {operation_id} = req.body;
            const result = await opsMaster.deleteOperations(operation_id);
            if (result instanceof Error) throw result as Error;
            res.status(result.status).json(result);
        } catch (error) {
            errorHandler(error as Error, req, res, next);
        }
    }
);

export default router;