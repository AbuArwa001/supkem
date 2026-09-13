"use client";

import { motion } from "framer-motion";
import { Briefcase, Building, UserCheck } from "lucide-react";
import { FormField, inputBase, inputReadOnly, borderFor } from "./ui/FormField";
import { cn } from "@/lib/utils";
import type { EmploymentDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface Props {
  data: EmploymentDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function EmploymentDetailsForm({ data, errors, onChange }: Props) {
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(key, e.target.value);
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-8">
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
            <Briefcase size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-900">Employment Referral</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Applicant credential endorsement and referral particulars
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Full Name"
            name="full_name"
            error={errors.full_name}
            required
            hint="Prefilled from your authenticated user profile."
          >
            <input
              type="text"
              name="full_name"
              readOnly
              className={cn(inputReadOnly, borderFor(errors.full_name))}
              value={data.full_name}
              onChange={on("full_name")}
            />
          </FormField>

          <FormField
            label="National ID / Passport Number"
            name="id_number"
            error={errors.id_number}
            required
          >
            <input
              type="text"
              name="id_number"
              placeholder="e.g. 12345678 or A12345678"
              className={field("id_number")}
              value={data.id_number}
              onChange={on("id_number")}
            />
          </FormField>

          <FormField
            label="Position Applied For"
            name="position_applied_for"
            error={errors.position_applied_for}
          >
            <input
              type="text"
              name="position_applied_for"
              placeholder="e.g. Arabic Teacher / Imam / Administrator"
              className={field("position_applied_for")}
              value={data.position_applied_for}
              onChange={on("position_applied_for")}
            />
          </FormField>

          <FormField
            label="Prospective Employer / Organization"
            name="employer_name"
            error={errors.employer_name}
          >
            <input
              type="text"
              name="employer_name"
              placeholder="e.g. Al-Furqan Academy"
              className={field("employer_name")}
              value={data.employer_name}
              onChange={on("employer_name")}
            />
          </FormField>
        </div>
      </div>
    </motion.div>
  );
}
