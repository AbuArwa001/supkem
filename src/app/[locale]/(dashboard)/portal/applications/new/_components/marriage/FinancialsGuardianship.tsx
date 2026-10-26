"use client";

import { Gift, ShieldCheck, CheckCircle2, Info } from "lucide-react";
import { FormField, inputBase, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";
import { MahrTermsFields } from "./MahrTermsFields";

interface FinancialsGuardianshipProps {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function FinancialsGuardianship({ data, errors, onChange }: FinancialsGuardianshipProps) {
  const field = (name: string) =>
    cn(inputBase, borderFor(errors[name]), data[name as keyof MarriageDetails] && !errors[name] ? "border-emerald-500/40 bg-emerald-50/10 focus:border-emerald-600 focus:ring-emerald-500/10" : "");

  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => onChange(key, e.target.value);

  return (
    <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/80 shadow-xs shrink-0">
            <Gift size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-black font-outfit text-slate-900">Financials &amp; Guardianship</h3>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100/80 text-amber-800">Mahr &amp; Waliyy</span>
            </div>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">Waliyy (Bride&apos;s Legal Guardian) and Mahr (Dowry) Terms</p>
          </div>
        </div>
        {data.wife_waliyy_name && data.agreed_mahr && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold self-start sm:self-auto">
            <CheckCircle2 size={14} className="text-emerald-600" />
            <span className="truncate max-w-[180px]">Mahr Specified</span>
          </div>
        )}
      </div>

      <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/70 flex items-start gap-3">
        <Info size={18} className="text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-900 leading-relaxed font-medium">
          <strong className="font-bold text-amber-950">Islamic Jurisprudence Note: </strong>
          The presence of a valid Waliyy (Father, Grandfather, Brother, or appointed Qadhi) and clear agreement on the Mahr (dowry) are mandatory pillars for the solemnization of an Islamic marriage.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <FormField label="Waliyy Full Legal Name" name="wife_waliyy_name" error={errors.wife_waliyy_name} required>
          <div className="relative">
            <input type="text" name="wife_waliyy_name" placeholder="e.g. Sheikh Omar Hassan (Father/Brother)" className={cn(field("wife_waliyy_name"), "pl-11")} value={data.wife_waliyy_name} onChange={on("wife_waliyy_name")} />
            <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <FormField label="Relationship to Bride" name="wife_waliyy_relationship" error={errors.wife_waliyy_relationship} required>
          <div className="relative">
            <input type="text" name="wife_waliyy_relationship" placeholder="e.g. Father / Brother / Paternal Uncle / Judge (Qadhi)" className={cn(field("wife_waliyy_relationship"), "pl-11")} value={data.wife_waliyy_relationship} onChange={on("wife_waliyy_relationship")} />
            <ShieldCheck size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </FormField>

        <MahrTermsFields
          agreedMahr={data.agreed_mahr}
          paidMahrAndDeferred={data.paid_mahr_and_deferred}
          gifts={data.particulars_of_gifts}
          errors={errors}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
