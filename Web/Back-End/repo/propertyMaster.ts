import DBControllerFactory from "../Factory/DBControllerFactory";
import { IDBController, PropertyData } from "../types/DBTypes";

class PropertyMaster {
  readonly dbController: IDBController; 

  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  async registerNewProperty(propertyDetails: PropertyData): Promise<{status: number; property_id: string} | Error> {
    let result = await this.dbController.createNewProperty(propertyDetails);
    if (result.message) return new Error(result.message);
    return result as {status: number; property_id: string};
  }

  async getProperty(property_id: string): Promise<{status: number; data: PropertyData} | Error> {
    let result =await this.dbController.getProperty(property_id);
    if (result.message) return new Error(result.message);
    return result as {status: number; data: PropertyData};
  }

  async getAllProperties(admin_id: string): Promise<{status: number; data: PropertyData[]} | Error> {
    let result = await this.dbController.getAllProperties(admin_id);
    if (result.message) return new Error(result.message);
    return result as {status: number; data: PropertyData[]};
  }
}

export default PropertyMaster;