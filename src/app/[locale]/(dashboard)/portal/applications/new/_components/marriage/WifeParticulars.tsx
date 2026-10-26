"use client";

import { Heart, ChevronDown, CreditCard, Calendar, Briefcase } from "lucide-react";
import { FormField, inputBase, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";
import { ParticularsHeader } from "./ParticularsHeader";
import { ResidenceFields } from "./ResidenceFields";

interface WifeParticularsProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function WifeParticulars({ data, errors, onChange }: WifeParticularsProps) {
  const field = (name: string) =>
    cn(inputBase, borderFor(errors[name]), data[name as keyof MarriageDetails] && !errors[name] ? "border-emerald-500/40 bg-emerald-50/10 focus:border-emerald-600 focus:ring-emerald-500/10" : "");

  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(key, e.target.value);

  return (
    <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
      <ParticularsHeader
        title="Wife's Particulars" badge="Bride" badgeColor="rose" Icon={Heart}
        subtitle="Personal, Legal & Residency Details of the Bride"
        name={data.wife_name} idPassport={data.wife_id_passport}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Full Legal Name" name="wife_name" error={errors.wife_name} required>
          <div className="relative">
            <input type="text" name="wife_name" placeholder="Bride's full name (as per ID/Passport)" className={cn(field("wife_name"), "pl-11")} value={data.wife_name} onChange={on("wife_name")} />
            <Heart size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="National ID / Passport Number" name="wife_id_passport" error={errors.wife_id_passport} required>
          <div className="relative">
            <input type="text" name="wife_id_passport" placeholder="e.g. 12345678 or A12345678" className={cn(field("wife_id_passport"), "pl-11 font-mono uppercase")} value={data.wife_id_passport} onChange={on("wife_id_passport")} />
            <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Age in Years" name="wife_age" error={errors.wife_age} required>
          <div className="relative">
            <input type="number" min="18" name="wife_age" placeholder="Age (minimum 18 years)" className={cn(field("wife_age"), "pl-11")} value={data.wife_age} onChange={on("wife_age")} />
            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Marital Status" name="wife_marital_status" required>
          <div className="relative">
            <select name="wife_marital_status" className={cn(field("wife_marital_status"), "appearance-none pr-10 cursor-pointer")} value={data.wife_marital_status || "Virgin"} onChange={on("wife_marital_status")}>
              <option value="Virgin">Virgin (Never Married Before)</option>
              <option value="Divorced">Divorced (Thayyib)</option>
              <option value="Widow">Widow (Thayyib)</option>
            </select>
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Occupation / Profession" name="wife_occupation" error={errors.wife_occupation} required colSpan>
          <div className="relative">
            <input type="text" name="wife_occupation" placeholder="e.g. Teacher / Healthcare Specialist / Business Owner / Student" className={cn(field("wife_occupation"), "pl-11")} value={data.wife_occupation} onChange={on("wife_occupation")} />
            <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <ResidenceFields
          countyName="wife_residence_county" subCountyName="wife_residence_sub_county"
          countyValue={data.wife_residence_county} subCountyValue={data.wife_residence_sub_county}
          countyError={errors.wife_residence_county} subCountyError={errors.wife_residence_sub_county}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
