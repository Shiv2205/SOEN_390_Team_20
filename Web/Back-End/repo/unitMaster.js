const DBControllerFactory = require("../Factory/DBControllerFactory");

class UnitMaster {
  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  async registerUnit(unitData) {
    try {
      return await this.dbController.createNewUnit(unitData);
    } catch (error) {
      console.log(error);
    }
  }

  async getUnit(unit_id) {
    try {
      return await this.dbController.getUnit(unit_id);
    } catch (error) {
      console.log(error);
    }
  }

  async getPropertyUnits(property_id) {
    try {
        return await this.dbController.getAllUnits(property_id);
    } catch (error) {
        console.log(error);
    }
  }
}

module.exports = UnitMaster;