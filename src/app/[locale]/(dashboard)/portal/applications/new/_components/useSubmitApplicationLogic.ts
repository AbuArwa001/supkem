import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "@/i18n/routing";
import { toast } from "sonner";
import { useFormSteps } from "../_hooks/useFormSteps";
import { applicationSubmitService } from "../_services/applicationSubmitService";
import { initialFormData } from "../_data/initialFormData";
import { useAuth } from "@/hooks/useAuth";
import type { ApplicationFormData, Organization, Service } from "../_types";
import { buildApplicationPayload } from "../_utils/applicationPayload";

export function useSubmitApplicationLogic() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<ApplicationFormData>(initialFormData);

  const selectedService = services.find((s) => s.id === formData.service);
  const { step, errors, setErrors, clearFieldError, flags, handleNextStep, handlePrevStep, runValidation } =
    useFormSteps(formData, selectedService);

  const { isIndividualService, isMarriageService, isHajjUmrahService, isEducationService,
    isTravelVisaService, isEmploymentService } = flags;
  const canSelectOrganization = !isIndividualService || isMarriageService;

  useEffect(() => {
    if (!user) return;
    const fullName = [user.first_name, user.middle_name, user.last_name].filter(Boolean).join(" ").trim();
    if (!fullName) return;
    setFormData((prev) => ({
      ...prev,
      pilgrim_details: { ...prev.pilgrim_details, full_name: fullName },
      education_details: { ...prev.education_details, full_name: fullName },
      travel_visa_details: { ...prev.travel_visa_details, full_name: fullName },
      employment_details: { ...prev.employment_details, full_name: fullName },
    }));
  }, [user]);

  useEffect(() => {
    setDataLoading(true);
    Promise.all([applicationSubmitService.fetchOrganizations(), applicationSubmitService.fetchServices()])
      .then(([orgs, servs]) => { setOrganizations(orgs); setServices(servs); })
      .catch((err) => console.error("Failed to fetch data", err))
      .finally(() => setDataLoading(false));
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
      const payload = buildApplicationPayload(formData, {
        isMarriageService, isHajjUmrahService, isEducationService, isTravelVisaService, isEmploymentService,
      });
      const response = await applicationSubmitService.submitApplication(payload as Record<string, unknown>);
      const rawFee = selectedService?.fee;
      const fee = rawFee !== undefined && rawFee !== null && !isNaN(Number(rawFee)) ? Number(rawFee) : 0;
      
      if (fee <= 0) {
        toast.success("Application submitted successfully! No payment required for this service.");
        router.push(`/portal/applications/${response.id}`);
        return;
      }

      router.push(`/portal/applications/new/confirm?appId=${response.id}&service=${encodeURIComponent(selectedService?.name ?? "Service")}&fee=${fee}`);
    } catch (err: any) {
      console.error("Submission failed", err);
      toast.error(err?.response?.data?.detail || "Application submission failed. Please review your information and try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading, dataLoading, organizations, services, formData, step, errors,
    selectedService, isIndividualService, isMarriageService,
    isHajjUmrahService, isEducationService, isTravelVisaService,
    isEmploymentService, canSelectOrganization, updateSubDetails,
    handleNextStep, handlePrevStep, handleSubmit, setFormData, setErrors, clearFieldError,
  };
}
