"use client";

// External libraries
import { Gift, ShieldCheck } from "lucide-react";

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
  const on = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange(key, e.target.value);

  return (
    <div className="p-8 rounded-[24px] bg-white border border-slate-200/90 shadow-xl shadow-slate-200/40 space-y-8">
      <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
        <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100/80 shadow-xs">
          <Gift size={24} />
        </div>
        <div>
          <h3 className="text-2xl font-black font-outfit text-slate-900">Financials &amp; Guardianship</h3>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            Waliyy (Bride&apos;s Guardian) and Mahr Particulars
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Waliyy Full Name"
          name="wife_waliyy_name"
          error={errors.wife_waliyy_name}
          required
        >
          <input
            type="text"
            name="wife_waliyy_name"
            placeholder="e.g. Sheikh Omar Hassan (Father/Brother/Guardian)"
            className={field("wife_waliyy_name")}
            value={data.wife_waliyy_name}
            onChange={on("wife_waliyy_name")}
          />
        </FormField>

        <FormField
          label="Relationship to Bride"
          name="wife_waliyy_relationship"
          error={errors.wife_waliyy_relationship}
          required
        >
          <input
            type="text"
            name="wife_waliyy_relationship"
            placeholder="e.g. Father / Uncle / Brother / Judge (Qadhi)"
            className={field("wife_waliyy_relationship")}
            value={data.wife_waliyy_relationship}
            onChange={on("wife_waliyy_relationship")}
          />
        </FormField>

        <FormField
          label="Agreed Mahr (Dowry Value / Specification)"
          name="agreed_mahr"
          error={errors.agreed_mahr}
          required
        >
          <input
            type="text"
            name="agreed_mahr"
            placeholder="e.g. KES 50,000 / Gold Ring / Specified Cattle"
            className={field("agreed_mahr")}
            value={data.agreed_mahr}
            onChange={on("agreed_mahr")}
          />
        </FormField>

        <FormField
          label="Payment Status (Paid / Deferred)"
          name="paid_mahr_and_deferred"
          error={errors.paid_mahr_and_deferred}
          required
        >
          <input
            type="text"
            name="paid_mahr_and_deferred"
            placeholder="e.g. Fully Paid / Half Paid &amp; Balance Deferred"
            className={field("paid_mahr_and_deferred")}
            value={data.paid_mahr_and_deferred}
            onChange={on("paid_mahr_and_deferred")}
          />
        </FormField>

        <FormField
          label="Particulars of Gifts (if any)"
          name="particulars_of_gifts"
          hint="Any additional gifts or special conditions agreed upon."
          colSpan
        >
          <textarea
            name="particulars_of_gifts"
            rows={2}
            placeholder="Specify any customary gifts or household provisions..."
            className={cn(inputBase, "border-slate-200/90")}
            value={data.particulars_of_gifts}
            onChange={on("particulars_of_gifts")}
          />
        </FormField>
      </div>
    </div>
  );
}
