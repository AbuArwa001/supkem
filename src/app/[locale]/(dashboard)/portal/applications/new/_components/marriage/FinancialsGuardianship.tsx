// External libraries
import { Gift } from "lucide-react";

// Internal — UI atoms, types
import { FormField, inputBase, inputNormal, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface FinancialsGuardianshipProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function FinancialsGuardianship({ data, errors, onChange }: FinancialsGuardianshipProps) {
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(key, e.target.value);

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
          <Gift size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-800">Financials &amp; Guardianship</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Waliyy and Mahr Information</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Waliyy Name" error={errors.wife_waliyy_name}>
          <input type="text" placeholder="Waliyy Name" className={field("wife_waliyy_name")} value={data.wife_waliyy_name} onChange={on("wife_waliyy_name")} />
        </FormField>
        <FormField label="Relationship to Wife" error={errors.wife_waliyy_relationship}>
          <input type="text" placeholder="Relationship" className={field("wife_waliyy_relationship")} value={data.wife_waliyy_relationship} onChange={on("wife_waliyy_relationship")} />
        </FormField>
        <FormField label="Agreed Mahr" error={errors.agreed_mahr}>
          <input type="text" placeholder="Value of Mahr" className={field("agreed_mahr")} value={data.agreed_mahr} onChange={on("agreed_mahr")} />
        </FormField>
        <FormField label="Paid / Deferred Status" error={errors.paid_mahr_and_deferred}>
          <input type="text" placeholder="Status" className={field("paid_mahr_and_deferred")} value={data.paid_mahr_and_deferred} onChange={on("paid_mahr_and_deferred")} />
        </FormField>
        <FormField label="Particulars of Gifts (if any)" colSpan>
          <textarea rows={2} placeholder="Gifts..." className={cn(inputBase, inputNormal)} value={data.particulars_of_gifts} onChange={on("particulars_of_gifts")} />
        </FormField>
      </div>
    </div>
  );
}
