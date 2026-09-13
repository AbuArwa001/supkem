export interface OrganizationDetail {
  id: string | number;
  name: string;
  type: string;
  accreditation_status: string;
  reg_number: string;
  pin_number: string;
  county_council?: string;
  county_council_name: string;
  region_id?: string;
  region_name?: string;
  gps_location: string;
  website: string;
  phone_number: string;
  email: string;
  apps_count?: number;
  certs_count?: number;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  [key: string]: any;
}

export interface Personnel {
  id: string | number;
  status: string;
  user: User;
  [key: string]: any;
}
