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
enum RequestType {
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
  initialize(DBPath?: string): Promise<{ init: string }>;
  populate(): Promise<{ populate: string }>;
  recordExists(
    table_name: string,
    id_column_name: string,
    record_id: any
  ): Promise<boolean>;
  createNewPublicUser(
    userData: UserData & {
      account_type?: "Public" | "Owner" | "Renter" | "Employee" | "Admin";
    }
  ): Promise<{ status: number; account_id?: string; message?: string }>;
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
