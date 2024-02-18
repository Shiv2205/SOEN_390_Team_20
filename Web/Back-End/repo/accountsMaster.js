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
  
    async registerUser(userData) {
      try {
        return this.dbController.createNewPublicUser(userData);
      } catch (error) {
        console.log("Failed to create a new user in the database.");
      }
    }

    close() {
      this.dbController.close();
    }
  }
  
  module.exports = accountsMaster;
  