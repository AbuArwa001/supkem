// React/Next.js core
import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";

// Internal — hooks, services, data, types
import { useFormSteps } from "@/app/(dashboard)/portal/applications/new/_hooks/useFormSteps";
import { applicationSubmitService } from "@/app/(dashboard)/portal/applications/new/_services/applicationSubmitService";
import { initialFormData } from "@/app/(dashboard)/portal/applications/new/_data/initialFormData";
import { useAuth } from "@/hooks/useAuth";
import type {
  ApplicationFormData,
  Organization,
  Service,
} from "@/app/(dashboard)/portal/applications/new/_types";

export function useSubmitApplicationLogic() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);

  const selectedService = services.find((s) => s.id === formData.service);

  const { step, errors, setErrors, flags, handleNextStep, handlePrevStep, runValidation } =
    useFormSteps(formData, selectedService);

  const { isIndividualService, isMarriageService, isHajjUmrahService, isEducationService,
    isTravelVisaService, isEmploymentService } = flags;

  const canSelectOrganization = !isIndividualService || isMarriageService;

  // Seed user full name into personal-detail sub-forms when auth resolves
  useEffect(() => {
    if (!user) return;
    const fullName = [user.first_name, user.middle_name, user.last_name]
      .filter(Boolean).join(" ").trim();
    if (!fullName) return;
    setFormData((prev) => ({
      ...prev,
      pilgrim_details: { ...prev.pilgrim_details, full_name: fullName },
      education_details: { ...prev.education_details, full_name: fullName },
      travel_visa_details: { ...prev.travel_visa_details, full_name: fullName },
      employment_details: { ...prev.employment_details, full_name: fullName },
    }));
  }, [user]);

  // Fetch organisations and services on mount
  useEffect(() => {
    Promise.all([
      applicationSubmitService.fetchOrganizations(),
      applicationSubmitService.fetchServices(),
    ])
      .then(([orgs, servs]) => { setOrganizations(orgs); setServices(servs); })
      .catch((err) => console.error("Failed to fetch data", err));
  }, []);

  const updateSubDetails = (type: keyof ApplicationFormData, field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [type]: { ...(prev[type] as object), [field]: value } }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!runValidation(step)) return;
    setLoading(true);
    try {
      const payload = {
        ...formData,
        organization: formData.organization || null,
        marriage_details: isMarriageService ? formData.marriage_details : null,
        pilgrim_details: isHajjUmrahService ? formData.pilgrim_details : null,
        education_details: isEducationService ? formData.education_details : null,
        travel_visa_details: isTravelVisaService ? formData.travel_visa_details : null,
        employment_details: isEmploymentService ? formData.employment_details : null,
      };
      const response = await applicationSubmitService.submitApplication(payload as Record<string, unknown>);
      const fee = selectedService?.fee ? Number(selectedService.fee) : 1500;
      router.push(
        `/portal/applications/new/confirm?appId=${response.id}&service=${encodeURIComponent(selectedService?.name ?? "Service")}&fee=${fee}`,
      );
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, organizations, services, formData, step, errors,
    selectedService, isIndividualService, isMarriageService,
    isHajjUmrahService, isEducationService, isTravelVisaService,
    isEmploymentService, canSelectOrganization, updateSubDetails,
    handleNextStep, handlePrevStep, handleSubmit, setFormData, setErrors,
  };
}
