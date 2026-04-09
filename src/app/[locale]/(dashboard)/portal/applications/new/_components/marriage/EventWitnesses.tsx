// External libraries
import { Users } from "lucide-react";

// Internal — UI atoms, types
import { FormField, inputBase, borderFor } from "@/app/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/(dashboard)/portal/applications/new/_types";

interface EventWitnessesProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function EventWitnesses({ data, errors, onChange }: EventWitnessesProps) {
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => onChange(key, e.target.value);

  return (
    <div className="space-y-8 pt-8 border-t border-slate-100">
      <div className="flex items-center gap-4 group">
        <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-100">
          <Users size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-800">Event &amp; Witnesses</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Marriage Event Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField label="Place of Marriage" error={errors.place_of_marriage}>
          <input type="text" placeholder="Place" className={field("place_of_marriage")} value={data.place_of_marriage} onChange={on("place_of_marriage")} />
        </FormField>
        <FormField label="Date of Marriage" error={errors.date_of_marriage}>
          <input type="date" className={field("date_of_marriage")} value={data.date_of_marriage} onChange={on("date_of_marriage")} />
        </FormField>
        <FormField label="Witness 1 Name" error={errors.witness_1_name}>
          <input type="text" placeholder="Name" className={field("witness_1_name")} value={data.witness_1_name} onChange={on("witness_1_name")} />
        </FormField>
        <FormField label="Witness 1 ID/Passport" error={errors.witness_1_id}>
          <input type="text" placeholder="ID / Passport" className={field("witness_1_id")} value={data.witness_1_id} onChange={on("witness_1_id")} />
        </FormField>
        <FormField label="Witness 2 Name" error={errors.witness_2_name}>
          <input type="text" placeholder="Name" className={field("witness_2_name")} value={data.witness_2_name} onChange={on("witness_2_name")} />
        </FormField>
        <FormField label="Witness 2 ID/Passport" error={errors.witness_2_id}>
          <input type="text" placeholder="ID / Passport" className={field("witness_2_id")} value={data.witness_2_id} onChange={on("witness_2_id")} />
        </FormField>
      </div>
    </div>
  );
}
