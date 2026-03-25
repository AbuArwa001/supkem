import { useState, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Organization, Service, FormData } from "./types";
import { fetchOrganizations, fetchServices, submitApplication } from "./services";

const initialFormData: FormData = {
  organization: "",
  service: "",
  comments: "",
  marriage_details: {
    date_of_marriage: "",
    husband_name: "",
    husband_id_passport: "",
    husband_age: "",
    husband_marital_status: "First Marriage",
    husband_occupation: "",
    husband_residence_county: "",
    husband_residence_sub_county: "",
    wife_name: "",
    wife_id_passport: "",
    wife_age: "",
    wife_marital_status: "Virgin",
    wife_occupation: "",
    wife_residence_county: "",
    wife_residence_sub_county: "",
    wife_waliyy_name: "",
    wife_waliyy_relationship: "",
    agreed_mahr: "",
    paid_mahr_and_deferred: "",
    particulars_of_gifts: "",
    place_of_marriage: "",
    county_of_marriage: "",
    witness_1_name: "",
    witness_1_id: "",
    witness_2_name: "",
    witness_2_id: "",
  },
  pilgrim_details: {
    full_name: "",
    passport_number: "",
    nationality: "",
    date_of_birth: "",
    gender: "Male",
    trip_type: "Hajj",
    expected_travel_date: "",
    travel_agent_name: "",
    guidance_requested: false,
  },
  education_details: {
    full_name: "",
    passport_number: "",
    institution_name: "",
    course_of_study: "",
    country: "",
    scholarship_details: "",
  },
  travel_visa_details: {
    full_name: "",
    passport_number: "",
    destination_country: "",
    trip_purpose: "Religious",
    expected_travel_date: "",
  },
  employment_details: {
    full_name: "",
    id_number: "",
    position_applied_for: "",
    employer_name: "",
  }
};

export function useSubmitApplicationLogic() {
  const [loading, setLoading] = useState(false);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  useEffect(() => {
    const loadData = async () => {
      try {
        const [orgs, servs] = await Promise.all([
          fetchOrganizations(),
          fetchServices(),
        ]);
        setOrganizations(orgs);
        setServices(servs);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };
    loadData();
  }, []);

  const selectedService = services.find((s) => s.id === formData.service);
  
  const isOrganizationRequired = selectedService?.target_audience === "Organization";
  const isIndividualService = selectedService?.target_audience === "Individual";
  const isMarriageService = selectedService?.category === "Marriage";
  const isHajjUmrahService = !!(selectedService?.category?.toLowerCase().includes("hajj") ||
    selectedService?.name?.toLowerCase().includes("hajj") ||
    selectedService?.category?.toLowerCase().includes("umrah") ||
    selectedService?.name?.toLowerCase().includes("umrah"));
  const isEducationService = !!(selectedService?.category?.toLowerCase().includes("education") ||
    selectedService?.name?.toLowerCase().includes("study") ||
    selectedService?.name?.toLowerCase().includes("abroad"));
  const isTravelVisaService = !!(selectedService?.category?.toLowerCase().includes("travel") ||
    selectedService?.name?.toLowerCase().includes("visa"));
  const isEmploymentService = !!(selectedService?.category?.toLowerCase().includes("employment") ||
    selectedService?.name?.toLowerCase().includes("referral"));

  const canSelectOrganization = !isIndividualService || isMarriageService;

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const updateSubDetails = (type: keyof FormData, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [type]: {
        ...(prev[type] as any),
        [field]: value,
      },
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (currentStep: number) => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 1) {
      if (!formData.service) newErrors.service = "Please select a service";
      if (isOrganizationRequired && !formData.organization)
        newErrors.organization = "Organization is required for this service";
    }

    if (currentStep === 2) {
      if (isMarriageService) {
        const m = formData.marriage_details;
        if (!m.husband_name) newErrors.husband_name = "Husband's name is required";
        if (!m.husband_id_passport) newErrors.husband_id_passport = "Husband's ID/Passport is required";
        if (!m.husband_age) newErrors.husband_age = "Husband's age is required";
        if (!m.husband_occupation) newErrors.husband_occupation = "Husband's occupation is required";
        if (!m.husband_residence_county) newErrors.husband_residence_county = "County is required";
        if (!m.husband_residence_sub_county) newErrors.husband_residence_sub_county = "Sub-county is required";
        if (!m.wife_name) newErrors.wife_name = "Wife's name is required";
        if (!m.wife_id_passport) newErrors.wife_id_passport = "Wife's ID/Passport is required";
        if (!m.wife_age) newErrors.wife_age = "Wife's age is required";
        if (!m.wife_occupation) newErrors.wife_occupation = "Wife's occupation is required";
        if (!m.wife_residence_county) newErrors.wife_residence_county = "County is required";
        if (!m.wife_residence_sub_county) newErrors.wife_residence_sub_county = "Sub-county is required";
      } else if (isHajjUmrahService) {
        const p = formData.pilgrim_details;
        if (!p.full_name) newErrors.full_name = "Full name is required";
        if (!p.passport_number) newErrors.passport_number = "Passport number is required";
        if (!p.nationality) newErrors.nationality = "Nationality is required";
        if (!p.date_of_birth) newErrors.date_of_birth = "Date of birth is required";
        if (!p.expected_travel_date) newErrors.expected_travel_date = "Travel date is required";
      } else if (isEducationService) {
        const e = formData.education_details;
        if (!e.full_name) newErrors.full_name = "Full name is required";
        if (!e.passport_number) newErrors.passport_number = "Passport number is required";
        if (!e.institution_name) newErrors.institution_name = "Institution name is required";
        if (!e.course_of_study) newErrors.course_of_study = "Course is required";
        if (!e.country) newErrors.country = "Country is required";
      } else if (isTravelVisaService) {
        const t = formData.travel_visa_details;
        if (!t.full_name) newErrors.full_name = "Full name is required";
        if (!t.passport_number) newErrors.passport_number = "Passport number is required";
        if (!t.destination_country) newErrors.destination_country = "Destination is required";
        if (!t.expected_travel_date) newErrors.expected_travel_date = "Travel date is required";
      } else if (isEmploymentService) {
        const em = formData.employment_details;
        if (!em.full_name) newErrors.full_name = "Full name is required";
        if (!em.id_number) newErrors.id_number = "ID number is required";
        if (!em.position_applied_for) newErrors.position_applied_for = "Position is required";
        if (!em.employer_name) newErrors.employer_name = "Employer name is required";
      }
    }

    if (currentStep === 3 && isMarriageService) {
      const m = formData.marriage_details;
      if (!m.wife_waliyy_name) newErrors.wife_waliyy_name = "Waliyy name is required";
      if (!m.wife_waliyy_relationship) newErrors.wife_waliyy_relationship = "Relationship is required";
      if (!m.agreed_mahr) newErrors.agreed_mahr = "Mahr detail is required";
      if (!m.paid_mahr_and_deferred) newErrors.paid_mahr_and_deferred = "Payment status is required";
      if (!m.date_of_marriage) newErrors.date_of_marriage = "Date is required";
      if (!m.place_of_marriage) newErrors.place_of_marriage = "Place is required";
      if (!m.county_of_marriage) newErrors.county_of_marriage = "County is required";
      if (!m.witness_1_name) newErrors.witness_1_name = "Witness 1 name is required";
      if (!m.witness_1_id) newErrors.witness_1_id = "Witness 1 ID is required";
      if (!m.witness_2_name) newErrors.witness_2_name = "Witness 2 name is required";
      if (!m.witness_2_id) newErrors.witness_2_id = "Witness 2 ID is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep(step)) return;

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
      await submitApplication(payload);
      router.push("/portal");
    } catch (err) {
      console.error("Submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    organizations,
    services,
    formData,
    step,
    errors,
    selectedService,
    isOrganizationRequired,
    isIndividualService,
    isMarriageService,
    isHajjUmrahService,
    isEducationService,
    isTravelVisaService,
    isEmploymentService,
    canSelectOrganization,
    updateFormData,
    updateSubDetails,
    setFormData,
    setErrors,
    handleNextStep,
    handlePrevStep,
    handleSubmit,
  };
}
