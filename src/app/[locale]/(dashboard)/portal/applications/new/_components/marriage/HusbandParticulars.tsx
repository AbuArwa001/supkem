// External libraries
import { User } from "lucide-react";

// Internal — UI atoms, types
import { FormField, inputBase, inputNormal, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface HusbandParticularsProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function HusbandParticulars({ data, errors, onChange }: HusbandParticularsProps) {
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(key, e.target.value);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 group-hover:scale-110 transition-transform">
          <User size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-800">Husband&apos;s Particulars</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Details of the Groom</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name" error={errors.husband_name}>
          <input type="text" placeholder="Full Name" className={field("husband_name")} value={data.husband_name} onChange={on("husband_name")} />
        </FormField>
        <FormField label="ID / Passport No." error={errors.husband_id_passport}>
          <input type="text" placeholder="ID / Passport" className={field("husband_id_passport")} value={data.husband_id_passport} onChange={on("husband_id_passport")} />
        </FormField>
        <FormField label="Age" error={errors.husband_age}>
          <input type="text" placeholder="Age" className={field("husband_age")} value={data.husband_age} onChange={on("husband_age")} />
        </FormField>
        <FormField label="Marital Status">
          <select className={cn(inputBase, inputNormal)} value={data.husband_marital_status} onChange={on("husband_marital_status")}>
            <option>First Marriage</option>
            <option>Divorced</option>
            <option>Widower</option>
            <option>Polygamous</option>
          </select>
        </FormField>
        <FormField label="Occupation" error={errors.husband_occupation} colSpan>
          <input type="text" placeholder="Occupation" className={field("husband_occupation")} value={data.husband_occupation} onChange={on("husband_occupation")} />
        </FormField>
        <FormField label="Residence (County)" error={errors.husband_residence_county}>
          <input type="text" placeholder="County" className={field("husband_residence_county")} value={data.husband_residence_county} onChange={on("husband_residence_county")} />
        </FormField>
        <FormField label="Residence (Sub-County)" error={errors.husband_residence_sub_county}>
          <input type="text" placeholder="Sub-County" className={field("husband_residence_sub_county")} value={data.husband_residence_sub_county} onChange={on("husband_residence_sub_county")} />
        </FormField>
      </div>
    </div>
  );
}
