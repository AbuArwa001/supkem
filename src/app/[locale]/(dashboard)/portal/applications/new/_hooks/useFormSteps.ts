// React/Next.js core
import { useState } from "react";

// Internal — validation utils, types
import { deriveServiceFlags, validateStep } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/validation";
import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";
import type { ApplicationFormData, Service } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

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
    const hasErrors = Object.keys(newErrors).length > 0;
    if (hasErrors) {
      // Intelligently auto-scroll and focus the first invalid field
      scrollToFirstError(newErrors, {
        customMessage: "Please complete all required fields to proceed",
      });
      return false;
    }
    return true;
  };

  const handleNextStep = () => {
    if (runValidation(step)) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 80, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 80, behavior: "smooth" });
  };

  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  };

  return {
    step,
    errors,
    setErrors,
    clearFieldError,
    flags,
    handleNextStep,
    handlePrevStep,
    runValidation,
  };
}
