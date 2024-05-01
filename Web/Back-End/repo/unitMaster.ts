import DBControllerFactory from "../Factory/DBControllerFactory";
import IDBController from "../interfaces/IDBController";
import PropertyMaster from "./propertyMaster";
import {PropertyData, UnitData, UnitDetails} from "../types/DBTypes";

class UnitMaster {
  readonly dbController: IDBController;
  readonly pm: PropertyMaster;

  constructor() {
    this.dbController = DBControllerFactory.createInstance();
    this.pm = new PropertyMaster();
  }

  /**
   * The function `registerUnit` asynchronously registers a new unit with specified details in a
   * database.
   * @returns The `registerUnit` function is returning the result of `this.dbController.createNewUnit`
   * after awaiting its completion.
   */
  async registerUnit(
    unit: UnitData
  ): Promise<{ status: number; unit_id: string } | Error> {
    let result = await this.dbController.createNewUnit(unit);
    if (result instanceof Error) return result as Error;
    return result as { status: number; unit_id: string };
  }

  /**
   * The function `getUnit` asynchronously retrieves a unit from the database using its ID and handles
   * any errors that occur.
   * @param unit_id - The `unit_id` parameter is the unique identifier of the unit you want to retrieve
   * from the database. It is used to fetch the specific unit's information from the database.
   * @returns The `getUnit` function is returning the result of `this.dbController.getUnit(unit_id)`
   * after awaiting its completion.
   */
  async getUnit(
    unit_id: string
  ): Promise<{ status: number; data?: UnitDetails; message?: string } | Error> {
    let result = await this.dbController.getUnit(unit_id);
    if (result instanceof Error) return result as Error;
    return result;
  }

  /**
   * The function `getUserUnit` asynchronously retrieves unit details for a given occupant ID from a
   * database controller.
   * @param {string} occupant_id - The `occupant_id` parameter is a string that represents the unique
   * identifier of the occupant for whom you want to retrieve the unit details.
   * @returns The `getUserUnit` function returns a Promise that resolves to an object with the
   * following structure: `{ status: number; data?: UnitDetails; message?: string }`. The `data`
   * property may contain details about the unit, and the `message` property may contain additional
   * information. If an error occurs during the execution of the function, an `Error` object is
   * returned.
   */
  async getUserUnit(occupant_id: string): Promise<{ status: number; data?: { property: PropertyData, units: UnitDetails[] }[]; message?: string } | Error> {
    let result = await this.dbController.getOccupiedUnit(occupant_id);
    if (result instanceof Error) return result as Error;

    let units = result.data as UnitDetails[];
    let unit_details: { property: PropertyData, units: UnitDetails[] }[] = [];
    let temp_pm = this.pm;

    for(let i = 0; i < units.length; i++){
      let unit_inserted = false;
      unit_details.map( tuple => {
        if(tuple.property.property_id === units[i].property_id){
          tuple.units.push(units[i]);
          unit_inserted = true;
        }
      } )

      if(!unit_inserted || unit_details.length === 0)
        unit_details.push({
          property: (await temp_pm.getProperty(units[i].property_id) as { status: number; data: PropertyData; }).data,
          units: [units[i]]
        });
    }

    return { status: result.status, data: unit_details};
  }

  /**
   * The function `getPropertyUnits` asynchronously retrieves all units associated with a given
   * property ID using a database controller.
   * @param property_id - The `property_id` parameter is the unique identifier or key associated with a
   * specific property in a database. It is used to retrieve information or data related to that
   * particular property, such as its units in this case.
   * @returns The `getPropertyUnits` function is returning a promise that resolves to the result of
   * calling `this.dbController.getAllUnits(property_id)`.
   */
  async getPropertyUnits(
    property_id: string
  ): Promise<
    { status: number; data?: UnitDetails[]; message?: string } | Error
  > {
    let result = await this.dbController.getAllUnits(property_id);
    if (result instanceof Error) return result as Error;

    return result;
  }
}

export default UnitMaster;
