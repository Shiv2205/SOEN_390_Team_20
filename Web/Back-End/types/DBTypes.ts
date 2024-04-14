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
  readonly creator_name: string;
  posted_at: string;
}

interface IUserData {
  fullname: string;
  email: string;
  password: string;
  phone_number?: string;
  profile_picture?: string;
}

export interface UserData extends IUserData {
  
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

//Events table data
export interface EventData {
  host_id: string;
  title: string;
  description: string;
  location: string;
  date_and_time: string;
}

//Events Details
export interface EventDetails extends EventData {
  event_id: string;
}