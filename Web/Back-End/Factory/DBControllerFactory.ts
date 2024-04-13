// DBControllerFactory.js
import DBController from "../controllers/DBController";
import IDBController from "../interfaces/IDBController";

/* The `DBControllerFactory` class in TypeScript provides a static method to create instances of
`DBController`. */
class DBControllerFactory {
  /**
   * The function `createInstance` returns a new instance of `DBController` implementing the
   * `IDBController` interface.
   * @returns An instance of the `DBController` class is being returned.
   */
  static createInstance(): IDBController {
    return new DBController();
  }
}

export default DBControllerFactory;