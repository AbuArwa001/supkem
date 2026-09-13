"use client";

// External libraries
import { Users, Calendar, MapPin } from "lucide-react";

// Internal — UI atoms, types
import { FormField, inputBase, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface EventWitnessesProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function EventWitnesses({ data, errors, onChange }: EventWitnessesProps) {
  const field = (name: string) => cn(inputBase, borderFor(errors[name]));
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    onChange(key, e.target.value);

  return (
    <div className="p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-8">
      <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center border border-slate-200/80 shadow-xs">
          <Users size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-900">Event &amp; Witnesses</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            Solemnization Place, Date, and Two Muslim Witnesses
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Place of Marriage (Mosque / Location)"
          name="place_of_marriage"
          error={errors.place_of_marriage}
          required
        >
          <input
            type="text"
            name="place_of_marriage"
            placeholder="e.g. Jamia Mosque Nairobi / Family Residence"
            className={field("place_of_marriage")}
            value={data.place_of_marriage}
            onChange={on("place_of_marriage")}
          />
        </FormField>

        <FormField
          label="Date of Marriage (Solemnization Date)"
          name="date_of_marriage"
          error={errors.date_of_marriage}
          required
        >
          <input
            type="date"
            name="date_of_marriage"
            className={field("date_of_marriage")}
            value={data.date_of_marriage}
            onChange={on("date_of_marriage")}
          />
        </FormField>

        <FormField
          label="First Witness Full Name"
          name="witness_1_name"
          error={errors.witness_1_name}
          required
        >
          <input
            type="text"
            name="witness_1_name"
            placeholder="e.g. Yusuf Abdi Ahmed"
            className={field("witness_1_name")}
            value={data.witness_1_name}
            onChange={on("witness_1_name")}
          />
        </FormField>

        <FormField
          label="First Witness ID / Passport No."
          name="witness_1_id"
          error={errors.witness_1_id}
          required
        >
          <input
            type="text"
            name="witness_1_id"
            placeholder="e.g. 23456789"
            className={field("witness_1_id")}
            value={data.witness_1_id}
            onChange={on("witness_1_id")}
          />
        </FormField>

        <FormField
          label="Second Witness Full Name"
          name="witness_2_name"
          error={errors.witness_2_name}
          required
        >
          <input
            type="text"
            name="witness_2_name"
            placeholder="e.g. Bilal Mohamed Kassim"
            className={field("witness_2_name")}
            value={data.witness_2_name}
            onChange={on("witness_2_name")}
          />
        </FormField>

        <FormField
          label="Second Witness ID / Passport No."
          name="witness_2_id"
          error={errors.witness_2_id}
          required
        >
          <input
            type="text"
            name="witness_2_id"
            placeholder="e.g. 34567890"
            className={field("witness_2_id")}
            value={data.witness_2_id}
            onChange={on("witness_2_id")}
          />
        </FormField>
      </div>
    </div>
  );
}
