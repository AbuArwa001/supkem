"use client";

import { User, ChevronDown, CreditCard, Calendar, Briefcase } from "lucide-react";
import { FormField, inputBase, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";
import { ParticularsHeader } from "./ParticularsHeader";
import { ResidenceFields } from "./ResidenceFields";

interface HusbandParticularsProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function HusbandParticulars({ data, errors, onChange }: HusbandParticularsProps) {
  const field = (name: string) =>
    cn(inputBase, borderFor(errors[name]), data[name as keyof MarriageDetails] && !errors[name] ? "border-emerald-500/40 bg-emerald-50/10 focus:border-emerald-600 focus:ring-emerald-500/10" : "");

  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(key, e.target.value);

  return (
    <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
      <ParticularsHeader
        title="Husband's Particulars" badge="Groom" badgeColor="blue" Icon={User}
        subtitle="Personal, Legal & Residency Details of the Groom"
        name={data.husband_name} idPassport={data.husband_id_passport}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Full Legal Name" name="husband_name" error={errors.husband_name} required>
          <div className="relative">
            <input type="text" name="husband_name" placeholder="Groom's full name (as per ID/Passport)" className={cn(field("husband_name"), "pl-11")} value={data.husband_name} onChange={on("husband_name")} />
            <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="National ID / Passport Number" name="husband_id_passport" error={errors.husband_id_passport} required>
          <div className="relative">
            <input type="text" name="husband_id_passport" placeholder="e.g. 12345678 or A12345678" className={cn(field("husband_id_passport"), "pl-11 font-mono uppercase")} value={data.husband_id_passport} onChange={on("husband_id_passport")} />
            <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Age in Years" name="husband_age" error={errors.husband_age} required>
          <div className="relative">
            <input type="number" min="18" name="husband_age" placeholder="Age (minimum 18 years)" className={cn(field("husband_age"), "pl-11")} value={data.husband_age} onChange={on("husband_age")} />
            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Marital Status" name="husband_marital_status" required>
          <div className="relative">
            <select name="husband_marital_status" className={cn(field("husband_marital_status"), "appearance-none pr-10 cursor-pointer")} value={data.husband_marital_status || "First Marriage"} onChange={on("husband_marital_status")}>
              <option value="First Marriage">First Marriage (Bachelor)</option>
              <option value="Divorced">Divorced</option>
              <option value="Widower">Widower</option>
              <option value="Polygamous">Polygamous (Existing Marriages)</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Occupation / Profession" name="husband_occupation" error={errors.husband_occupation} required colSpan>
          <div className="relative">
            <input type="text" name="husband_occupation" placeholder="e.g. Civil Engineer / Accountant / Merchant / Teacher" className={cn(field("husband_occupation"), "pl-11")} value={data.husband_occupation} onChange={on("husband_occupation")} />
            <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <ResidenceFields
          countyName="husband_residence_county" subCountyName="husband_residence_sub_county"
          countyValue={data.husband_residence_county} subCountyValue={data.husband_residence_sub_county}
          countyError={errors.husband_residence_county} subCountyError={errors.husband_residence_sub_county}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
