"use client";

// External libraries
import { motion } from "framer-motion";
import { GraduationCap, Building, BookOpen, Globe } from "lucide-react";

// Internal — UI atoms, types
import { FormField, inputBase, inputReadOnly, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";
import type { EducationDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface EducationDetailsFormProps {
  data: EducationDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function EducationDetailsForm({ data, errors, onChange }: EducationDetailsFormProps) {
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange(key, e.target.value);

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
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-900">Educational Endorsement</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Official verification &amp; recommendation letter for students
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
              placeholder="Student Name"
              className={cn(inputReadOnly, borderFor(errors.full_name))}
              value={data.full_name}
              onChange={on("full_name")}
            />
          </FormField>

          <FormField
            label="Passport / National ID Number"
            name="passport_number"
            error={errors.passport_number}
            hint="Identification document number."
          >
            <input
              type="text"
              name="passport_number"
              placeholder="e.g. A12345678"
              className={field("passport_number")}
              value={data.passport_number}
              onChange={on("passport_number")}
            />
          </FormField>

          <FormField
            label="Institution Name"
            name="institution_name"
            error={errors.institution_name}
            required
          >
            <input
              type="text"
              name="institution_name"
              placeholder="e.g. Islamic University of Madinah / Al-Azhar"
              className={field("institution_name")}
              value={data.institution_name}
              onChange={on("institution_name")}
            />
          </FormField>

          <FormField
            label="Course / Degree Program"
            name="course_of_study"
            error={errors.course_of_study}
          >
            <input
              type="text"
              name="course_of_study"
              placeholder="e.g. Bachelor of Islamic Sharia / Computer Science"
              className={field("course_of_study")}
              value={data.course_of_study}
              onChange={on("course_of_study")}
            />
          </FormField>

          <FormField
            label="Destination Country"
            name="country"
            error={errors.country}
            colSpan
          >
            <input
              type="text"
              name="country"
              placeholder="e.g. Kingdom of Saudi Arabia, Egypt, Turkey"
              className={field("country")}
              value={data.country}
              onChange={on("country")}
            />
          </FormField>

          <FormField
            label="Scholarship or Sponsorship Details"
            name="scholarship_details"
            hint="Describe any scholarship grants or sponsoring foundations (optional)."
            colSpan
          >
            <textarea
              name="scholarship_details"
              rows={3}
              placeholder="State whether fully funded or self-sponsored, scholarship ref no., etc."
              className={cn(inputBase, "border-slate-200/90")}
              value={data.scholarship_details}
              onChange={on("scholarship_details")}
            />
          </FormField>
        </div>
      </div>
    </motion.div>
  );
}
