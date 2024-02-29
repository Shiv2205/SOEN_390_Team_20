// DBControllerFactory.js
const DBController = require('../controllers/DBController');

class DBControllerFactory {
  static createInstance() {
    return new DBController();
  }
}

module.exports = DBControllerFactory;
