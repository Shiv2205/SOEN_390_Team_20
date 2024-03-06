export interface UnitData {
  property_id: string;
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
  unit_id: string;
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
  account_id: string;
  account_type: string;
}

export interface EmployeeData {
  fullname: string;
  email: string;
  password: string;
  property_id?: string | null;
  type: string;
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
