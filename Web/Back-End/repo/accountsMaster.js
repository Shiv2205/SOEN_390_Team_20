const DBControllerFactory = require('../Factory/DBControllerFactory');

class AccountsMaster {
    constructor() {
      this.dbController = DBControllerFactory.createInstance();
    }
  
    async  getUserDetails(user_email, user_password) {
      try {
        let {status, data} = await this.dbController.getPublicUser(user_email, user_password);
        const { password, registration_key, created_at, ...public_data } = data;
        return { status, public_data };
      } catch (error) {
        console.log("Failed to get user from the database.");
      }
    }

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
    async registerUser(userData) {
      try {
        return await this.dbController.createNewPublicUser(userData);
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
    async registerEmployee(employeeData) {
      try {
        return await this.dbController.createNewEmployee(employeeData);
      } catch (error) {
        console.log("Failed to create a new employee in the database.");
      }
    }

    async getPropertyEmployees(property_id) {
      try {
        return await this.dbController.getAllEmployees(property_id);
      } catch (error) {
        console.log("Failed to get employees for given property in the database.");
      }
    }

    close() {
      this.dbController.close();
    }
  }
  
  module.exports = AccountsMaster;
  