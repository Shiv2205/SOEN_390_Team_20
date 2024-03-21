export interface UnitData {
  readonly property_id: string;
  size: number;
  monthly_rent: number;
  condo_fee: number;
  condo_balance: number;
  occupant_id?: string;
  occupant_registration_key?: string;
  occupant_type?: "owner" | "renter";
}

export interface UnitDetails extends UnitData {
  readonly unit_id: string;
}

export interface PostData {
  readonly property_id: string;
  readonly creator_id: string;
  content: string;
  replied_to?: string;
}

export interface PostDetails extends PostData {
  readonly post_id: string;
  posted_at: string;
}

interface IUserData {
  fullname: string;
  email: string;
  phone_number?: string;
  profile_picture?: string;
}

export interface UserData extends IUserData {
  password: string;
}

export interface PublicUserData extends IUserData {
  readonly account_id: string;
  readonly account_type: string;
}

interface IEmployeeData {
  fullname: string;
  email: string;
  property_id?: string | null;
  type: "manager" | "accountant" | "daily_operator";
}

export interface EmployeeData extends IEmployeeData {
  password: string;
}

export interface EmployeeDetails extends IEmployeeData {
  readonly employee_id: string;
  phone_number: string;
  profile_picture: string;
}

export interface PropertyData {
  property_id?: string;
  admin_id: string;
  unit_count: number;
  parking_count: number;
  locker_count: number;
  address: string;
  picture?: string;
}

export interface UserCredentials {
  email: string;
  password: string;
}

// RequestStatus enum
export enum RequestStatus {
  Received = "Received",
  InProgress = "In progress",
  Completed = "Completed",
}

// RequestType enum
export enum RequestType {
  DailyOperations = "daily_operations",
  MoveIn = "move_in",
  IntercomChange = "intercom_change",
  Access = "access",
  CommonAreaReport = "common_area_report",
  Question = "question",
}

export interface RequestData {
  unit_id: string;
  type: RequestType;
  description: string;
}

// RequestDetails interface
export interface RequestDetails extends RequestData {
  request_id: string;
  employee_id: string;
  status: RequestStatus;
}

export interface IDBController {
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
    email: string,
    password: string
  ): Promise<{ status: number; data?: PublicUserData; message?: string }>;
  createNewEmployee(
    employeeData: EmployeeData
  ): Promise<{ status: number; employee_id?: string; message?: string }>;
  getEmployee(
    email: string,
    password: string
  ): Promise<{ status: number; data?: EmployeeDetails; message?: string }>;
  getAllEmployees(
    property_id: string
  ): Promise<{ status: number; data?: EmployeeDetails[]; message?: string }>;
  createNewProperty(
    propertyData: PropertyData
  ): Promise<{ status: number; property_id?: string; message?: string }>;
  getProperty(
    property_id: string
  ): Promise<{ status: number; data?: PropertyData; message?: string }>;
  getAllProperties(
    admin_id: string
  ): Promise<{ status: number; data?: PropertyData[]; message?: string }>;
  createNewUnit(
    unitData: UnitData
  ): Promise<{ status: number; unit_id?: string; message?: string }>;
  getUnit(
    unit_id: string
  ): Promise<{ status: number; data?: UnitDetails; message?: string }>;
  getOccupiedUnit(
    occupant_id: string
  ): Promise<{ status: number; data?: UnitDetails; message?: string }>;
  getAllUnits(
    property_id: string
  ): Promise<{ status: number; data?: UnitDetails[]; message?: string }>;
  createNewPost(
    postData: PostData
  ): Promise<{ status: number; post_id: string }>;
  getAllUserPosts(
    creator_id: string
  ): Promise<{ status: number; data?: PostDetails[]; message?: string }>;
  getAllPropertyPosts(
    property_id: string
  ): Promise<{ status: number; data?: PostDetails[]; message?: string }>;
  getAllPostsReplies(
    post_id: string
  ): Promise<{ status: number; data?: PostDetails[]; message?: string }>;
  createNewRequest(
    requestData: RequestData
  ): Promise<{ status: number; request_id: string }>;
  getRequest(
    request_id: string
  ): Promise<{ status: number; data?: RequestDetails; message?: string }>;
  getAllEmployeeRequests(employee_id: string): Promise<{
    status: number;
    data?: RequestDetails[];
    message?: string;
  }>;
  getAllUnitRequests(
    unit_id: string
  ): Promise<{ status: number; data?: RequestDetails[]; message?: string }>;
  close(): void;
}
