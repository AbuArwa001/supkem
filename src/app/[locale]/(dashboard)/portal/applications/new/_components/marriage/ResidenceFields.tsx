"use client";

import { MapPin, ChevronDown } from "lucide-react";
import { FormField, inputBase, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { KENYA_COUNTIES } from "@/app/[locale]/(dashboard)/portal/applications/new/_data/counties";
import { cn } from "@/lib/utils";

interface ResidenceFieldsProps {
  countyName: string;
  subCountyName: string;
  countyValue: string;
  subCountyValue: string;
  countyError?: string;
  subCountyError?: string;
  onChange: (field: string, value: string) => void;
}

export function ResidenceFields({
  countyName,
  subCountyName,
  countyValue,
  subCountyValue,
  countyError,
  subCountyError,
  onChange,
}: ResidenceFieldsProps) {
  const getFieldStyle = (val?: string, err?: string) =>
    cn(inputBase, borderFor(err), val && !err ? "border-emerald-500/40 bg-emerald-50/10 focus:border-emerald-600 focus:ring-emerald-500/10" : "");

  return (
    <>
      <FormField label="County of Residence" name={countyName} error={countyError} required>
        <div className="relative">
          <select
            name={countyName}
            className={cn(getFieldStyle(countyValue, countyError), "pl-11 pr-10 appearance-none cursor-pointer")}
            value={countyValue}
            onChange={(e) => onChange(countyName, e.target.value)}
          >
            <option value="">Select Kenyan County...</option>
            {KENYA_COUNTIES.map((county) => (
              <option key={county} value={county}>
                {county} County
              </option>
            ))}
            <option value="Outside Kenya">Outside Kenya (Diaspora / Foreign)</option>
          </select>
          <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </FormField>

      <FormField label="Sub-County / Area / Estate" name={subCountyName} error={subCountyError} required>
        <div className="relative">
          <input
            type="text"
            name={subCountyName}
            placeholder="e.g. Westlands / Kamukunji / Nyali / Garissa Central"
            className={cn(getFieldStyle(subCountyValue, subCountyError), "pl-11")}
            value={subCountyValue}
            onChange={(e) => onChange(subCountyName, e.target.value)}
          />
          <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </FormField>
    </>
  );
}
