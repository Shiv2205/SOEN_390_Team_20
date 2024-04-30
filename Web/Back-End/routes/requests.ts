import express, { Request, Response, NextFunction, Router } from "express";
import RequestsMaster from "../repo/requestsMaster";
import { RequestDetails } from "../types/DBTypes";

const router: Router = express.Router();
const requestsMaster = new RequestsMaster();

/**
 * API route handler that retrieves details for a request by ID.
 * 
 * @param req - Request object with request ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with request details or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     request_id: string;
 *     unit_id: string;
 *     type: RequestType;
 *     description: string;
 *     employee_id: string;
 *     status: RequestStatus;
 *   };
 *   message?: string;
 * }
 */
router.post(
    "/",
    async function (
        req: Request<{}, {}, { request_id: string }>,
        res: Response<{ status: number; data?: RequestDetails } | { response: string }>,
        next: NextFunction
    ) {
        const { request_id } = req.body;

        try {
            const result = await requestsMaster.getRequest(request_id);
            if (result instanceof (Error)) {
                throw result as Error;
            }
            res.status(result.status).send(result);
        } catch (error) {
            res.status(500).send({ response: (error as Error).message });
        }
    }
);

/**
 * API route handler that retrieves all requests associated with a specific unit ID.
 * 
 * @param req - Request object with unit ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with requests data or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     request_id: string;
 *     unit_id: string;
 *     type: RequestType;
 *     description: string;
 *     employee_id: string;
 *     status: RequestStatus;
 *   }[];
 *   message?: string;
 * }
 */
router.post(
    "/unit",
    async function (
        req: Request<{}, {}, { unit_id: string }>,
        res: Response<{ status: number; data?: RequestDetails[] } | { response: string }>,
        next: NextFunction
    ) {
        const { unit_id } = req.body;

        try {
            const result = await requestsMaster.getAllUnitRequests(unit_id);
            if (result instanceof (Error)) {
                throw result as Error;
            }
            res.status(result.status).send(result);
        } catch (error) {
            res.status(500).send({ response: (error as Error).message });
        }
    }
);

/**
 * API route handler that retrieves all requests associated with a specific employee by ID.
 * 
 * @param req - Request object with employee ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with employee requests or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   data?: {
 *     request_id: string;
 *     unit_id: string;
 *     type: RequestType;
 *     description: string;
 *     employee_id: string;
 *     status: RequestStatus;
 *   }[];
 *   message?: string;
 * }
 */
router.post(
    "/employee",
    async function (
        req: Request<{}, {}, { employee_id: string }>,
        res: Response<{ status: number; data?: RequestDetails[] } | { response: string }>,
        next: NextFunction
    ) {
        const { employee_id } = req.body;

        try {
            const result = await requestsMaster.getAllEmployeeRequests(employee_id);
            if (result instanceof (Error)) {
                throw result as Error;
            }
            res.status(result.status).send(result);
        } catch (error) {
            res.status(500).send({ response: (error as Error).message });
        }
    }
);

/**
 * API route handler that registers a new request given unit id, description and type.
 * 
 *  the request id is automatically generated
 *  the employee id is set to unsassigned 
 *  the status is set to recieved
 * 
 * @param req - Request object
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with the given request_id and status.
 * 
 * The returned object has the following structure:
 * {
 *   status: number;
 *   request_id: string;
 * }
 */
router.post(
    '/new',
    async function (
        req: Request<{}, {}, RequestDetails>,
        res: Response<{ status: number; request_id: string }> | { response: string },
        next: NextFunction
    ) {
        try {
            const result = await requestsMaster.submitNewRequest(req.body);
            if (result instanceof (Error)) {
                throw result as Error;
             }
             (res as Response<{ status: number; request_id: string }>).status(result.status).send(result);
        } catch (error) {
            console.error("Error occurred:", error); // Log the error message
            (res as Response<{ status: number; request_id: string }>).status(500).send();
        }
  });

/**
 * API route handler that deletes all requests associated with a specific request ID.
 * 
 * @param req - Request object with request ID in body
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with status message or rejects with an error.
 * The returned object has the following structure:
 * 
 * {
 *   status: number;
 *   message?: string;
 * }
 */
router.post(
    "/delete",
    async function (
        req: Request<{}, {}, { request_id: string }>,
        res: Response<{ status: number; } | { response: string }>,
        next: NextFunction
    ) {
        const { request_id } = req.body;

        try {
            const result = await requestsMaster.deleteRequest(request_id);
            if (result instanceof (Error)) {
                throw result as Error;
            }
            res.status(result.status).send(result);
        } catch (error) {
            res.status(500).send({ response: (error as Error).message });
        }
    }
);

/**
 * API route handler that updates a request given request id, description, status, employee id, unit id and type.
 * 
 * @param req - Request object with new details
 * @param res - Response object
 * @param next - Next function for error handling
 * 
 * @returns A Promise that resolves to an object with the given message and status.
 * 
 * The returned object has the following structure:
 * {
 *   status: number;
 *   message: string;
 * }
 */
router.post(
    '/update',
    async function (
        req: Request<{}, {}, RequestDetails>,
        res: Response<{ status: number; message: string }> | { response: string },
        next: NextFunction
    ) {
        try {
            const result = await requestsMaster.updateRequest(req.body);
            if (result instanceof (Error)) {
                throw result as Error;
             }
             (res as Response<{ status: number; message: string }>).status(result.status).send();
        } catch (error) {
            console.error("Error occurred:", error); // Log the error message
            (res as Response<{ status: number; message: string }>).status(500).send();
        }
  });

export default router;
