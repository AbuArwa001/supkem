// External libraries
import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

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
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(key, e.target.value);

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
      <div className="space-y-8">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10">
            <GraduationCap size={24} />
          </div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-800">Educational Endorsement</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Student Information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Full Name" error={errors.full_name} hint="To change your name, update your profile.">
            <input type="text" readOnly placeholder="Student Name" className={cn(inputReadOnly, borderFor(errors.full_name))} value={data.full_name} onChange={on("full_name")} />
          </FormField>
          <FormField label="Passport Number" error={errors.passport_number}>
            <input type="text" placeholder="Passport No." className={field("passport_number")} value={data.passport_number} onChange={on("passport_number")} />
          </FormField>
          <FormField label="Institution Name" error={errors.institution_name}>
            <input type="text" placeholder="University / College Name" className={field("institution_name")} value={data.institution_name} onChange={on("institution_name")} />
          </FormField>
          <FormField label="Course of Study" error={errors.course_of_study}>
            <input type="text" placeholder="Course" className={field("course_of_study")} value={data.course_of_study} onChange={on("course_of_study")} />
          </FormField>
          <FormField label="Country" error={errors.country}>
            <input type="text" placeholder="Destination Country" className={field("country")} value={data.country} onChange={on("country")} />
          </FormField>
          <FormField label="Scholarship Details (Optional)" colSpan>
            <textarea rows={2} placeholder="Mention details..." className={cn(inputBase, "border-slate-200")} value={data.scholarship_details} onChange={on("scholarship_details")} />
          </FormField>
        </div>
      </div>
    </motion.div>
  );
}
