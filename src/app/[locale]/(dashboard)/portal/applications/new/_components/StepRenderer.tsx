"use client";

import { ServiceSelection } from "./ServiceSelection";
import { MarriageDetailsStep1 } from "./MarriageDetailsStep1";
import { MarriageDetailsStep2 } from "./MarriageDetailsStep2";
import { PilgrimDetailsForm } from "./PilgrimDetailsForm";
import { EducationDetailsForm } from "./EducationDetailsForm";
import { TravelVisaDetailsForm } from "./TravelVisaDetailsForm";
import { EmploymentDetailsForm } from "./EmploymentDetailsForm";

interface StepRendererProps {
  step: number;
  flags: any;
  formData: any;
  errors: Record<string, string>;
  services: any[];
  dataLoading: boolean;
  updateSubDetails: (type: any, field: string, value: any) => void;
  setFormData: (val: any) => void;
  setErrors: (val: any) => void;
  onProceed: () => void;
}

export function StepRenderer({
  step, flags, formData, errors, services, dataLoading,
  updateSubDetails, setFormData, setErrors, onProceed,
}: StepRendererProps) {
  if (step === 1) {
    return (
      <ServiceSelection
        services={services}
        selectedServiceId={formData.service}
        errors={errors}
        dataLoading={dataLoading}
        onProceed={onProceed}
        onSelect={(s) => {
          setFormData({ ...formData, service: s.id, organization: s.target_audience === "Individual" ? "" : formData.organization });
          if (errors.service) setErrors((prev: any) => { const { service, ...rest } = prev; return rest; });
        }}
      />
    );
  }

  if (step === 2) {
    return (
      <>
        {flags.isMarriageService && (
          <MarriageDetailsStep1
            data={formData.marriage_details}
            errors={errors}
            onChange={(f, v) => updateSubDetails("marriage_details", f, v)}
          />
        )}
        {flags.isHajjUmrahService && (
          <PilgrimDetailsForm
            data={formData.pilgrim_details}
            errors={errors}
            onChange={(f, v) => updateSubDetails("pilgrim_details", f, v)}
          />
        )}
        {flags.isEducationService && (
          <EducationDetailsForm
            data={formData.education_details}
            errors={errors}
            onChange={(f, v) => updateSubDetails("education_details", f, v)}
          />
        )}
        {flags.isTravelVisaService && (
          <TravelVisaDetailsForm
            data={formData.travel_visa_details}
            errors={errors}
            onChange={(f, v) => updateSubDetails("travel_visa_details", f, v)}
          />
        )}
        {flags.isEmploymentService && (
          <EmploymentDetailsForm
            data={formData.employment_details}
            errors={errors}
            onChange={(f, v) => updateSubDetails("employment_details", f, v)}
          />
        )}
      </>
    );
  }

  if (step === 3 && flags.isMarriageService) {
    return (
      <MarriageDetailsStep2
        data={formData.marriage_details}
        errors={errors}
        onChange={(f, v) => updateSubDetails("marriage_details", f, v)}
      />
    );
  }

  return null;
}
