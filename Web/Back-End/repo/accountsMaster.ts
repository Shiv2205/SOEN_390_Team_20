import DBControllerFactory from "../Factory/DBControllerFactory";
import bcrypt from "bcryptjs";
import { UserData, EmployeeData, PublicUserData } from "../types/DBTypes";

class AccountsMaster {
  private dbController: any; // You might want to replace 'any' with the actual type of dbController

  constructor() {
    this.dbController = DBControllerFactory.createInstance();
  }

  /**
   * The function `getUserDetails` asynchronously retrieves a user's details from the database using
   * the provided email and password.
   * @param email - The `email` parameter is a string that represents the email address of the user
   * whose details you want to retrieve from the database.
   * @param password - The `password` parameter in the `getUserDetails` function is used to
   * authenticate the user when retrieving their details from the database. It is typically a secret
   * string that the user provides during login to verify their identity.
   * @returns The `getUserDetails` function is returning an object with `status` and `data` properties.
   * The `status` and `data` values are obtained from the result of calling the `getPublicUser` method
   * on the `dbController` object with the provided `email` and `password` parameters. If an error
   * occurs during this process, the function catches the error and logs a message indicating
   */
  async getUserDetails(
    email: string,
    password: string
  ): Promise<{ status: number; data: PublicUserData }> {
    try {
      const { status, data } = await this.dbController.getPublicUser(
        email,
        password
      );
      return { status, data };
    } catch (error) {
      throw new Error("Failed to get user from the database.");
    }
  }

  /**
   * The function `getEmployeeDetails` asynchronously retrieves employee details from a database using
   * the provided email and password.
   * @param email - The `email` parameter is a string that represents the email address of the employee
   * whose details you want to retrieve from the database.
   * @param password - The `password` parameter in the `getEmployeeDetails` function is used to
   * authenticate the employee when retrieving their details from the database. It is typically used to
   * verify the identity of the employee before allowing access to their information.
   * @returns The `getEmployeeDetails` function is returning the result of calling
   * `this.dbController.getEmployee(email, password)` after awaiting its completion.
   */
  async getEmployeeDetails(
    email: string,
    password: string
  ): Promise<any | Error> {
    try {
      return await this.dbController.getEmployee(email, password);
    } catch (error) {
      const err: Error = new Error("Failed to get employee from the database.");
      return err;
    }
  }

  /**
   * The function `registerUser` asynchronously creates a new public user in the database using the
   * provided user data and handles any errors that may occur.
   * @param userData - { fullname, email, password, phoneNumber (optional), profilePicture (optional) }
   * @returns account_id of the newly created account, or error if user is already registered
   */
  async registerUser(
    userData: UserData
  ): Promise<
    | { status: number; account_id: string }
    | { status: number; message: string }
    | Error
  > {
    try {
      // Hash the password using bcryptjs
      const saltRounds = 8;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Replace the plain text password with the hashed password
      userData.password = hashedPassword;
      return await this.dbController.createNewPublicUser(userData);
    } catch (error) {
      const err: Error = new Error(
        "Failed to create a new user in the database."
      );
      return err;
    }
  }

  /**
   * The function `registerEmployee` asynchronously registers a new employee by calling
   * `createNewEmployee` method from `dbController` and handles any errors that may occur.
   * @param employeeData - { fullname, email, password, property_id (Optional), type }
   * @returns The `registerEmployee` function is returning the result of
   * `this.dbController.createNewEmployee(employeeData)` after awaiting its completion.
   */
  async registerEmployee(employeeData: EmployeeData): Promise<any | Error> {
    try {
      return await this.dbController.createNewEmployee(employeeData);
    } catch (error) {
      const err: Error = new Error(
        "Failed to create a new employee in the database."
      );
      return err;
    }
  }

  /**
   * This function retrieves all employees associated with a given property from the database
   * asynchronously.
   * @param property_id - The `property_id` parameter is used to specify the unique identifier of a
   * property for which you want to retrieve the employees associated with it from the database.
   * @returns The `getPropertyEmployees` function is returning a promise that resolves to the result of
   * calling the `getAllEmployees` method on the `dbController` with the `property_id` parameter.
   */
  async getPropertyEmployees(property_id: string): Promise<any | Error> {
    try {
      return await this.dbController.getAllEmployees(property_id);
    } catch (error) {
      const err: Error = new Error(
        "Failed to get employees for given property in the database."
      );
      return err;
    }
  }

  close() {
    return this.dbController.close();
  }
}

export default AccountsMaster;
