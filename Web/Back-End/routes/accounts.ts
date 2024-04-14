import express, { Request, Response, NextFunction, Router } from "express";
import AccountsMaster from "../repo/accountsMaster";
import { UserData, EmployeeData, UserCredentials } from "../types/DBTypes";

const router: Router = express.Router();
const accounts = new AccountsMaster();

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
  res.status(500).send({ message: err.message || "Something went wrong!" });
};
router.use(errorHandler);

// 1. /register
/**
 * API route handler for user registration.
 * 
 * @param req - Request object containing user registration data
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with registration status or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   account_id?: string;
 *   message?: string;
 * }
 */
router.post(
  "/register",
  async (req: Request<{}, {}, UserData>, res: Response, next: NextFunction) => {
    try {
      const response = await accounts.registerUser(req.body);
      if (response instanceof Error) throw response;
      res.status(response.status).json({ ...response });
    } catch (error) {
      errorHandler(error as Error, req, res, next); // Pass to error-handling middleware
    }
  }
);

// 2. /users
/**
 * API route handler for retrieving user details.
 * 
 * @param req - Request object containing user credentials (email and password)
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with user details or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     account_id: string;
 *     account_type: string;
 *     fullname: string;
 *     email: string;
 *     phone_number?: string;
 *     profile_picture?: string;
 *   };
 *   message?: string;
 * }
 */
router.post(
  "/users",
  async (
    req: Request<{}, {}, UserCredentials>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await accounts.getUserDetails(
        req.body.email,
        req.body.password
      );

      if(response instanceof Error) throw response;
      const { status, data  } = response;
      res.status(status).json({ status, data });
    } catch (error) {
      errorHandler(error as Error, req, res, next);
    }
  }
);

// 3. /register/employee
/**
 * API route handler for registering a new employee.
 * 
 * @param req - Request object containing employee data
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with the status of the registration operation,
 * employee ID, and optional message. The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   employee_id?: string;
 *   message?: string;
 * }
 */
router.post(
  "/register/employee",
  async (
    req: Request<{}, {}, EmployeeData>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await accounts.registerEmployee(req.body);
      if(result instanceof Error) throw result;
      res.status(result.status).json(result);
    } catch (error) {
      errorHandler(error as Error, req, res, next);
    }
  }
);

// 4. /employees
/**
 * API route handler that retrieves employee details based on provided credentials.
 * 
 * @param req - Request object with user credentials in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with employee details or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     employee_id: string;
 *     fullname: string;
 *     email: string;
 *     property_id?: string | null;
 *     type: "manager" | "accountant" | "daily_operator";
 *     phone_number: string;
 *     profile_picture: string;
 *   };
 *   message?: string;
 * }
 */
router.post(
  "/employees",
  async (
    req: Request<{}, {}, UserCredentials>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const employeeDetails = await accounts.getEmployeeDetails(
        req.body.email,
        req.body.password
      );
      if(employeeDetails instanceof Error) throw employeeDetails;
      res.status(employeeDetails.status).json(employeeDetails);
    } catch (error) {
      errorHandler(error as Error, req, res, next);
    }
  }
);

// 5. /employees/property-agents
/**
 * API route handler that retrieves property agents (employees) associated with a specific property.
 * 
 * @param req - Request object with property ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with property agents' details or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     employee_id: string;
 *     fullname: string;
 *     email: string;
 *     property_id?: string | null;
 *     type: "manager" | "accountant" | "daily_operator";
 *     phone_number: string;
 *     profile_picture: string;
 *   }[];
 *   message?: string;
 * }
 */
router.post(
  "/employees/property-agents",
  async (
    req: Request<{}, {}, { property_id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const employees = await accounts.getPropertyEmployees(
        req.body.property_id
      );
      if(employees instanceof Error) throw employees;
      res.status(employees.status).json(employees);
    } catch (error) {
      errorHandler(error as Error, req, res, next);
    }
  }
);

export default router;
