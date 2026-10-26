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
