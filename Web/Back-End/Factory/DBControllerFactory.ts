// DBControllerFactory.js
import DBController from "../controllers/DBController";

class DBControllerFactory {
  static createInstance() {
    return new DBController();
  }
}

export default DBControllerFactory;