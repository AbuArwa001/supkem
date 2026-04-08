import { motion } from "framer-motion";
import { Archive } from "lucide-react";
import { FormField, inputBase, inputReadOnly, borderFor } from "./ui/FormField";
import { cn } from "@/lib/utils";
import type { EmploymentDetails } from "@/app/(dashboard)/portal/applications/new/_types";

interface Props {
  data: EmploymentDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function EmploymentDetailsForm({ data, errors, onChange }: Props) {
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => onChange(key, e.target.value);
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
      <div className="space-y-8">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10"><Archive size={24} /></div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-800">Employment Referral</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Candidate Information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Full Name" error={errors.full_name} hint="Update your profile to change your name.">
            <input type="text" readOnly className={cn(inputReadOnly, borderFor(errors.full_name))} value={data.full_name} onChange={on("full_name")} />
          </FormField>
          <FormField label="ID / Passport Number" error={errors.id_number}>
            <input type="text" placeholder="ID No." className={field("id_number")} value={data.id_number} onChange={on("id_number")} />
          </FormField>
          <FormField label="Position Applied For" error={errors.position_applied_for}>
            <input type="text" placeholder="Job Position" className={field("position_applied_for")} value={data.position_applied_for} onChange={on("position_applied_for")} />
          </FormField>
          <FormField label="Prospective Employer" error={errors.employer_name}>
            <input type="text" placeholder="Employer Name" className={field("employer_name")} value={data.employer_name} onChange={on("employer_name")} />
          </FormField>
        </div>
      </div>
    </motion.div>
  );
}
