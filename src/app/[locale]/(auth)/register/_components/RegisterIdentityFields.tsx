"use client";

import { User } from "lucide-react";
import { RegisterFormData, FieldErrors } from "./types";
import { useTranslations } from "next-intl";
import { RegisterTextInput } from "./RegisterTextInput";

interface RegisterIdentityFieldsProps {
  formData: RegisterFormData;
  fieldErrors: FieldErrors;
  onChange: (field: keyof RegisterFormData, value: string) => void;
}

export function RegisterIdentityFields({
  formData,
  fieldErrors,
  onChange,
}: RegisterIdentityFieldsProps) {
  const t = useTranslations("Auth.register");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
          <User size={18} />
        </div>
        <div>
          <h3 className="text-base font-black font-outfit text-slate-800 uppercase tracking-wider">
            1. Personal Identity
          </h3>
          <p className="text-xs text-slate-400 font-medium">As stated on your National ID or Passport</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RegisterTextInput
          label={t("firstName")}
          name="first_name"
          value={formData.first_name}
          placeholder="e.g. Abdullah"
          icon={User}
          required
          error={fieldErrors.first_name}
          onChange={(val) => onChange("first_name", val)}
        />

        <RegisterTextInput
          label={t("middleName")}
          name="middle_name"
          value={formData.middle_name}
          placeholder="e.g. Mohammed"
          icon={User}
          optionalBadge
          error={fieldErrors.middle_name}
          onChange={(val) => onChange("middle_name", val)}
        />

        <RegisterTextInput
          label={t("lastName")}
          name="last_name"
          value={formData.last_name}
          placeholder="e.g. Hassan"
          icon={User}
          required
          className="md:col-span-2"
          error={fieldErrors.last_name}
          onChange={(val) => onChange("last_name", val)}
        />
      </div>
    </div>
  );
}
