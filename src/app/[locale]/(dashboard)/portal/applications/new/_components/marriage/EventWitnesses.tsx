"use client";

import { Users, Calendar, MapPin, Building2, ChevronDown, CheckCircle2 } from "lucide-react";
import { FormField, inputBase, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { KENYA_COUNTIES } from "@/app/[locale]/(dashboard)/portal/applications/new/_data/counties";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";
import { WitnessCard } from "./WitnessCard";

interface EventWitnessesProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function EventWitnesses({ data, errors, onChange }: EventWitnessesProps) {
  const field = (name: string) =>
    cn(inputBase, borderFor(errors[name]), data[name as keyof MarriageDetails] && !errors[name] ? "border-emerald-500/40 bg-emerald-50/10 focus:border-emerald-600 focus:ring-emerald-500/10" : "");

  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => onChange(key, e.target.value);

  return (
    <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100/80 shadow-xs shrink-0">
            <Users size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black font-outfit text-slate-900">Venue &amp; Solemnization Witnesses</h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800">Witnesses</span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Solemnization Location, Date &amp; Two Muslim Witnesses (Shuhood)</p>
          </div>
        </div>
        {data.place_of_marriage && data.date_of_marriage && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold self-start sm:self-auto">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span className="truncate max-w-[180px]">{data.place_of_marriage}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <FormField label="Place of Marriage (Mosque / Location)" name="place_of_marriage" error={errors.place_of_marriage} required>
          <div className="relative">
            <input type="text" name="place_of_marriage" placeholder="e.g. Jamia Mosque Nairobi" className={cn(field("place_of_marriage"), "pl-11")} value={data.place_of_marriage} onChange={on("place_of_marriage")} />
            <Building2 size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Solemnization Date" name="date_of_marriage" error={errors.date_of_marriage} required>
          <div className="relative">
            <input type="date" name="date_of_marriage" className={cn(field("date_of_marriage"), "pl-11")} value={data.date_of_marriage} onChange={on("date_of_marriage")} />
            <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="County of Solemnization" name="county_of_marriage" error={errors.county_of_marriage} required>
          <div className="relative">
            <select name="county_of_marriage" className={cn(field("county_of_marriage"), "pl-11 pr-10 appearance-none cursor-pointer")} value={data.county_of_marriage} onChange={on("county_of_marriage")}>
              <option value="">Select County...</option>
              {KENYA_COUNTIES.map((c) => (<option key={c} value={c}>{c} County</option>))}
            </select>
            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>
      </div>

      <div className="space-y-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700">Sharia Witnesses (Two Adult Muslim Males)</span>
          <div className="h-px flex-1 bg-slate-100" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <WitnessCard
            number={1} title="First Muslim Witness" nameField="witness_1_name" idField="witness_1_id"
            nameValue={data.witness_1_name} idValue={data.witness_1_id} nameError={errors.witness_1_name}
            idError={errors.witness_1_id} placeholderName="e.g. Yusuf Abdi Ahmed" onChange={onChange}
          />
          <WitnessCard
            number={2} title="Second Muslim Witness" nameField="witness_2_name" idField="witness_2_id"
            nameValue={data.witness_2_name} idValue={data.witness_2_id} nameError={errors.witness_2_name}
            idError={errors.witness_2_id} placeholderName="e.g. Bilal Mohamed Kassim" onChange={onChange}
          />
        </div>
      </div>
    </div>
  );
}
