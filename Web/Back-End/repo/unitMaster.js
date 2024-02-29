const DBControllerFactory = require("../Factory/DBControllerFactory");

class UnitMaster {
  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

 /**
  * The function `registerUnit` asynchronously registers a new unit with specified details in a
  * database.
  * @returns The `registerUnit` function is returning the result of `this.dbController.createNewUnit`
  * after awaiting its completion.
  */
  async registerUnit({
    property_id,
    size,
    monthly_rent,
    condo_fee,
    condo_balance,
    owner_id = "",
    renter_id = "",
    owner_registration_key = "",
    renter_registration_key = "",
  }) {
    try {
      return await this.dbController.createNewUnit({
        property_id,
        size,
        monthly_rent,
        condo_fee,
        condo_balance,
        owner_id,
        renter_id,
        owner_registration_key,
        renter_registration_key,
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * The function `getUnit` asynchronously retrieves a unit from the database using its ID and handles
   * any errors that occur.
   * @param unit_id - The `unit_id` parameter is the unique identifier of the unit you want to retrieve
   * from the database. It is used to fetch the specific unit's information from the database.
   * @returns The `getUnit` function is returning the result of `this.dbController.getUnit(unit_id)`
   * after awaiting its completion.
   */
  async getUnit(unit_id) {
    try {
      return await this.dbController.getUnit(unit_id);
    } catch (error) {
      console.log(error);
    }
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
  async getPropertyUnits(property_id) {
    try {
        return await this.dbController.getAllUnits(property_id);
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = UnitMaster;