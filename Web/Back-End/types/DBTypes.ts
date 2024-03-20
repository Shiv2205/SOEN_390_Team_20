export interface UnitData {
  readonly property_id: string;
  size: number;
  monthly_rent: number;
  condo_fee: number;
  condo_balance: number;
  owner_id?: string;
  renter_id?: string;
  owner_registration_key?: string;
  renter_registration_key?: string;
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
  account_type: string;
}

interface IEmployeeData {
  fullname: string;
  email: string;
  property_id?: string | null;
  type: string;
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
enum RequestStatus {
  Received = 'Received',
  InProgress = 'In progress',
  Completed = 'Completed',
}

// RequestType enum
enum RequestType {
  DailyOperations = 'daily_operations',
  MoveIn = 'move_in',
  IntercomChange = 'intercom_change',
  Access = 'access',
  CommonAreaReport = 'common_area_report',
  Question = 'question',
}

// RequestDetails interface
export interface RequestDetails {
  request_id: string;
  employee_id: number;
  type: RequestType;
  description: string;
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
    userData: UserData
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
    employee_id: string
  ): Promise<{ status: number; data?: PropertyData[]; message?: string }>;
  createNewUnit(
    unitData: UnitData
  ): Promise<{ status: number; unit_id?: string; message?: string }>;
  getUnit(
    unit_id: string
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
  close(): void;
}
