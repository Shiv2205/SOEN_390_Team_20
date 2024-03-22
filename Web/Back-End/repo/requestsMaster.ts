import DBControllerFactory from "../Factory/DBControllerFactory";
import { IDBController, RequestDetails } from "../types/DBTypes";

class RequestsMaster {
    readonly dbController: IDBController;

    constructor() {
        this.dbController = DBControllerFactory.createInstance();
    }

    async submitNewRequest(requestDetails: RequestDetails): Promise<{ status: number; request_id: string } | Error> {
        try {
            const result = await this.dbController.createNewRequest(requestDetails);
            if (result.status !== 201) {
                throw new Error("Failed to submit request.");
            }
            return { status: result.status, request_id: result.request_id };
        } catch (error) {
            return new Error((error as Error).message);
        }
    }

    async getRequest(request_id: string): Promise<{ status: number; data?: RequestDetails } | Error> {
        try {
            const result = await this.dbController.getRequest(request_id);
            if (result.status !== 200) {
                throw new Error("Failed to get request.");
            }
            return { status: result.status, data: result.data };
        } catch (error) {
            return new Error((error as Error).message);
        }
    }

    async getAllUnitRequests(unit_id: string): Promise<{ status: number; data?: RequestDetails[] } | Error> {
        try {
            const result = await this.dbController.getAllUnitRequests(unit_id);
            if (result.status !== 200) {
                throw new Error("Failed to get unit requests.");
            }
            return { status: result.status, data: result.data };
        } catch (error) {
            return new Error((error as Error).message);
        }
    }

    async getAllEmployeeRequests(employee_id: string): Promise<{ status: number; data?: RequestDetails[] } | Error> {
        try {
            const result = await this.dbController.getAllEmployeeRequests(employee_id);
            if (result.status !== 200) {
                throw new Error("Failed to get employee requests.");
            }
            return { status: result.status, data: result.data };
        } catch (error) {
            return new Error((error as Error).message);
        }
    }
}

export default RequestsMaster;
