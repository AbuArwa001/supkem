export interface Application {
  id: string | number;
  service_name: string;
  status: "Approved" | "Rejected" | "Under Review" | string;
  organization_name?: string;
  submitted_at?: string;
  [key: string]: any;
}

export interface ApplicationsResponse {
  results?: Application[];
  [key: string]: any;
}
