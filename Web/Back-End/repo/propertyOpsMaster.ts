import DBControllerFactory from "../Factory/DBControllerFactory";
import IDBController from "../interfaces/IDBController";
import {PropertyOpsData, PropertyOpsDetails} from "../types/DBTypes";

class PropertyOpsMaster{
    readonly dbController: IDBController;

    constructor() {
        this.dbController = DBControllerFactory.createInstance();
    }

    async createOperation(propertyOpsInput: PropertyOpsData): Promise<{ status: number; operation_id: string; }>{
        const {property_id, operation_name, operation_cost} = propertyOpsInput;
        return await this.dbController.createPropertyOps(property_id, operation_name, operation_cost);
    }

    async getOperations(property_id: string): Promise<{status: number, data?: PropertyOpsDetails, message?: string} | Error> {
        let result = await this.dbController.getPropertyOps(property_id);
        if (result instanceof Error) return result as Error;

        return result;
    }

    async updateOperations(updateInfo: PropertyOpsDetails): Promise<{ status: number; operation_id: string; }>{
        const {operation_id, property_id, operation_name, operation_cost} = updateInfo;
        return await this.dbController.updatePropertyOps(operation_id, property_id, operation_name, operation_cost);
    }

    async deleteOperations(operation_id: string): Promise<{ status: number; operation_id: string; }>{
        return await this.dbController.deletePropertyOps(operation_id);
    }
}

export default PropertyOpsMaster;