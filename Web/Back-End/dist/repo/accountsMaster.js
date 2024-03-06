"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DBControllerFactory_1 = __importDefault(require("../Factory/DBControllerFactory"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class AccountsMaster {
    constructor() {
        this.dbController = DBControllerFactory_1.default.createInstance();
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
    getUserDetails(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, data } = yield this.dbController.getPublicUser(email, password);
                return { status, data };
            }
            catch (error) {
                throw new Error("Failed to get user from the database.");
            }
        });
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
    getEmployeeDetails(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.getEmployee(email, password);
            }
            catch (error) {
                const err = new Error("Failed to get employee from the database.");
                return err;
            }
        });
    }
    /**
     * The function `registerUser` asynchronously creates a new public user in the database using the
     * provided user data and handles any errors that may occur.
     * @param userData - { fullname, email, password, phoneNumber (optional), profilePicture (optional) }
     * @returns account_id of the newly created account, or error if user is already registered
     */
    registerUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Hash the password using bcryptjs
                const saltRounds = 8;
                const hashedPassword = yield bcryptjs_1.default.hash(userData.password, saltRounds);
                // Replace the plain text password with the hashed password
                userData.password = hashedPassword;
                return yield this.dbController.createNewPublicUser(userData);
            }
            catch (error) {
                const err = new Error("Failed to create a new user in the database.");
                return err;
            }
        });
    }
    /**
     * The function `registerEmployee` asynchronously registers a new employee by calling
     * `createNewEmployee` method from `dbController` and handles any errors that may occur.
     * @param employeeData - { fullname, email, password, property_id (Optional), type }
     * @returns The `registerEmployee` function is returning the result of
     * `this.dbController.createNewEmployee(employeeData)` after awaiting its completion.
     */
    registerEmployee(employeeData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.createNewEmployee(employeeData);
            }
            catch (error) {
                const err = new Error("Failed to create a new employee in the database.");
                return err;
            }
        });
    }
    /**
     * This function retrieves all employees associated with a given property from the database
     * asynchronously.
     * @param property_id - The `property_id` parameter is used to specify the unique identifier of a
     * property for which you want to retrieve the employees associated with it from the database.
     * @returns The `getPropertyEmployees` function is returning a promise that resolves to the result of
     * calling the `getAllEmployees` method on the `dbController` with the `property_id` parameter.
     */
    getPropertyEmployees(property_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.dbController.getAllEmployees(property_id);
            }
            catch (error) {
                const err = new Error("Failed to get employees for given property in the database.");
                return err;
            }
        });
    }
    close() {
        return this.dbController.close();
    }
}
exports.default = AccountsMaster;
