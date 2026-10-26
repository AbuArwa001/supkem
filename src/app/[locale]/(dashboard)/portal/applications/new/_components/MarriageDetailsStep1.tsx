"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { HusbandParticulars } from "./marriage/HusbandParticulars";
import { WifeParticulars } from "./marriage/WifeParticulars";
import { CoupleDossierHeader } from "./marriage/CoupleDossierHeader";
import { CoupleTabNav } from "./marriage/CoupleTabNav";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface MarriageDetailsStep1Props {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

const groomFields = ["husband_name", "husband_id_passport", "husband_age", "husband_occupation", "husband_residence_county", "husband_residence_sub_county"] as const;
const brideFields = ["wife_name", "wife_id_passport", "wife_age", "wife_occupation", "wife_residence_county", "wife_residence_sub_county"] as const;

export function MarriageDetailsStep1({ data, errors, onChange }: MarriageDetailsStep1Props) {
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");

  const groomErrors = groomFields.filter((f) => !!errors[f]);
  const brideErrors = brideFields.filter((f) => !!errors[f]);
  const groomFilled = groomFields.filter((f) => !!data[f]?.trim()).length;
  const brideFilled = brideFields.filter((f) => !!data[f]?.trim()).length;

  useEffect(() => {
    if (activeTab === "groom" && groomErrors.length === 0 && brideErrors.length > 0) setActiveTab("bride");
    else if (activeTab === "bride" && brideErrors.length === 0 && groomErrors.length > 0) setActiveTab("groom");
  }, [errors]);

  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="space-y-6">
      <CoupleDossierHeader husbandName={data.husband_name} husbandAge={data.husband_age} wifeName={data.wife_name} wifeAge={data.wife_age} />

      <CoupleTabNav
        activeTab={activeTab} setActiveTab={setActiveTab}
        groomErrorsCount={groomErrors.length} brideErrorsCount={brideErrors.length}
        groomFilled={groomFilled} brideFilled={brideFilled}
        husbandName={data.husband_name} wifeName={data.wife_name}
      />

      <div className="relative">
        <AnimatePresence mode="wait">
          {activeTab === "groom" ? (
            <motion.div key="tab-groom" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.2 }} className="space-y-4">
              <HusbandParticulars data={data} errors={errors} onChange={onChange} />
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <User size={16} className="text-blue-600" />
                  <span>Next: Bride&apos;s Legal Particulars</span>
                </div>
                <button type="button" onClick={() => setActiveTab("bride")} className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs font-outfit flex items-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <span>Continue to Bride&apos;s Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div key="tab-bride" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }} className="space-y-4">
              <WifeParticulars data={data} errors={errors} onChange={onChange} />
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <button type="button" onClick={() => setActiveTab("groom")} className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-black text-xs font-outfit flex items-center gap-2 border border-slate-200 shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all">
                  <ArrowLeft size={14} />
                  <span>Return to Groom&apos;s Details</span>
                </button>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                  <CheckCircle2 size={16} />
                  <span>All couple details can now be submitted</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
