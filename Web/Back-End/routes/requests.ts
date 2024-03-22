import express, { Request, Response, NextFunction, Router } from "express";
import RequestsMaster from "../repo/requestsMaster";
import { RequestDetails } from "../types/DBTypes";

const router: Router = express.Router();
const requestsMaster = new RequestsMaster();

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

export default router;
