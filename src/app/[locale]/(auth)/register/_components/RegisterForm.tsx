"use client";

import { RegisterFormData, FieldErrors } from "./types";
import { RegisterErrorBanner } from "./RegisterErrorBanner";
import { RegisterIdentityFields } from "./RegisterIdentityFields";
import { RegisterContactFields } from "./RegisterContactFields";
import { RegisterSecurityFields } from "./RegisterSecurityFields";
import { RegisterFormActions } from "./RegisterFormActions";

interface RegisterFormProps {
  formData: RegisterFormData;
  setFormData: (data: RegisterFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  fieldErrors?: FieldErrors;
  onFieldChange?: (field: keyof RegisterFormData, value: string) => void;
}

export function RegisterForm({
  formData,
  setFormData,
  onSubmit,
  loading,
  error,
  fieldErrors = {},
  onFieldChange,
}: RegisterFormProps) {
  const handleChange = (field: keyof RegisterFormData, value: string) => {
    if (onFieldChange) {
      onFieldChange(field, value);
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="p-8 sm:p-12 lg:p-14 rounded-[32px] bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl shadow-slate-300/40 space-y-10 relative"
    >
      <RegisterErrorBanner error={error} fieldErrors={fieldErrors} />
      <RegisterIdentityFields
        formData={formData}
        fieldErrors={fieldErrors}
        onChange={handleChange}
      />
      <RegisterContactFields
        formData={formData}
        fieldErrors={fieldErrors}
        onChange={handleChange}
      />
      <RegisterSecurityFields
        formData={formData}
        fieldErrors={fieldErrors}
        onChange={handleChange}
      />
      <RegisterFormActions loading={loading} />
    </form>
  );
}
