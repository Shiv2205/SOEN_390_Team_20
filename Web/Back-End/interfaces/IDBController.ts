import {
  EmployeeData,
  EmployeeDetails,
  PostData,
  PostDetails,
  PropertyData,
  PublicUserData,
  UnitData,
  UnitDetails,
  UserData,
  RequestDetails,
  RequestStatus,
  RequestData,
  EventData,
  EventDetails,
  EventAttendee,
  NotFound,
} from "../types/DBTypes";

export default interface IDBController {
  /**
   * This TypeScript function initializes a database by checking its existence, reading DDL from a
   * file, and creating tables based on the DDL.
   * @param {string} DBPath - The `DBPath` parameter in the `initialize` function is a string that
   * represents the path to the database file. If no value is provided when calling the function, it
   * defaults to the value of `currentDBPath`.
   * @returns The `initialize` function returns a Promise that resolves to an object with a property
   * `init` which is a string value. The string value can be either "Database initialized" if the
   * database was successfully initialized or "Database ready" if the database was already ready.
   */
  initialize(DBPath?: string): Promise<{ init: string }>;
  /**
   * The function `populate` asynchronously populates a database with dummy data if the database
   * exists, otherwise it rejects with a message indicating that the database does not exist.
   * @returns The `populate()` function returns a Promise that resolves to an object with a property
   * `populate` containing the string "Database populated" if the database exists and is ready. If the
   * database does not exist, the Promise rejects with an object containing the string "Database does
   * not exist".
   */
  populate(): Promise<{ populate: string }>;
  /**
   * This TypeScript function asynchronously checks if a record exists in a specified table based on
   * the provided ID column name and record ID.
   * @param {string} table_name - The `table_name` parameter refers to the name of the table in the
   * database where you want to check if a record with a specific `id_column_name` and `record_id`
   * exists.
   * @param {string} id_column_name - The `id_column_name` parameter refers to the name of the column
   * in the database table that uniquely identifies a record. This column is typically used as the
   * primary key or a unique identifier for each record in the table.
   * @param {any} record_id - The `record_id` parameter is the value that you want to check for
   * existence in the specified database table.
   * @returns The `recordExists` function is returning a Promise that resolves to a boolean value
   * indicating whether a record with the specified `record_id` exists in the specified `table_name`
   * and `id_column_name`.
   */
  recordExists(
    table_name: string,
    id_column_name: string,
    record_id: any
  ): Promise<boolean>;
  /**
   * The function creates a new public user in a database if the user does not already exist.
   * @param  - The `createNewPublicUser` function is an asynchronous function that creates a new user
   * in a database. It takes in the following parameters:
   * @returns The `createNewPublicUser` function returns a Promise that resolves to an object with the
   * following properties:
   * - `status`: A number indicating the status of the operation (201 for success, 400 for failure).
   * - `account_id`: A string representing the unique identifier of the newly created account (only
   * included if the operation was successful).
   * - `message`: A string providing additional information about the operation
   */
  createNewPublicUser(
    userData: UserData & {
      account_type?: "Public" | "Owner" | "Renter" | "Employee" | "Admin";
    }
  ): Promise<{ status: number; account_id?: string; message?: string }>;
  /**
   * This TypeScript function retrieves public user data based on email and password input, returning a
   * status code along with the data or an error message.
   * @param {string} email - The `email` parameter is a string that represents the email address of the
   * user you want to retrieve from the database.
   * @param {string} password - The `password` parameter in the `getPublicUser` function is a string
   * that represents the password of the user. This password is used to authenticate the user when
   * retrieving their public user data from the database.
   * @returns The `getPublicUser` function returns a Promise that resolves to an object with the
   * following structure:
   * ```typescript
   * {
   *   status: number,
   *   data?: PublicUserData,
   *   message?: string
   * }
   * ```
   * The `status` property indicates the status of the operation, where `202` typically means success
   * and `400` indicates an error. The `data` property contains public user data if
   */
  getPublicUser(
    email: string
  ): Promise<{ status: number; data?: PublicUserData; message?: string }>;
  /**
   * This TypeScript function creates a new employee record in a database, handling cases where the
   * employee may already exist.
   * @param {EmployeeData}  - The `createNewEmployee` function is an asynchronous function that creates
   * a new employee in a database. It takes in an object `EmployeeData` as a parameter with the
   * following properties:
   * @returns The `createNewEmployee` function returns a Promise that resolves to an object with the
   * following structure:
   * - `status`: a number indicating the status of the operation (201 for success)
   * - `employee_id`: a string representing the ID of the newly created employee
   * - `message`: a string message (optional)
   */
  createNewEmployee(
    employeeData: EmployeeData
  ): Promise<{ status: number; employee_id?: string; message?: string }>;
  /**
   * The function `getEmployee` retrieves employee details based on email and password, returning a
   * promise with status, data, and message.
   * @param {string} email - The `getEmployee` function you provided is an asynchronous function that
   * retrieves employee details based on the provided email and password. However, the password check
   * is currently commented out in the SQL query.
   * @param {string} password - The `password` parameter in the `getEmployee` function is used to
   * authenticate the user. It is typically compared with the password stored in the database for the
   * corresponding email address to verify the user's identity.
   * @returns The `getEmployee` function returns a Promise that resolves to an object with the
   * following structure:
   * ```typescript
   * {
   *   status: number; // HTTP status code indicating the outcome of the operation
   *   data?: EmployeeDetails; // Optional field containing details of the employee if found
   *   message?: string; // Optional field containing a message if there was an issue
   * }
   * ```
   */
  getEmployee(
    email: string
  ): Promise<{ status: number; data?: EmployeeDetails; message?: string }>;
  /**
   * This TypeScript function retrieves all employees associated with a specific property ID, handling
   * cases where no employees are found for the given property.
   * @param {string} property_id - The `property_id` parameter is a unique identifier for a property.
   * This function `getAllEmployees` is an asynchronous function that retrieves employee details for a
   * specific property based on the provided `property_id`. It first checks if the property exists in
   * the database using the `recordExists` method. If the
   * @returns The `getAllEmployees` function returns a Promise that resolves to an object with the
   * following structure:
   * - `status`: a number indicating the status of the operation (200 for success, 204 for no employees
   * found)
   * - `data`: an optional array of `EmployeeDetails` objects if employees are found
   * - `message`: an optional message string if no employees are found for the given property
   */
  getAllEmployees(
    property_id: string
  ): Promise<{ status: number; data?: EmployeeDetails[]; message?: string }>;
  /**
   * This TypeScript function creates a new property record in a database if it does not already exist
   * based on the provided property data.
   * @param {PropertyData}  - The `createNewProperty` function is an asynchronous function that takes
   * in an object `PropertyData` as a parameter with the following properties:
   * @returns The `createNewProperty` function returns a Promise that resolves to an object with the
   * following structure:
   * - `status`: a number indicating the status of the operation (201 for success, 400 for failure)
   * - `property_id`: a string representing the ID of the newly created property (only included if the
   * property was successfully created)
   * - `message`: a string providing additional information about the operation (
   */
  createNewProperty(
    propertyData: PropertyData
  ): Promise<{ status: number; property_id?: string; message?: string }>;
  /**
   * This TypeScript function retrieves a property from a database based on its ID, returning the
   * property data if it exists or an error message if it does not.
   * @param {string} property_id - The `getProperty` function is an asynchronous function that
   * retrieves property data based on the provided `property_id`. It first checks if the property
   * exists in the database by calling the `recordExists` function. If the property exists, it queries
   * the database to fetch the property data and returns a promise that resolves
   * @returns The `getProperty` function returns a Promise that resolves to an object with the
   * following structure: `{ status: number, data?: PropertyData, message?: string }`. The `status`
   * property indicates the status of the operation, `data` property contains the property data if it
   * exists, and `message` property contains an optional message if there is an error or the property
   * does not exist in the database
   */
  getProperty(
    property_id: string
  ): Promise<{ status: number; data?: PropertyData; message?: string }>;
  /**
   * This TypeScript function retrieves all properties associated with a given admin ID if the admin
   * exists, otherwise it returns a message indicating no properties were found.
   * @param {string} admin_id - The `admin_id` parameter is a string that represents the unique
   * identifier of an admin user. This function `getAllProperties` is an asynchronous function that
   * retrieves all properties associated with a specific admin user based on the provided `admin_id`.
   * @returns The `getAllProperties` function returns a Promise that resolves to an object with the
   * following structure:
   * - `status`: a number indicating the status of the operation (200 if successful, 204 if no
   * properties found)
   * - `data`: an array of `PropertyData` objects if properties are found
   * - `message`: a string message providing additional information if needed
   */
  getAllProperties(
    admin_id: string
  ): Promise<{ status: number; data?: PropertyData[]; message?: string }>;
  /**
   * The function `createNewUnit` asynchronously creates a new unit in a database with provided unit
   * data.
   * @param {UnitData}  - The `createNewUnit` function is an asynchronous function that takes in an
   * object `UnitData` as its parameter. The properties of `UnitData` include:
   * @returns The `createNewUnit` function returns a Promise that resolves to an object with the
   * following structure:
   * ```javascript
   * {
   *   status: number,
   *   unit_id?: string,
   *   message?: string
   * }
   * ```
   * The `status` property indicates the status of the operation (in this case, 201 for successful
   * creation). The `unit_id` property contains the ID of the newly created unit.
   */
  createNewUnit(
    unitData: UnitData
  ): Promise<{ status: number; unit_id?: string; message?: string }>;
  /**
   * This TypeScript function retrieves unit details based on a provided unit ID, handling cases where
   * the unit exists or does not exist in the database.
   * @param {string} unit_id - The `getUnit` function you provided is an asynchronous function that
   * retrieves details of a unit based on the `unit_id` provided. Here's a breakdown of the function:
   * @returns This `getUnit` function returns a Promise that resolves to an object with the following
   * structure: `{ status: number, data?: UnitDetails, message?: string }`. The `status` property
   * indicates the status of the operation, `data` contains details of the unit if it exists, and
   * `message` provides additional information if needed.
   */
  getUnit(
    unit_id: string
  ): Promise<{ status: number; data?: UnitDetails; message?: string }>;
  /**
   * This TypeScript function retrieves details of an occupied unit based on the occupant ID provided.
   * @param {string} occupant_id - The `getOccupiedUnit` function is an asynchronous function that
   * retrieves details of an occupied unit based on the occupant's ID. Here's a breakdown of the
   * function:
   * @returns This function returns a Promise that resolves to an object with the following structure:
   * ```typescript
   * {
   *   status: number,
   *   data?: UnitDetails,
   *   message?: string
   * }
   * ```
   * - `status`: A number indicating the status of the operation. It can be 202 if the unit exists and
   * data is returned, or 400 if the unit does not exist in the database.
   * -
   */
  getOccupiedUnit(
    occupant_id: string
  ): Promise<{ status: number; data?: UnitDetails; message?: string }>;
  /**
   * This TypeScript function retrieves all units associated with a specific property ID from a
   * database, handling cases where no units are found.
   * @param {string} property_id - The `getAllUnits` function is an asynchronous function that
   * retrieves unit details based on a given `property_id`. Here's a breakdown of the function:
   * @returns The `getAllUnits` function returns a Promise that resolves to an object with the
   * following structure:
   * ```typescript
   * {
   *   status: number,
   *   data?: UnitDetails[],
   *   message?: string
   * }
   * ```
   * - `status`: A number indicating the status of the operation (e.g., 200 for success, 204 for no
   * content).
   * - `data`: An optional array of `UnitDetails
   */
  getAllUnits(
    property_id: string
  ): Promise<{ status: number; data?: UnitDetails[]; message?: string }>;
  /**
   * This TypeScript function asynchronously creates a new post in a database table with specified data
   * and returns the status and post ID.
   * @param {PostData}  - The `createNewPost` function is an asynchronous function that creates a new
   * post in a database. It takes in an object `PostData` as its parameter with the following
   * properties:
   * @returns The `createNewPost` function is returning a Promise that resolves to an object with two
   * properties: `status` and `post_id`. The `status` property is a number indicating the status of the
   * operation (in this case, 201 for successful creation), and the `post_id` property is a string
   * representing the ID of the newly created post.
   */
  createNewPost(
    postData: PostData
  ): Promise<{ status: number; post_id: string }>;
  /**
   * This TypeScript function retrieves all posts created by a specific user based on their ID,
   * handling cases where the user has no posts in the database.
   * @param {string} creator_id - The `getAllUserPosts` function is an asynchronous function that
   * retrieves all posts created by a user with a specific `creator_id`.
   * @returns The function `getAllUserPosts` returns a Promise that resolves to an object with the
   * following structure:
   * - `status`: a number indicating the status of the operation (200 if successful, 204 if user has no
   * posts)
   * - `data`: an array of `PostDetails` objects if posts exist for the specified `creator_id`
   * - `message`: a string message indicating that the user has no
   */
  getAllUserPosts(
    creator_id: string
  ): Promise<{ status: number; data?: PostDetails[]; message?: string }>;
  /**
   * This TypeScript function retrieves all replies to a specific post from a database, handling cases
   * where there are no replies available.
   * @param {string} post_id - The `getAllPostsReplies` function is an asynchronous function that
   * retrieves all replies to a specific post based on the `post_id` provided as a parameter.
   * @returns This function returns a Promise that resolves to an object with the following structure:
   * ```typescript
   * {
   *   status: number,
   *   data?: PostDetails[],
   *   message?: string
   * }
   * ```
   * - `status`: A number indicating the status of the operation (e.g., 200 for success, 204 for no
   * content).
   * - `data`: An optional array of `PostDetails` objects representing the
   */
  getAllPostsReplies(
    post_id: string
  ): Promise<{ status: number; data?: PostDetails[]; message?: string }>;
  /**
   * This function retrieves all posts related to a specific property ID, checking if any posts exist
   * and returning the data or a message accordingly.
   * @param {string} property_id - The `getAllPropertyPosts` function is an asynchronous function that
   * retrieves all posts associated with a specific property ID. It first checks if any posts exist for
   * the given property ID by calling the `recordExists` function. If posts exist, it queries the
   * database to fetch all posts with the specified property ID
   * @returns The `getAllPropertyPosts` function returns a Promise that resolves to an object with the
   * following structure:
   * - `status`: a number indicating the status of the operation (200 if successful, 204 if there are no
   * posts for the property)
   * - `data`: an array of `PostDetails` objects if posts exist for the property
   * - `message`: a string message indicating that the property has no
   */
  getAllPropertyPosts(
    property_id: string
  ): Promise<{ status: number; data?: PostDetails[]; message?: string }>;
  /**
   * This TypeScript function creates a new request in a database and returns the status and request ID
   * in a Promise.
   * @param {RequestData}  - The `createNewRequest` function is an asynchronous function that takes in
   * an object `RequestData` as its parameter. The `RequestData` object should have properties
   * `unit_id`, `type`, and `description`.
   * @returns The `createNewRequest` function is returning a Promise that resolves to an object with
   * two properties: `status` and `request_id`. The `status` property indicates the status of the
   * request creation operation, and the `request_id` property contains the unique identifier generated
   * for the new request.
   */
  createNewRequest(
    requestData: RequestData
  ): Promise<{ status: number; request_id: string }>;
  /**
   * This TypeScript function asynchronously retrieves a request from a database based on the request
   * ID, handling cases where the request does not exist.
   * @param {string} request_id - The `getRequest` function is an asynchronous function that takes a
   * `request_id` as a parameter. It returns a Promise that resolves to an object with a `status`
   * property (number), and optionally a `data` property (RequestDetails) or a `message` property
   * (string).
   * @returns This function `getRequest` returns a Promise that resolves to an object with the following
   * properties:
   * - `status`: a number indicating the status of the request (200 for success, 400 for failure)
   * - `data`: an optional property containing the details of the request (if the request exists)
   * - `message`: an optional property containing a message (if the request does not exist in the
   * database)
   */
  getRequest(
    request_id: string
  ): Promise<{ status: number; data?: RequestDetails; message?: string }>;
  /**
   * This TypeScript function retrieves all employee requests from a database based on the provided
   * employee ID.
   * @param {string} employee_id - The `getAllEmployeeRequests` function is designed to retrieve all
   * requests associated with a specific employee from a database. The function takes the `employee_id`
   * as a parameter, which is a string representing the unique identifier of the employee for whom the
   * requests are being fetched.
   * @returns The function `getAllEmployeeRequests` returns a Promise that resolves to an object with
   * the following structure:
   * ```typescript
   * {
   *   status: number; // HTTP status code indicating the outcome of the operation
   *   data?: RequestDetails[]; // Array of RequestDetails objects if the operation was successful
   *   message?: string; // Optional message providing additional information about the outcome
   * }
   * ```
   */
  getAllEmployeeRequests(employee_id: string): Promise<{
    status: number;
    data?: RequestDetails[];
    message?: string;
  }>;
  /**
   * This TypeScript function retrieves all unit requests from a database based on a given unit ID.
   * @param {string} unit_id - The `unit_id` parameter is a string that represents the identifier of a
   * specific unit for which you want to retrieve all requests.
   * @returns The `getAllUnitRequests` function returns a Promise that resolves to an object with the
   * following structure:
   * ```typescript
   * {
   *   status: number; // HTTP status code indicating the outcome of the operation
   *   data?: RequestDetails[]; // Array of RequestDetails objects if the operation was successful
   *   message?: string; // Optional message providing additional information about the operation
   * }
   * ```
   */
  getAllUnitRequests(
    unit_id: string
  ): Promise<{ status: number; data?: RequestDetails[]; message?: string }>;
  /**
   * The close function closes the database connection and logs an error message if there is an error.
   */
  close(): void;
}
