// External libraries
import { Heart } from "lucide-react";

// Internal — UI atoms, types
import { FormField, inputBase, inputNormal, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface WifeParticularsProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function WifeParticulars({ data, errors, onChange }: WifeParticularsProps) {
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(key, e.target.value);

  return (
    <div className="space-y-8 pt-8 border-t border-slate-100">
      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 group-hover:scale-110 transition-transform">
          <Heart size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-800">Wife&apos;s Particulars</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Details of the Bride</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Full Name" error={errors.wife_name}>
          <input type="text" placeholder="Full Name" className={field("wife_name")} value={data.wife_name} onChange={on("wife_name")} />
        </FormField>
        <FormField label="ID / Passport No." error={errors.wife_id_passport}>
          <input type="text" placeholder="ID / Passport" className={field("wife_id_passport")} value={data.wife_id_passport} onChange={on("wife_id_passport")} />
        </FormField>
        <FormField label="Age" error={errors.wife_age}>
          <input type="text" placeholder="Age" className={field("wife_age")} value={data.wife_age} onChange={on("wife_age")} />
        </FormField>
        <FormField label="Marital Status">
          <select className={cn(inputBase, inputNormal)} value={data.wife_marital_status} onChange={on("wife_marital_status")}>
            <option>Virgin</option>
            <option>Divorced</option>
            <option>Widow</option>
          </select>
        </FormField>
        <FormField label="Occupation" error={errors.wife_occupation} colSpan>
          <input type="text" placeholder="Occupation" className={field("wife_occupation")} value={data.wife_occupation} onChange={on("wife_occupation")} />
        </FormField>
        <FormField label="Residence (County)" error={errors.wife_residence_county}>
          <input type="text" placeholder="County" className={field("wife_residence_county")} value={data.wife_residence_county} onChange={on("wife_residence_county")} />
        </FormField>
        <FormField label="Residence (Sub-County)" error={errors.wife_residence_sub_county}>
          <input type="text" placeholder="Sub-County" className={field("wife_residence_sub_county")} value={data.wife_residence_sub_county} onChange={on("wife_residence_sub_county")} />
        </FormField>
      </div>
    </div>
  );
}
