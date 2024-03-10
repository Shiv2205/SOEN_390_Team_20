// DBControllerFactory.js
import DBController from "../controllers/DBController";
import { IDBController } from "../types/DBTypes";

class DBControllerFactory {
  static createInstance(): IDBController {
    return new DBController();
  }
}

export default DBControllerFactory;