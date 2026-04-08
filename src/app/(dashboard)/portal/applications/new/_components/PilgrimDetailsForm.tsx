import { motion } from "framer-motion";
import { User } from "lucide-react";
import { FormField, inputBase, inputReadOnly, borderFor } from "./ui/FormField";
import { cn } from "@/lib/utils";
import type { PilgrimDetails } from "@/app/(dashboard)/portal/applications/new/_types";

interface Props {
  data: PilgrimDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string | boolean) => void;
}

export function PilgrimDetailsForm({ data, errors, onChange }: Props) {
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(key, e.target.value);
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
      <div className="space-y-8">
        <div className="flex items-center gap-4 group">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center border border-primary/10"><User size={24} /></div>
          <div>
            <h3 className="text-2xl font-black font-outfit text-slate-800">Pilgrim Particulars</h3>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Personal Details for Hajj/Umrah</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField label="Full Name" error={errors.full_name} hint="Update your profile to change your name.">
            <input type="text" readOnly className={cn(inputReadOnly, borderFor(errors.full_name))} value={data.full_name} onChange={on("full_name")} />
          </FormField>
          <FormField label="Passport/ID Number" error={errors.passport_number}>
            <input type="text" placeholder="Passport No." className={field("passport_number")} value={data.passport_number} onChange={on("passport_number")} />
          </FormField>
          <FormField label="Nationality" error={errors.nationality}><input type="text" placeholder="Kenyan" className={field("nationality")} value={data.nationality} onChange={on("nationality")} /></FormField>
          <FormField label="Date of Birth" error={errors.date_of_birth}><input type="date" className={field("date_of_birth")} value={data.date_of_birth} onChange={on("date_of_birth")} /></FormField>
          <FormField label="Gender">
            <select className={field("gender")} value={data.gender} onChange={on("gender")}><option>Male</option><option>Female</option></select>
          </FormField>
          <FormField label="Trip Type">
            <select className={field("trip_type")} value={data.trip_type} onChange={on("trip_type")}><option>Hajj</option><option>Umrah</option></select>
          </FormField>
          <FormField label="Expected Travel Date" error={errors.expected_travel_date}><input type="date" className={field("expected_travel_date")} value={data.expected_travel_date} onChange={on("expected_travel_date")} /></FormField>
          <FormField label="Travel Agent Name"><input type="text" placeholder="Name" className={field("travel_agent_name")} value={data.travel_agent_name} onChange={on("travel_agent_name")} /></FormField>
          <label className="flex items-center gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer md:col-span-2 group hover:bg-white hover:border-primary transition-all">
            <input type="checkbox" className="w-6 h-6 rounded-lg text-primary focus:ring-primary border-slate-200" checked={data.guidance_requested} onChange={(e) => onChange("guidance_requested", e.target.checked)} />
            <span className="font-bold text-slate-600 group-hover:text-primary transition-colors">I request educational and logistical guidance for this pilgrimage.</span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}
