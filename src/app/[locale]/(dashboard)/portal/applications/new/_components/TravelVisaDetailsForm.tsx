import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { FormField, inputBase, inputReadOnly, borderFor } from "./ui/FormField";
import { cn } from "@/lib/utils";
import type { TravelVisaDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface Props {
  data: TravelVisaDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function TravelVisaDetailsForm({ data, errors, onChange }: Props) {
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(key, e.target.value);
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
      <div className="space-y-8">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10"><Plane size={24} /></div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-800">Travel & Visa Verification</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Applicant Information</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Full Name" error={errors.full_name} hint="Update your profile to change your name.">
            <input type="text" readOnly className={cn(inputReadOnly, borderFor(errors.full_name))} value={data.full_name} onChange={on("full_name")} />
          </FormField>
          <FormField label="Passport Number" error={errors.passport_number}>
            <input type="text" placeholder="Passport No." className={field("passport_number")} value={data.passport_number} onChange={on("passport_number")} />
          </FormField>
          <FormField label="Destination Country" error={errors.destination_country}>
            <input type="text" placeholder="Destination" className={field("destination_country")} value={data.destination_country} onChange={on("destination_country")} />
          </FormField>
          <FormField label="Purpose of Trip">
            <select className={field("trip_purpose")} value={data.trip_purpose} onChange={on("trip_purpose")}>
              <option>Religious</option><option>Tourism</option><option>Business</option><option>Family Visit</option><option>Other</option>
            </select>
          </FormField>
          <FormField label="Expected Travel Date" error={errors.expected_travel_date}>
            <input type="date" className={field("expected_travel_date")} value={data.expected_travel_date} onChange={on("expected_travel_date")} />
          </FormField>
        </div>
      </div>
    </motion.div>
  );
}
