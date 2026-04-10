import type { MarriageDetails, PilgrimDetails, EducationDetails, TravelVisaDetails, EmploymentDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

export interface Application {
  id: string | number;
  display_id: string;
  organization_name?: string;
  service_name: string;
  status: string;
  submitted_at?: string;
  payment?: { status: string };
}

/** Full application shape used on the admin detail page */
export interface ApplicationDetail extends Application {
  created_at: string;
  updated_at?: string;
  comments?: string;
  certification?: { id: string; serial_number: string };
  marriage_details?: MarriageDetails | null;
  pilgrim_details?: PilgrimDetails | null;
  education_details?: EducationDetails | null;
  travel_visa_details?: TravelVisaDetails | null;
  employment_details?: EmploymentDetails | null;
}
