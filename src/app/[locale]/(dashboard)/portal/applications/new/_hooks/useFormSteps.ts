// React/Next.js core
import { useState } from "react";

// Internal — validation utils, types
import { deriveServiceFlags, validateStep } from "@/app/(dashboard)/portal/applications/new/_utils/validation";
import type { ApplicationFormData, Service } from "@/app/(dashboard)/portal/applications/new/_types";

export function useFormSteps(
  formData: ApplicationFormData,
  selectedService: Service | undefined,
) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const flags = deriveServiceFlags(selectedService);

  const runValidation = (currentStep: number) => {
    const newErrors = validateStep(currentStep, formData, flags);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (runValidation(step)) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return { step, errors, setErrors, flags, handleNextStep, handlePrevStep, runValidation };
}
