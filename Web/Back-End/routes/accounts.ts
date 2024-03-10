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
