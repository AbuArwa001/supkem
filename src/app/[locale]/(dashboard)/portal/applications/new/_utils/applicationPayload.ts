import type { ApplicationFormData } from "../_types";

interface BuildPayloadFlags {
  isMarriageService: boolean;
  isHajjUmrahService: boolean;
  isEducationService: boolean;
  isTravelVisaService: boolean;
  isEmploymentService: boolean;
}

export function buildApplicationPayload(formData: ApplicationFormData, flags: BuildPayloadFlags) {
  return {
    ...formData,
    organization: formData.organization || null,
    marriage_details: flags.isMarriageService ? formData.marriage_details : null,
    pilgrim_details: flags.isHajjUmrahService ? formData.pilgrim_details : null,
    education_details: flags.isEducationService ? formData.education_details : null,
    travel_visa_details: flags.isTravelVisaService ? formData.travel_visa_details : null,
    employment_details: flags.isEmploymentService ? formData.employment_details : null,
  };
}
