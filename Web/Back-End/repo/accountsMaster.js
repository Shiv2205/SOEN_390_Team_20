const DBControllerFactory = require("../Factory/DBControllerFactory");

class AccountsMaster {
  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  /**
   * The function `getUserDetails` asynchronously retrieves a user's details from the database using
   * the provided email and password.
   * @param email - The `email` parameter is a string that represents the email address of the user
   * whose details you want to retrieve from the database.
   * @param password - The `password` parameter in the `getUserDetails` function is used to
   * authenticate the user when retrieving their details from the database. It is typically a secret
   * string that the user provides during login to verify their identity.
   * @returns The `getUserDetails` function is returning an object with `status` and `data` properties.
   * The `status` and `data` values are obtained from the result of calling the `getPublicUser` method
   * on the `dbController` object with the provided `email` and `password` parameters. If an error
   * occurs during this process, the function catches the error and logs a message indicating
   */
  async getUserDetails(email, password) {
    try {
      let { status, data } = await this.dbController.getPublicUser(
        email,
        password
      );
      return { status, data };
    } catch (error) {
      console.log("Failed to get user from the database.");
    }
  }

  /**
   * The function `getEmployeeDetails` asynchronously retrieves employee details from a database using
   * the provided email and password.
   * @param email - The `email` parameter is a string that represents the email address of the employee
   * whose details you want to retrieve from the database.
   * @param password - The `password` parameter in the `getEmployeeDetails` function is used to
   * authenticate the employee when retrieving their details from the database. It is typically used to
   * verify the identity of the employee before allowing access to their information.
   * @returns The `getEmployeeDetails` function is returning the result of calling
   * `this.dbController.getEmployee(email, password)` after awaiting its completion.
   */
  async getEmployeeDetails(email, password) {
    try {
      return await this.dbController.getEmployee(email, password);
    } catch (error) {
      console.log("Failed to get employee from the database.");
    }
  }

  /**
   * The function `registerUser` asynchronously creates a new public user in the database using the
   * provided user data and handles any errors that may occur.
   * @param userData - { fullname, email, password, phoneNumber (optional), profilePicture (optional) }
   * @returns account_id of the newly created account, or error if user is already registered
   */
  async registerUser({
    fullname,
    email,
    password,
    phoneNumber = null,
    profilePicture = null,
    account_type = "Public",
  }) {
    try {
      return await this.dbController.createNewPublicUser({
        fullname,
        email,
        password,
        phoneNumber,
        profilePicture,
        account_type,
      });
    } catch (error) {
      console.log("Failed to create a new user in the database.");
    }
  }

  /**
   * The function `registerEmployee` asynchronously registers a new employee by calling
   * `createNewEmployee` method from `dbController` and handles any errors that may occur.
   * @param employeeData - { fullname, email, password, property_id (Optional), type }
   * @returns The `registerEmployee` function is returning the result of
   * `this.dbController.createNewEmployee(employeeData)` after awaiting its completion.
   */
  async registerEmployee({
    fullname,
    email,
    password,
    property_id = null,
    type,
  }) {
    try {
      return await this.dbController.createNewEmployee({
        fullname,
        email,
        password,
        property_id,
        type,
      });
    } catch (error) {
      console.log("Failed to create a new employee in the database.");
    }
  }

  /**
   * This function retrieves all employees associated with a given property from the database
   * asynchronously.
   * @param property_id - The `property_id` parameter is used to specify the unique identifier of a
   * property for which you want to retrieve the employees associated with it from the database.
   * @returns The `getPropertyEmployees` function is returning a promise that resolves to the result of
   * calling the `getAllEmployees` method on the `dbController` with the `property_id` parameter.
   */
  async getPropertyEmployees(property_id) {
    try {
      return await this.dbController.getAllEmployees(property_id);
    } catch (error) {
      console.log(
        "Failed to get employees for given property in the database."
      );
    }
  }

  close() {
    this.dbController.close();
  }
}

module.exports = AccountsMaster;
