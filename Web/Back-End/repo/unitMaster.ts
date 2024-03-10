import DBControllerFactory from "../Factory/DBControllerFactory";
import { IDBController, UnitData, UnitDetails } from "../types/DBTypes";

class UnitMaster {
  readonly dbController: IDBController;

  constructor() {
    this.dbController = DBControllerFactory.createInstance();
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
