import express, { Request, Response, NextFunction, Router } from "express";
import PropertyMaster from "../repo/propertyMaster";
import unitsHandler from "./nested_routes/units";
import postsHandler from "./nested_routes/posts";
import { PropertyData } from '../types/DBTypes';

const router: Router = express.Router();
const property = new PropertyMaster();

router.use("/units", unitsHandler);
router.use("/posts", postsHandler);

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

export default router;
