import express, { Request, Response, NextFunction, Router } from "express";
import PropertyMaster from "../repo/propertyMaster";
import unitsHandler from "./nested_routes/units";
import postsHandler from "./nested_routes/posts";
import operationsHandler from "./nested_routes/operations";
import { PropertyData } from '../types/DBTypes';

const router: Router = express.Router();
const property = new PropertyMaster();

router.use("/units", unitsHandler);
router.use("/posts", postsHandler);
router.use("/operations", operationsHandler);

// Define the error format explicitly for clarity and maintainability
interface Error {
  status?: number;
  message: string;
}

// Middleware to handle errors consistently
const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  res.status(status).send({ message: err.message || "Something went wrong!" });
};

// 1. /register

/**
 * API route handler that registers a new property.
 *
 * @param req - Request object with new property data in body
 * @param res - Response object
 * @param next - Next function for error handling
 *
 * @returns A Promise that resolves to an object with result status or rejects with an error.
 * The returned object has the following structure:
 *
 * {
 *   status: number;
 *   property_id: string;
 * }
 */
router.post(
  "/register",
  async (
    req: Request<{}, {}, PropertyData>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await property.registerNewProperty(req.body);
      if (result instanceof Error) throw result as Error;
      res.status(result.status).json(result);
    } catch (error) {
      errorHandler(error as Error, req, res, next); // Propagate the error to the error handler
    }
  }
);

// 2. /real-estate
/**
 * API route handler that retrieves details for a property by property ID.
 * 
 * @param req - Request object with property ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with property details or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     property_id?: string;
 *     admin_id: string;
 *     unit_count: number;
 *     parking_count: number;
 *     locker_count: number;
 *     address: string;
 *     picture?: string;
 *   };
 *   message?: string;
 * }
 */
router.post(
  "/real-estate",
  async (
    req: Request<{}, {}, { property_id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const property_data = await property.getProperty(req.body.property_id);
      if (property_data instanceof Error) throw property_data as Error;
      res.status(property_data.status).json(property_data);
    } catch (error) {
      errorHandler(error as Error, req, res, next);
    }
  }
);

// 3. /real-estate/company-assets
/**
 * API route handler that retrieves assets (properties) associated with a real estate company by admin ID.
 * 
 * @param req - Request object with admin ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with company properties or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     property_id?: string;
 *     admin_id: string;
 *     unit_count: number;
 *     parking_count: number;
 *     locker_count: number;
 *     address: string;
 *     picture?: string;
 *   }[];
 *   message?: string;
 * }
 */

router.post(
  "/real-estate/company-assets",
  async (
    req: Request<{}, {}, { admin_id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const employee_id = req.body.admin_id;
      const properties = await property.getAllProperties(employee_id);
      res.json(properties);
    } catch (error) {
      errorHandler(error as Error, req, res, next);
    }
  }
);

// Route to fetch unit and property data by account ID
router.post('/units/get-user-unit', async (req, res, next) => {
  const { account_id } = req.body;
  if (!account_id) {
    return res.status(400).json({ error: 'Account ID is required' });
  }

  try {
    const result = await property.dbController.getUnitsAndPropertiesByAccount(account_id);
    if (result instanceof Error) throw result;
    res.json(result);
  } catch (error) {
    errorHandler(error as Error, req, res, next);
  }
});




export default router;
