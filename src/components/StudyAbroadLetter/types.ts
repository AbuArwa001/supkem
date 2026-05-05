import type { Certificate } from "@/services/certificate-service";

export interface EducationDetails {
  full_name: string;
  passport_number: string;
  course_of_study: string;
  institution_name: string;
  country: string;
  scholarship_details?: string;
}

export interface StudyAbroadLetterTemplateProps {
  certificate: Certificate;
}
