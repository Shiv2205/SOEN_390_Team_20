const DBControllerFactory = require("../Factory/DBControllerFactory");

class PropertyMaster {
  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  async registerNewProperty(propertyData){
    try {
        return await this.dbController.createNewProperty(propertyData);
    } catch (error) {
        return error;
    }
  }

  async getProperty(property_id){
    try {
        return await this.dbController.getProperty(property_id);
    } catch (error) {
        console.log(error);
    }
  }

  async getAllProperties(employee_id) {
    try {
        return await this.dbController.getAllProperties(employee_id);
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = PropertyMaster;