// DBControllerFactory.js
const DBController = require('../controllers/DBController');

class DBControllerFactory {
  static createInstance(DBPath) {
    return new DBController(DBPath);
  }
}

module.exports = DBControllerFactory;
