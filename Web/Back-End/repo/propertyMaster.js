const DBControllerFactory = require("../Factory/DBControllerFactory");

class PropertyMaster {
  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

 /**
  * The function `registerNewProperty` asynchronously registers a new property with specified details
  * in a database.
  * @returns The `registerNewProperty` function is returning the result of
  * `this.dbController.createNewProperty` after awaiting its completion.
  */
  async registerNewProperty({
    unit_count,
    parking_count,
    locker_count,
    address,
    picture = "",
  }) {
    try {
      return await this.dbController.createNewProperty({
        unit_count,
        parking_count,
        locker_count,
        address,
        picture,
      });
    } catch (error) {
      return error;
    }
  }

  /**
   * The function `getProperty` asynchronously retrieves a property using the `property_id` parameter
   * and handles any errors that may occur.
   * @param property_id - The `property_id` parameter is the unique identifier or key that is used to
   * retrieve a specific property from the database. It is passed to the `getProperty` method of the
   * `dbController` to fetch the corresponding property data asynchronously.
   * @returns The `getProperty` method is returning the property object with the specified
   * `property_id` by awaiting the `dbController.getProperty(property_id)` call.
   */
  async getProperty(property_id) {
    try {
      return await this.dbController.getProperty(property_id);
    } catch (error) {
      return error;
    }
  }

  /**
   * The function `getAllProperties` asynchronously retrieves all properties associated with a given
   * employee ID from a database controller.
   * @param employee_id - The `employee_id` parameter is used to specify the unique identifier of an
   * employee for whom you want to retrieve all properties.
   * @returns The `getAllProperties` function is returning the result of calling the `getAllProperties`
   * method on the `dbController` object with the `employee_id` parameter. This function is an
   * asynchronous function that uses `await` to wait for the result of the database operation before
   * returning it.
   */
  async getAllProperties(employee_id) {
    try {
      return await this.dbController.getAllProperties(employee_id);
    } catch (error) {
      return error;
    }
  }
}

module.exports = PropertyMaster;
