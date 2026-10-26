"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { FinancialsGuardianship } from "./marriage/FinancialsGuardianship";
import { EventWitnesses } from "./marriage/EventWitnesses";
import { ContractDossierHeader } from "./marriage/ContractDossierHeader";
import { ContractTabNav } from "./marriage/ContractTabNav";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface MarriageDetailsStep2Props {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

const financialFields = ["wife_waliyy_name", "wife_waliyy_relationship", "agreed_mahr", "paid_mahr_and_deferred"] as const;
const witnessFields = ["place_of_marriage", "date_of_marriage", "county_of_marriage", "witness_1_name", "witness_1_id", "witness_2_name", "witness_2_id"] as const;

export function MarriageDetailsStep2({ data, errors, onChange }: MarriageDetailsStep2Props) {
  const [activeTab, setActiveTab] = useState<"financials" | "witnesses">("financials");

  const financialErrors = financialFields.filter((f) => !!errors[f]);
  const witnessErrors = witnessFields.filter((f) => !!errors[f]);
  const financialFilled = financialFields.filter((f) => !!data[f]?.trim()).length;
  const witnessFilled = witnessFields.filter((f) => !!data[f]?.trim()).length;

  useEffect(() => {
    if (activeTab === "financials" && financialErrors.length === 0 && witnessErrors.length > 0) setActiveTab("witnesses");
    else if (activeTab === "witnesses" && witnessErrors.length === 0 && financialErrors.length > 0) setActiveTab("financials");
  }, [errors]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-6">
      <ContractDossierHeader waliyyName={data.wife_waliyy_name} waliyyRelationship={data.wife_waliyy_relationship} agreedMahr={data.agreed_mahr} dateOfMarriage={data.date_of_marriage} />

      <ContractTabNav
        activeTab={activeTab} setActiveTab={setActiveTab}
        financialErrorsCount={financialErrors.length} witnessErrorsCount={witnessErrors.length}
        financialFilled={financialFilled} witnessFilled={witnessFilled}
        agreedMahr={data.agreed_mahr} placeOfMarriage={data.place_of_marriage}
      />

      <div className="relative">
        <AnimatePresence mode="wait">
          {activeTab === "financials" ? (
            <motion.div key="tab-financials" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }} className="space-y-4">
              <FinancialsGuardianship data={data} errors={errors} onChange={onChange} />
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Gift size={16} className="text-amber-600" />
                  <span>Next: Venue &amp; Solemnization Witnesses</span>
                </div>
                <button type="button" onClick={() => setActiveTab("witnesses")} className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs font-outfit flex items-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <span>Continue to Venue &amp; Witnesses</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="tab-witnesses" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }} className="space-y-4">
              <EventWitnesses data={data} errors={errors} onChange={onChange} />
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <button type="button" onClick={() => setActiveTab("financials")} className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-black text-xs font-outfit flex items-center gap-2 border border-slate-200 shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <ArrowLeft size={14} />
                  <span>Return to Mahr &amp; Waliyy</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <CheckCircle2 size={16} />
                  <span>All solemnization details ready for submission</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
