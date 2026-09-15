import type { ApplicationFormData } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";
import type { ServiceFlags } from "./serviceFlags";

export function validateStep(step: number, formData: ApplicationFormData, flags: ServiceFlags): Record<string, string> {
  const errs: Record<string, string> = {};
  if (step === 1) {
    if (!formData.service) errs.service = "Please select a service";
    if (flags.isOrganizationRequired && !formData.organization) errs.organization = "Organization is required";
  }

  if (step === 2) {
    if (flags.isMarriageService) {
      const m = formData.marriage_details;
      if (!m.husband_name?.trim()) errs.husband_name = "Groom's full legal name is required";
      if (!m.husband_id_passport?.trim()) errs.husband_id_passport = "Groom's National ID or Passport is required";
      if (!m.husband_age || Number(m.husband_age) < 18) errs.husband_age = "Groom's age is required (minimum 18 years)";
      if (!m.husband_occupation?.trim()) errs.husband_occupation = "Groom's occupation is required";
      if (!m.husband_residence_county?.trim()) errs.husband_residence_county = "Groom's county of residence is required";
      if (!m.husband_residence_sub_county?.trim()) errs.husband_residence_sub_county = "Groom's sub-county is required";
      
      if (!m.wife_name?.trim()) errs.wife_name = "Bride's full legal name is required";
      if (!m.wife_id_passport?.trim()) errs.wife_id_passport = "Bride's National ID or Passport is required";
      if (!m.wife_age || Number(m.wife_age) < 18) errs.wife_age = "Bride's age is required (minimum 18 years)";
      if (!m.wife_occupation?.trim()) errs.wife_occupation = "Bride's occupation is required";
      if (!m.wife_residence_county?.trim()) errs.wife_residence_county = "Bride's county of residence is required";
      if (!m.wife_residence_sub_county?.trim()) errs.wife_residence_sub_county = "Bride's sub-county is required";
    }
    if (flags.isHajjUmrahService) {
      const p = formData.pilgrim_details;
      if (!p.full_name) errs.full_name = "Name required";
      if (!p.passport_number) errs.passport_number = "Passport required";
      if (!p.nationality) errs.nationality = "Nationality required";
      if (!p.date_of_birth) errs.date_of_birth = "DOB required";
      if (!p.expected_travel_date) errs.expected_travel_date = "Date required";
    }
    if (flags.isEducationService) {
      const e = formData.education_details;
      if (!e.full_name) errs.full_name = "Name required";
      if (!e.institution_name) errs.institution_name = "Institution required";
    }
    if (flags.isTravelVisaService) {
      const t = formData.travel_visa_details;
      if (!t.full_name) errs.full_name = "Name required";
      if (!t.destination_country) errs.destination_country = "Destination required";
    }
    if (flags.isEmploymentService) {
      const em = formData.employment_details;
      if (!em.full_name) errs.full_name = "Name required";
      if (!em.id_number) errs.id_number = "ID required";
    }
  }

  if (step === 3 && flags.isMarriageService) {
    const m = formData.marriage_details;
    if (!m.wife_waliyy_name?.trim()) errs.wife_waliyy_name = "Bride's guardian (Waliyy) full name is required";
    if (!m.wife_waliyy_relationship?.trim()) errs.wife_waliyy_relationship = "Relationship to bride is required (e.g. Father/Brother)";
    if (!m.agreed_mahr?.trim()) errs.agreed_mahr = "Agreed Mahr (dowry value/specification) is required";
    if (!m.paid_mahr_and_deferred?.trim()) errs.paid_mahr_and_deferred = "Payment status (paid vs deferred) is required";
    if (!m.date_of_marriage?.trim()) errs.date_of_marriage = "Date of marriage solemnization is required";
    if (!m.place_of_marriage?.trim()) errs.place_of_marriage = "Place of marriage (Mosque or venue) is required";
    if (!m.county_of_marriage?.trim()) errs.county_of_marriage = "County of marriage solemnization is required";
    if (!m.witness_1_name?.trim()) errs.witness_1_name = "First Muslim witness's full name is required";
    if (!m.witness_1_id?.trim()) errs.witness_1_id = "First witness's ID or Passport number is required";
    if (!m.witness_2_name?.trim()) errs.witness_2_name = "Second Muslim witness's full name is required";
    if (!m.witness_2_id?.trim()) errs.witness_2_id = "Second witness's ID or Passport number is required";
  }
  return errs;
}
