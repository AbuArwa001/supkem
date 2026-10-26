"use client";

import { Lock } from "lucide-react";
import { RegisterFormData, FieldErrors } from "./types";
import { PasswordField } from "./PasswordField";
import { ConfirmPasswordField } from "./ConfirmPasswordField";

interface RegisterSecurityFieldsProps {
  formData: RegisterFormData;
  fieldErrors: FieldErrors;
  onChange: (field: keyof RegisterFormData, value: string) => void;
}

export function RegisterSecurityFields({
  formData,
  fieldErrors,
  onChange,
}: RegisterSecurityFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
        <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
          <Lock size={18} />
        </div>
        <div>
          <h3 className="text-base font-black font-outfit text-slate-800 uppercase tracking-wider">
            3. Account Security
          </h3>
          <p className="text-xs text-slate-400 font-medium">Create a strong password to protect your account</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <PasswordField
          value={formData.password}
          error={fieldErrors.password}
          onChange={(val) => onChange("password", val)}
        />
        <ConfirmPasswordField
          value={formData.confirm_password || ""}
          passwordValue={formData.password}
          error={fieldErrors.confirm_password}
          onChange={(val) => onChange("confirm_password", val)}
        />
      </div>
    </div>
  );
}
