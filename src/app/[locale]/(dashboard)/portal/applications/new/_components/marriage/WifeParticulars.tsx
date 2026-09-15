"use client";

// External libraries
import { Heart, ChevronDown, CreditCard, Calendar, Briefcase, MapPin, CheckCircle2 } from "lucide-react";

// Internal — UI atoms, types, data
import { FormField, inputBase, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { KENYA_COUNTIES } from "@/app/[locale]/(dashboard)/portal/applications/new/_data/counties";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface WifeParticularsProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function WifeParticulars({ data, errors, onChange }: WifeParticularsProps) {
  const field = (name: string) =>
    cn(
      inputBase,
      borderFor(errors[name]),
      data[name as keyof MarriageDetails] && !errors[name]
        ? "border-emerald-500/40 bg-emerald-50/10 focus:border-emerald-600 focus:ring-emerald-500/10"
        : ""
    );

  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    onChange(key, e.target.value);

  return (
    <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
      {/* Card Header with Bride Badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100/80 shadow-xs shrink-0">
            <Heart size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black font-outfit text-slate-900">Wife&apos;s Particulars</h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100/80 text-rose-800">
                Bride
              </span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              Personal, Legal &amp; Residency Details of the Bride
            </p>
          </div>
        </div>

        {/* Live Completion Check */}
        {data.wife_name && data.wife_id_passport && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold self-start sm:self-auto">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span className="truncate max-w-[180px]">{data.wife_name}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Full Name */}
        <FormField
          label="Full Legal Name"
          name="wife_name"
          error={errors.wife_name}
          required
        >
          <div className="relative">
            <input
              type="text"
              name="wife_name"
              placeholder="Bride's full name (as per ID/Passport)"
              className={cn(field("wife_name"), "pl-11")}
              value={data.wife_name}
              onChange={on("wife_name")}
            />
            <Heart size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        {/* National ID / Passport */}
        <FormField
          label="National ID / Passport Number"
          name="wife_id_passport"
          error={errors.wife_id_passport}
          required
        >
          <div className="relative">
            <input
              type="text"
              name="wife_id_passport"
              placeholder="e.g. 12345678 or A12345678"
              className={cn(field("wife_id_passport"), "pl-11 font-mono uppercase")}
              value={data.wife_id_passport}
              onChange={on("wife_id_passport")}
            />
            <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        {/* Age in Years */}
        <FormField
          label="Age in Years"
          name="wife_age"
          error={errors.wife_age}
          required
        >
          <div className="relative">
            <input
              type="number"
              min="18"
              name="wife_age"
              placeholder="Age (minimum 18 years)"
              className={cn(field("wife_age"), "pl-11")}
              value={data.wife_age}
              onChange={on("wife_age")}
            />
            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        {/* Marital Status */}
        <FormField label="Marital Status" name="wife_marital_status" required>
          <div className="relative">
            <select
              name="wife_marital_status"
              className={cn(field("wife_marital_status"), "appearance-none pr-10 cursor-pointer")}
              value={data.wife_marital_status || "Virgin"}
              onChange={on("wife_marital_status")}
            >
              <option value="Virgin">Virgin (Never Married Before)</option>
              <option value="Divorced">Divorced (Thayyib)</option>
              <option value="Widow">Widow (Thayyib)</option>
            </select>
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </FormField>

        {/* Occupation */}
        <FormField
          label="Occupation / Profession"
          name="wife_occupation"
          error={errors.wife_occupation}
          required
          colSpan
        >
          <div className="relative">
            <input
              type="text"
              name="wife_occupation"
              placeholder="e.g. Teacher / Healthcare Specialist / Business Owner / Student"
              className={cn(field("wife_occupation"), "pl-11")}
              value={data.wife_occupation}
              onChange={on("wife_occupation")}
            />
            <Briefcase size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        {/* County of Residence Dropdown */}
        <FormField
          label="County of Residence"
          name="wife_residence_county"
          error={errors.wife_residence_county}
          required
        >
          <div className="relative">
            <select
              name="wife_residence_county"
              className={cn(field("wife_residence_county"), "pl-11 pr-10 appearance-none cursor-pointer")}
              value={data.wife_residence_county}
              onChange={on("wife_residence_county")}
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
            <ChevronDown
              size={18}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </FormField>

        {/* Sub-County / Area */}
        <FormField
          label="Sub-County / Area / Estate"
          name="wife_residence_sub_county"
          error={errors.wife_residence_sub_county}
          required
        >
          <div className="relative">
            <input
              type="text"
              name="wife_residence_sub_county"
              placeholder="e.g. Westlands / Mvita / Malindi / Kajiado North"
              className={cn(field("wife_residence_sub_county"), "pl-11")}
              value={data.wife_residence_sub_county}
              onChange={on("wife_residence_sub_county")}
            />
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>
      </div>
    </div>
  );
}
