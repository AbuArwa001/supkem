"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gift, Users, Sparkles, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { FinancialsGuardianship } from "./marriage/FinancialsGuardianship";
import { EventWitnesses } from "./marriage/EventWitnesses";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface MarriageDetailsStep2Props {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function MarriageDetailsStep2({ data, errors, onChange }: MarriageDetailsStep2Props) {
  const [activeTab, setActiveTab] = useState<"financials" | "witnesses">("financials");

  // Fields for Financials & Guardianship
  const financialFields = [
    "wife_waliyy_name",
    "wife_waliyy_relationship",
    "agreed_mahr",
    "paid_mahr_and_deferred",
  ] as const;

  // Fields for Venue & Witnesses
  const witnessFields = [
    "place_of_marriage",
    "date_of_marriage",
    "county_of_marriage",
    "witness_1_name",
    "witness_1_id",
    "witness_2_name",
    "witness_2_id",
  ] as const;

  const financialErrors = financialFields.filter((f) => !!errors[f]);
  const witnessErrors = witnessFields.filter((f) => !!errors[f]);

  const financialFilled = financialFields.filter((f) => !!data[f]?.trim()).length;
  const witnessFilled = witnessFields.filter((f) => !!data[f]?.trim()).length;

  // Auto-switch tabs if the current tab has NO errors but the other tab DOES have errors
  useEffect(() => {
    if (activeTab === "financials" && financialErrors.length === 0 && witnessErrors.length > 0) {
      setActiveTab("witnesses");
    } else if (activeTab === "witnesses" && witnessErrors.length === 0 && financialErrors.length > 0) {
      setActiveTab("financials");
    }
  }, [errors]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* 1. Ultra-Premium Contract Live Dossier Header */}
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-900 via-amber-950/70 to-slate-950 p-6 sm:p-7 text-white border border-amber-500/20 shadow-2xl shadow-slate-950/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-black uppercase tracking-wider">
              <Sparkles size={12} className="text-amber-400" />
              <span>Step 2 • Solemnization &amp; Witness Verification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-outfit text-white tracking-tight">
              Contract, Mahr &amp; Solemnization
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl">
              Record the agreed Mahr, Waliyy consent, solemnization venue, and credentials of two Muslim witnesses.
            </p>
          </div>

          {/* Quick Dossier Snapshot */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 flex items-center gap-3 shrink-0 shadow-inner">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Waliyy</span>
              <p className="text-sm font-black font-outfit text-white truncate max-w-[120px]">
                {data.wife_waliyy_name || "Enter Waliyy"}
              </p>
              <span className="text-[11px] text-amber-300 font-bold truncate block">
                {data.wife_waliyy_relationship || "Guardian"}
              </span>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-400 to-amber-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-md shrink-0">
              📜
            </div>

            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Mahr</span>
              <p className="text-sm font-black font-outfit text-white truncate max-w-[120px]">
                {data.agreed_mahr || "Enter Mahr"}
              </p>
              <span className="text-[11px] text-emerald-300 font-bold truncate block">
                {data.date_of_marriage || "Solemnization Date"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Non-Scroll Sub-Step Segmented Navigator */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row gap-2">
        {/* Financials & Guardianship Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("financials")}
          className={`flex-1 relative flex items-center justify-between p-3.5 sm:px-5 rounded-xl transition-all font-outfit cursor-pointer ${
            activeTab === "financials"
              ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
              : "bg-slate-50/80 hover:bg-slate-100 text-slate-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === "financials"
                  ? "bg-amber-500/20 text-amber-300"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              <Gift size={18} />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight">1. Mahr &amp; Waliyy</span>
                {financialErrors.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                    {financialErrors.length} {financialErrors.length === 1 ? "issue" : "issues"}
                  </span>
                )}
              </div>
              <p
                className={`text-[11px] font-medium ${
                  activeTab === "financials" ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {data.agreed_mahr ? data.agreed_mahr : "Dowry & Legal Guardian"}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right hidden sm:block">
            {financialFilled === financialFields.length ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-400">
                <CheckCircle2 size={13} /> Complete
              </span>
            ) : (
              <span
                className={`text-[10px] font-bold ${
                  activeTab === "financials" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {financialFilled}/{financialFields.length} filled
              </span>
            )}
          </div>
        </button>

        {/* Venue & Witnesses Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("witnesses")}
          className={`flex-1 relative flex items-center justify-between p-3.5 sm:px-5 rounded-xl transition-all font-outfit cursor-pointer ${
            activeTab === "witnesses"
              ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
              : "bg-slate-50/80 hover:bg-slate-100 text-slate-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === "witnesses"
                  ? "bg-emerald-500/20 text-emerald-300"
                  : "bg-emerald-100 text-emerald-700"
              }`}
            >
              <Users size={18} />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight">2. Venue &amp; Witnesses</span>
                {witnessErrors.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                    {witnessErrors.length} {witnessErrors.length === 1 ? "issue" : "issues"}
                  </span>
                )}
              </div>
              <p
                className={`text-[11px] font-medium ${
                  activeTab === "witnesses" ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {data.place_of_marriage ? data.place_of_marriage : "Location & 2 Shuhood"}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right hidden sm:block">
            {witnessFilled === witnessFields.length ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-400">
                <CheckCircle2 size={13} /> Complete
              </span>
            ) : (
              <span
                className={`text-[10px] font-bold ${
                  activeTab === "witnesses" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {witnessFilled}/{witnessFields.length} filled
              </span>
            )}
          </div>
        </button>
      </div>

      {/* 3. Non-Scroll Viewport Card Render */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {activeTab === "financials" ? (
            <motion.div
              key="tab-financials"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <FinancialsGuardianship data={data} errors={errors} onChange={onChange} />

              {/* Sub-step action to advance to Witnesses */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <Gift size={16} className="text-amber-600" />
                  <span>Next: Venue &amp; Solemnization Witnesses</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("witnesses")}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs font-outfit flex items-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Continue to Venue &amp; Witnesses</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tab-witnesses"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <EventWitnesses data={data} errors={errors} onChange={onChange} />

              {/* Sub-step action to return to Financials */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setActiveTab("financials")}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-black text-xs font-outfit flex items-center gap-2 border border-slate-200 shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
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
