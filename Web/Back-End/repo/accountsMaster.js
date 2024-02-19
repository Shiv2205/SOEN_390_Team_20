const DBControllerFactory = require('../Factory/DBControllerFactory');

class accountsMaster {
    constructor() {
      this.dbController = DBControllerFactory.createInstance();
    }
  
    async  getUserDetails(email, password) {
      try {
        return await this.dbController.getPublicUser(email, password);
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

    async registerEmployee(employeeData) {
      try {
        return await this.dbController.createNewEmployee(employeeData);
      } catch (error) {
        console.log("Failed to create a new employee in the database.");
      }
    }

    close() {
      this.dbController.close();
    }
  }
  
  module.exports = accountsMaster;
  