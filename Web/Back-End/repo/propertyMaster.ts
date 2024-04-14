import DBControllerFactory from "../Factory/DBControllerFactory";
import IDBController from "../interfaces/IDBController";
import { PropertyData } from "../types/DBTypes";

class PropertyMaster {
  readonly dbController: IDBController; 

  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  /**
   * The function `registerNewProperty` asynchronously registers a new property and returns the status
   * and property ID or an error.
   * @param {PropertyData} propertyDetails - PropertyData object containing details of the new property
   * to be registered, such as address, type, size, etc.
   * @returns The `registerNewProperty` function returns a Promise that resolves to an object with
   * properties `status` and `property_id`, or an Error object if there was an error during the
   * process.
   */
  async registerNewProperty(propertyDetails: PropertyData): Promise<{status: number; property_id: string} | Error> {
    let result = await this.dbController.createNewProperty(propertyDetails);
    if (result.message) return new Error(result.message);
    return result as {status: number; property_id: string};
  }

  /**
   * The function `getProperty` retrieves property data from a database using a property ID and returns
   * either the data or an error.
   * @param {string} property_id - The `property_id` parameter is a string that represents the unique
   * identifier of a property. It is used to retrieve information about a specific property from the
   * database.
   * @returns The `getProperty` method returns a Promise that resolves to an object containing either a
   * `status` number and `data` of type `PropertyData`, or an `Error` object if there was an error
   * during the operation.
   */
  async getProperty(property_id: string): Promise<{status: number; data: PropertyData} | Error> {
    let result =await this.dbController.getProperty(property_id);
    if (result.message) return new Error(result.message);
    return result as {status: number; data: PropertyData};
  }

  /**
   * The function `getAllProperties` retrieves all properties associated with a specific admin ID from
   * a database controller asynchronously.
   * @param {string} admin_id - The `admin_id` parameter is a string that represents the unique
   * identifier of an admin user.
   * @returns The `getAllProperties` method returns a Promise that resolves to an object with a
   * `status` number and an array of `PropertyData` objects, or an Error object if there is an error.
   */
  async getAllProperties(admin_id: string): Promise<{status: number; data: PropertyData[]} | Error> {
    let result = await this.dbController.getAllProperties(admin_id);
    if (result.message) return new Error(result.message);
    return result as {status: number; data: PropertyData[]};
  }
}

export default PropertyMaster;