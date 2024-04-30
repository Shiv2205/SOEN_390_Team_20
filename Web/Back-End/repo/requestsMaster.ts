import DBControllerFactory from "../Factory/DBControllerFactory";
import IDBController from "../interfaces/IDBController";
import { RequestDetails } from "../types/DBTypes";

class RequestsMaster {
    readonly dbController: IDBController;

    constructor() {
        this.dbController = DBControllerFactory.createInstance();
    }

    /**
     * The function `submitNewRequest` asynchronously submits a new request and returns the status and
     * request ID or an error.
     * @param {RequestDetails} requestDetails - RequestDetails is an object containing details of a new
     * request to be submitted. It may include properties such as requester name, request description,
     * request type, and any other relevant information needed to create a new request.
     * @returns The `submitNewRequest` function returns a Promise that resolves to an object containing
     * the `status` and `request_id` properties if the request is successfully submitted. If there is
     * an error during the process, it returns an Error object with the error message.
     */
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

    /**
     * This TypeScript function asynchronously retrieves a request from a database and returns the
     * status and data or an error.
     * @param {string} request_id - The `request_id` parameter is a string that represents the unique
     * identifier of a request. It is used to retrieve details of a specific request from the database.
     * @returns The `getRequest` method returns a Promise that resolves to an object containing either
     * a `status` number and optional `data` of type `RequestDetails`, or an `Error` object if an error
     * occurs during the process.
     */
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

    /**
     * This TypeScript function asynchronously retrieves all unit requests for a given unit ID from a
     * database controller.
     * @param {string} unit_id - The `unit_id` parameter is a string that represents the unique
     * identifier of a unit for which you want to retrieve all the requests.
     * @returns The `getAllUnitRequests` function returns a Promise that resolves to an object
     * containing either a status number and an array of `RequestDetails` data, or an Error object if
     * an error occurs during the process.
     */
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

    /**
   * This TypeScript function asynchronously deletes all requests based on a given request ID.
   * @param {string} request_id - The `request_id` parameter is a string that represents the identifier of a
   * specific request for which you want to delete.
   * @returns The `deleteRequest` function returns a Promise that resolves to an object with the
   * following structure:
   * ```typescript
   * {
   *   status: number; // HTTP status code indicating the outcome of the operation
   *   message?: string; // Optional message providing additional information about the operation
   * }
   * ```
   */
    async deleteRequest(request_id: string) : Promise<{ status: number; message?: string } | Error> {
        try {
            const result = await this.dbController.deleteRequest(request_id);
            if (result.status !== 200) {
                throw new Error("Failed to delete request.");
            }
            return { status: result.status, message: result.message };
        } catch (error) {
            return new Error((error as Error).message);
        }
    }

    /**
     * The function `updateRequest` asynchronously updates a request and returns the status and
     * message or an error.
     * @param {RequestDetails} requestDetails - RequestDetails is an object containing details of a new
     * request to be submitted. It should include properties such as requester name, request description,
     * request type, and other relevant information needed to update a request.
     * @returns The `updateRequest` function returns a Promise that resolves to an object containing
     * the `status` and `message` properties if the request is successfully submitted. If there is
     * an error during the process, it returns an Error object with the error message.
     */
    async updateRequest(requestDetails: RequestDetails): Promise<{ status: number; message: string } | Error> {
        try {
            const result = await this.dbController.updateRequest(requestDetails);
            if (result.status !== 200 || result.message == undefined) {
                throw new Error("Failed to update request.");
            }
            return { status: result.status, message: result.message };
        } catch (error) {
            return new Error((error as Error).message);
        }
    }

    /**
     * This TypeScript function asynchronously retrieves all requests associated with a specific
     * employee ID from a database controller.
     * @param {string} employee_id - The `employee_id` parameter is a string that represents the unique
     * identifier of an employee. It is used as input to retrieve all requests associated with that
     * employee from the database.
     * @returns The `getAllEmployeeRequests` function returns a Promise that resolves to an object with
     * a `status` property of type number and an optional `data` property of type `RequestDetails[]`.
     * The function also handles errors by returning an `Error` object if an error occurs during the
     * execution.
     */
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
