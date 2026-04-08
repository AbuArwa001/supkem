export interface MarriageDetails {
  date_of_marriage: string;
  husband_name: string;
  husband_id_passport: string;
  husband_age: string;
  husband_marital_status: string;
  husband_occupation: string;
  husband_residence_county: string;
  husband_residence_sub_county: string;
  wife_name: string;
  wife_id_passport: string;
  wife_age: string;
  wife_marital_status: string;
  wife_occupation: string;
  wife_residence_county: string;
  wife_residence_sub_county: string;
  wife_waliyy_name: string;
  wife_waliyy_relationship: string;
  agreed_mahr: string;
  paid_mahr_and_deferred: string;
  particulars_of_gifts: string;
  place_of_marriage: string;
  county_of_marriage: string;
  witness_1_name: string;
  witness_1_id: string;
  witness_2_name: string;
  witness_2_id: string;
}

export interface PilgrimDetails {
  full_name: string;
  passport_number: string;
  nationality: string;
  date_of_birth: string;
  gender: string;
  trip_type: string;
  expected_travel_date: string;
  travel_agent_name: string;
  guidance_requested: boolean;
}

export interface EducationDetails {
  full_name: string;
  passport_number: string;
  institution_name: string;
  course_of_study: string;
  country: string;
  scholarship_details: string;
}

export interface TravelVisaDetails {
  full_name: string;
  passport_number: string;
  destination_country: string;
  trip_purpose: string;
  expected_travel_date: string;
}

export interface EmploymentDetails {
  full_name: string;
  id_number: string;
  position_applied_for: string;
  employer_name: string;
}

export interface ApplicationFormData {
  organization: string;
  service: string;
  comments: string;
  marriage_details: MarriageDetails;
  pilgrim_details: PilgrimDetails;
  education_details: EducationDetails;
  travel_visa_details: TravelVisaDetails;
  employment_details: EmploymentDetails;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  fee: number;
  category: string;
  target_audience: "Individual" | "Organization";
}

export interface Organization {
  id: string;
  name: string;
  [key: string]: unknown;
}

export interface PortalApplicationDetail extends ApplicationFormData {
  id: string;
  id_number: string;
  service_name: string;
  user_name: string;
  service_fee: number;
  status: string;
  submitted_at: string;
  updated_at: string;
  organization_name?: string;
  payment?: {
    status: string;
    amount: string;
    receipt_number?: string;
  };
  certification?: {
    id: string;
    serial_number: string;
  };
}
