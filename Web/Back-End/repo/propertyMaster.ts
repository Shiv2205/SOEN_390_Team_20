import DBControllerFactory from "../Factory/DBControllerFactory";
import { PropertyData } from "../types/DBTypes";

class PropertyMaster {
  private dbController: any; 

  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  async registerNewProperty(propertyDetails: PropertyData): Promise<{status: number; property_id: string} | Error> {
    try {
      return await this.dbController.createNewProperty(propertyDetails);
    } catch (error) {
      const err: Error = error as Error;
      return err;
    }
  }

  async getProperty(property_id: string): Promise<{status: number; data: PropertyData} | Error> {
    try {
      return await this.dbController.getProperty(property_id);
    } catch (error) {
      const err: Error = error as Error;
      return err;
    }
  }

  async getAllProperties(employee_id: string): Promise<{status: number; data: PropertyData[]} | Error> {
    try {
      return await this.dbController.getAllProperties(employee_id);
    } catch (error) {
      const err: Error = error as Error;
      return err;
    }
  }
}

export default PropertyMaster;