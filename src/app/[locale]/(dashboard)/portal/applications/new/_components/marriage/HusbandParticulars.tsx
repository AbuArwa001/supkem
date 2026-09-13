"use client";

// External libraries
import { User, ChevronDown } from "lucide-react";

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
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange(key, e.target.value);

  return (
    <div className="p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-8">
      <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100/80 shadow-xs">
          <User size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-900">Husband&apos;s Particulars</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            Personal &amp; Legal Details of the Groom
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Full Legal Name"
          name="husband_name"
          error={errors.husband_name}
          required
        >
          <input
            type="text"
            name="husband_name"
            placeholder="Groom's Full Name (as per ID)"
            className={field("husband_name")}
            value={data.husband_name}
            onChange={on("husband_name")}
          />
        </FormField>

        <FormField
          label="National ID / Passport Number"
          name="husband_id_passport"
          error={errors.husband_id_passport}
          required
        >
          <input
            type="text"
            name="husband_id_passport"
            placeholder="e.g. 12345678 or A12345678"
            className={field("husband_id_passport")}
            value={data.husband_id_passport}
            onChange={on("husband_id_passport")}
          />
        </FormField>

        <FormField
          label="Age in Years"
          name="husband_age"
          error={errors.husband_age}
          required
        >
          <input
            type="number"
            min="18"
            name="husband_age"
            placeholder="Age (minimum 18)"
            className={field("husband_age")}
            value={data.husband_age}
            onChange={on("husband_age")}
          />
        </FormField>

        <FormField label="Marital Status" name="husband_marital_status" required>
          <div className="relative">
            <select
              name="husband_marital_status"
              className={cn(field("husband_marital_status"), "appearance-none pr-10 cursor-pointer")}
              value={data.husband_marital_status}
              onChange={on("husband_marital_status")}
            >
              <option value="First Marriage">First Marriage</option>
              <option value="Divorced">Divorced</option>
              <option value="Widower">Widower</option>
              <option value="Polygamous">Polygamous</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </FormField>

        <FormField
          label="Occupation / Profession"
          name="husband_occupation"
          error={errors.husband_occupation}
          required
          colSpan
        >
          <input
            type="text"
            name="husband_occupation"
            placeholder="e.g. Civil Engineer / Accountant / Merchant"
            className={field("husband_occupation")}
            value={data.husband_occupation}
            onChange={on("husband_occupation")}
          />
        </FormField>

        <FormField
          label="County of Residence"
          name="husband_residence_county"
          error={errors.husband_residence_county}
          required
        >
          <input
            type="text"
            name="husband_residence_county"
            placeholder="e.g. Nairobi / Mombasa / Garissa"
            className={field("husband_residence_county")}
            value={data.husband_residence_county}
            onChange={on("husband_residence_county")}
          />
        </FormField>

        <FormField
          label="Sub-County / Area"
          name="husband_residence_sub_county"
          error={errors.husband_residence_sub_county}
          required
        >
          <input
            type="text"
            name="husband_residence_sub_county"
            placeholder="e.g. Westlands / Kamukunji / Nyali"
            className={field("husband_residence_sub_county")}
            value={data.husband_residence_sub_county}
            onChange={on("husband_residence_sub_county")}
          />
        </FormField>
      </div>
    </div>
  );
}
