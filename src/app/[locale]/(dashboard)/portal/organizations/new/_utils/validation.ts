import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";

export function validateOrgForm(formData: Record<string, string>, setErrors: (errors: Record<string, string>) => void): boolean {
  const newErrors: Record<string, string> = {};
  if (!formData.name?.trim()) newErrors.name = "Institution name is required.";
  if (!formData.reg_number?.trim()) newErrors.reg_number = "Government registration number is required.";
  if (!formData.pin_number?.trim()) newErrors.pin_number = "KRA PIN is required.";
  if (!formData.region) newErrors.region = "Please select a jurisdiction region.";
  if (!formData.county_council) newErrors.county_council = "Please select a county council.";

  setErrors(newErrors);
  if (Object.keys(newErrors).length > 0) {
    scrollToFirstError(newErrors, { customMessage: "Please complete all required institution details" });
    return false;
  }
  return true;
}
