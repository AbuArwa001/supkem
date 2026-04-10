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
      if (!m.husband_name) errs.husband_name = "Husband name required";
      if (!m.husband_id_passport) errs.husband_id_passport = "ID required";
      if (!m.husband_age) errs.husband_age = "Age required";
      if (!m.husband_occupation) errs.husband_occupation = "Occupation required";
      if (!m.husband_residence_county) errs.husband_residence_county = "County required";
      if (!m.husband_residence_sub_county) errs.husband_residence_sub_county = "Sub-county required";
      if (!m.wife_name) errs.wife_name = "Wife name required";
      if (!m.wife_id_passport) errs.wife_id_passport = "ID required";
      if (!m.wife_age) errs.wife_age = "Age required";
      if (!m.wife_occupation) errs.wife_occupation = "Occupation required";
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
    if (!m.wife_waliyy_name) errs.wife_waliyy_name = "Waliyy required";
    if (!m.wife_waliyy_relationship) errs.wife_waliyy_relationship = "Relationship required";
    if (!m.agreed_mahr) errs.agreed_mahr = "Mahr detail required";
    if (!m.paid_mahr_and_deferred) errs.paid_mahr_and_deferred = "Status required";
    if (!m.date_of_marriage) errs.date_of_marriage = "Date required";
    if (!m.place_of_marriage) errs.place_of_marriage = "Place required";
    if (!m.witness_1_name) errs.witness_1_name = "Witness 1 required";
    if (!m.witness_2_name) errs.witness_2_name = "Witness 2 required";
  }
  return errs;
}
