"use client";

// External libraries
import { Heart, ChevronDown } from "lucide-react";

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
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange(key, e.target.value);

  return (
    <div className="p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-8">
      <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100/80 shadow-xs">
          <Heart size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-900">Wife&apos;s Particulars</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            Personal &amp; Legal Details of the Bride
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Legal Name"
          name="wife_name"
          error={errors.wife_name}
          required
        >
          <input
            type="text"
            name="wife_name"
            placeholder="Bride's Full Name (as per ID)"
            className={field("wife_name")}
            value={data.wife_name}
            onChange={on("wife_name")}
          />
        </FormField>

        <FormField
          label="National ID / Passport Number"
          name="wife_id_passport"
          error={errors.wife_id_passport}
          required
        >
          <input
            type="text"
            name="wife_id_passport"
            placeholder="e.g. 12345678 or A12345678"
            className={field("wife_id_passport")}
            value={data.wife_id_passport}
            onChange={on("wife_id_passport")}
          />
        </FormField>

        <FormField
          label="Age in Years"
          name="wife_age"
          error={errors.wife_age}
          required
        >
          <input
            type="number"
            min="18"
            name="wife_age"
            placeholder="Age (minimum 18)"
            className={field("wife_age")}
            value={data.wife_age}
            onChange={on("wife_age")}
          />
        </FormField>

        <FormField label="Marital Status" name="wife_marital_status" required>
          <div className="relative">
            <select
              name="wife_marital_status"
              className={cn(field("wife_marital_status"), "appearance-none pr-10 cursor-pointer")}
              value={data.wife_marital_status}
              onChange={on("wife_marital_status")}
            >
              <option value="Virgin">Virgin</option>
              <option value="Divorced">Divorced</option>
              <option value="Widow">Widow</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </FormField>

        <FormField
          label="Occupation / Profession"
          name="wife_occupation"
          error={errors.wife_occupation}
          required
          colSpan
        >
          <input
            type="text"
            name="wife_occupation"
            placeholder="e.g. Teacher / Healthcare Specialist / Business Owner"
            className={field("wife_occupation")}
            value={data.wife_occupation}
            onChange={on("wife_occupation")}
          />
        </FormField>

        <FormField
          label="County of Residence"
          name="wife_residence_county"
          error={errors.wife_residence_county}
        >
          <input
            type="text"
            name="wife_residence_county"
            placeholder="e.g. Nairobi / Mombasa"
            className={field("wife_residence_county")}
            value={data.wife_residence_county}
            onChange={on("wife_residence_county")}
          />
        </FormField>

        <FormField
          label="Sub-County / Area"
          name="wife_residence_sub_county"
          error={errors.wife_residence_sub_county}
        >
          <input
            type="text"
            name="wife_residence_sub_county"
            placeholder="e.g. Westlands / Mvita"
            className={field("wife_residence_sub_county")}
            value={data.wife_residence_sub_county}
            onChange={on("wife_residence_sub_county")}
          />
        </FormField>
      </div>
    </div>
  );
}
