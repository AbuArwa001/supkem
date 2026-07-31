import type { Certificate } from "@/services/certificate-service";

export interface PilgrimDetails {
  full_name: string;
  nationality: string;
  passport_number: string;
  date_of_birth: string;
  trip_type: string;
  expected_travel_date: string;
  travel_agent_name?: string;
}

export interface SupportLetterTemplateProps {
  certificate: Certificate;
}
