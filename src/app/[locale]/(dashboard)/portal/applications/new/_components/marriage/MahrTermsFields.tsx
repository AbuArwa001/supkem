"use client";

import { Gift, Coins } from "lucide-react";
import { FormField, inputBase, borderFor } from "@/app/[locale]/(dashboard)/portal/applications/new/_components/ui/FormField";
import { cn } from "@/lib/utils";

interface MahrTermsFieldsProps {
  agreedMahr: string;
  paidMahrAndDeferred: string;
  gifts?: string;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

const quickPaymentPresets = [
  "Fully Paid in Advance (Mu'ajjal)",
  "Half Paid & Balance Deferred (Mu'ajjal / Mu'ajjal)",
  "Fully Deferred (Mu'ajjal)",
];

export function MahrTermsFields({
  agreedMahr,
  paidMahrAndDeferred,
  gifts,
  errors,
  onChange,
}: MahrTermsFieldsProps) {
  const getStyle = (val?: string, err?: string) =>
    cn(inputBase, borderFor(err), val && !err ? "border-emerald-500/40 bg-emerald-50/10 focus:border-emerald-600 focus:ring-emerald-500/10" : "");

  return (
    <>
      <FormField label="Agreed Mahr (Dowry Value / Specification)" name="agreed_mahr" error={errors.agreed_mahr} required>
        <div className="relative">
          <input
            type="text"
            name="agreed_mahr"
            placeholder="e.g. KES 50,000 / Gold Ring (21K) / 5 Camels"
            className={cn(getStyle(agreedMahr, errors.agreed_mahr), "pl-11 font-semibold")}
            value={agreedMahr}
            onChange={(e) => onChange("agreed_mahr", e.target.value)}
          />
          <Coins size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none" />
        </div>
      </FormField>

      <FormField label="Payment Status (Paid vs Deferred)" name="paid_mahr_and_deferred" error={errors.paid_mahr_and_deferred} required>
        <div className="space-y-2">
          <div className="relative">
            <input
              type="text"
              name="paid_mahr_and_deferred"
              placeholder="e.g. Fully Paid / Balance Deferred"
              className={cn(getStyle(paidMahrAndDeferred, errors.paid_mahr_and_deferred), "pl-11")}
              value={paidMahrAndDeferred}
              onChange={(e) => onChange("paid_mahr_and_deferred", e.target.value)}
            />
            <Gift size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {quickPaymentPresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => onChange("paid_mahr_and_deferred", preset)}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 border border-slate-200 transition-all cursor-pointer"
              >
                + {preset.split(" ")[0]} {preset.split(" ")[1] || ""}
              </button>
            ))}
          </div>
        </div>
      </FormField>

      <FormField label="Particulars of Customary Gifts (if any)" name="particulars_of_gifts" hint="Specify any additional gifts, household items, or special agreed conditions." colSpan>
        <textarea
          name="particulars_of_gifts"
          rows={2}
          placeholder="Specify any customary gifts, jewelry, or agreed stipulations..."
          className={cn(inputBase, "border-slate-200/90 resize-none")}
          value={gifts || ""}
          onChange={(e) => onChange("particulars_of_gifts", e.target.value)}
        />
      </FormField>
    </>
  );
}
