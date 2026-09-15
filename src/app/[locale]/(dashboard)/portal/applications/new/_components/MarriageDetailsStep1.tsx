"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Heart, Sparkles, ArrowRight, ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import { HusbandParticulars } from "./marriage/HusbandParticulars";
import { WifeParticulars } from "./marriage/WifeParticulars";
import type { MarriageDetails } from "@/app/[locale]/(dashboard)/portal/applications/new/_types";

interface MarriageDetailsStep1Props {
  data: MarriageDetails;
  errors: Record<string, string>;
  onChange: (field: string, value: string) => void;
}

export function MarriageDetailsStep1({ data, errors, onChange }: MarriageDetailsStep1Props) {
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");

  // Groom fields for validation & completion counts
  const groomFields = [
    "husband_name",
    "husband_id_passport",
    "husband_age",
    "husband_occupation",
    "husband_residence_county",
    "husband_residence_sub_county",
  ] as const;

  // Bride fields for validation & completion counts
  const brideFields = [
    "wife_name",
    "wife_id_passport",
    "wife_age",
    "wife_occupation",
    "wife_residence_county",
    "wife_residence_sub_county",
  ] as const;

  const groomErrors = groomFields.filter((f) => !!errors[f]);
  const brideErrors = brideFields.filter((f) => !!errors[f]);

  const groomFilled = groomFields.filter((f) => !!data[f]?.trim()).length;
  const brideFilled = brideFields.filter((f) => !!data[f]?.trim()).length;

  // Auto-switch tabs if the current tab has NO errors but the other tab DOES have errors
  useEffect(() => {
    if (activeTab === "groom" && groomErrors.length === 0 && brideErrors.length > 0) {
      setActiveTab("bride");
    } else if (activeTab === "bride" && brideErrors.length === 0 && groomErrors.length > 0) {
      setActiveTab("groom");
    }
  }, [errors]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* 1. Ultra-Premium Couple Live Dossier Header */}
      <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-950 p-6 sm:p-7 text-white border border-emerald-500/20 shadow-2xl shadow-emerald-950/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -translate-y-16 translate-x-16" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-black uppercase tracking-wider">
              <Sparkles size={12} className="text-amber-400" />
              <span>Muslim Marriage Registration (Nikah)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black font-outfit text-white tracking-tight">
              Couple&apos;s Legal Particulars
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-xl">
              Switch between the Groom and Bride sections below. All details are saved in real time and verified against SUPKEM Sharia records.
            </p>
          </div>

          {/* Dynamic Couple Badge Live Display */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-white/15 flex items-center gap-3 shrink-0 shadow-inner">
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Groom</span>
              <p className="text-sm font-black font-outfit text-white truncate max-w-[110px] sm:max-w-[130px]">
                {data.husband_name || "Enter Groom"}
              </p>
              <span className="text-[11px] text-emerald-400 font-bold">
                {data.husband_age ? `${data.husband_age} yrs` : "—"}
              </span>
            </div>

            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-400 to-emerald-400 text-slate-950 flex items-center justify-center font-bold text-sm shadow-md shrink-0">
              💍
            </div>

            <div className="text-left">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bride</span>
              <p className="text-sm font-black font-outfit text-white truncate max-w-[110px] sm:max-w-[130px]">
                {data.wife_name || "Enter Bride"}
              </p>
              <span className="text-[11px] text-rose-400 font-bold">
                {data.wife_age ? `${data.wife_age} yrs` : "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Non-Scroll Sub-Step Segmented Navigator */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row gap-2">
        {/* Groom Tab Button */}
        <button
          type="button"
          onClick={() => setActiveTab("groom")}
          className={`flex-1 relative flex items-center justify-between p-3.5 sm:px-5 rounded-xl transition-all font-outfit cursor-pointer ${
            activeTab === "groom"
              ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
              : "bg-slate-50/80 hover:bg-slate-100 text-slate-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === "groom"
                  ? "bg-blue-500/20 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              <User size={18} />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight">1. Groom&apos;s Details</span>
                {groomErrors.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                    {groomErrors.length} {groomErrors.length === 1 ? "issue" : "issues"}
                  </span>
                )}
              </div>
              <p
                className={`text-[11px] font-medium ${
                  activeTab === "groom" ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {data.husband_name ? data.husband_name : "Personal & ID"}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right hidden sm:block">
            {groomFilled === groomFields.length ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-400">
                <CheckCircle2 size={13} /> Complete
              </span>
            ) : (
              <span
                className={`text-[10px] font-bold ${
                  activeTab === "groom" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {groomFilled}/{groomFields.length} filled
              </span>
            )}
          </div>
        </button>

        {/* Bride Tab Button */}
        <button
          type="button"
          onClick={() => setActiveTab("bride")}
          className={`flex-1 relative flex items-center justify-between p-3.5 sm:px-5 rounded-xl transition-all font-outfit cursor-pointer ${
            activeTab === "bride"
              ? "bg-slate-900 text-white shadow-md shadow-slate-900/15"
              : "bg-slate-50/80 hover:bg-slate-100 text-slate-700"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                activeTab === "bride"
                  ? "bg-rose-500/20 text-rose-300"
                  : "bg-rose-100 text-rose-700"
              }`}
            >
              <Heart size={18} />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-tight">2. Bride&apos;s Details</span>
                {brideErrors.length > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">
                    {brideErrors.length} {brideErrors.length === 1 ? "issue" : "issues"}
                  </span>
                )}
              </div>
              <p
                className={`text-[11px] font-medium ${
                  activeTab === "bride" ? "text-slate-300" : "text-slate-500"
                }`}
              >
                {data.wife_name ? data.wife_name : "Personal & ID"}
              </p>
            </div>
          </div>

          <div className="shrink-0 text-right hidden sm:block">
            {brideFilled === brideFields.length ? (
              <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-400">
                <CheckCircle2 size={13} /> Complete
              </span>
            ) : (
              <span
                className={`text-[10px] font-bold ${
                  activeTab === "bride" ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {brideFilled}/{brideFields.length} filled
              </span>
            )}
          </div>
        </button>
      </div>

      {/* 3. Non-Scroll Viewport Card Render */}
      <div className="relative">
        <AnimatePresence mode="wait">
          {activeTab === "groom" ? (
            <motion.div
              key="tab-groom"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <HusbandParticulars data={data} errors={errors} onChange={onChange} />

              {/* Sub-step action to seamlessly transition to Bride */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <User size={16} className="text-blue-600" />
                  <span>Next: Bride&apos;s Legal Particulars</span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab("bride")}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs font-outfit flex items-center gap-2 shadow-sm cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                  <span>Continue to Bride&apos;s Details</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tab-bride"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
              className="space-y-4"
            >
              <WifeParticulars data={data} errors={errors} onChange={onChange} />

              {/* Sub-step action to return to Groom if needed */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setActiveTab("groom")}
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-black text-xs font-outfit flex items-center gap-2 border border-slate-200 shadow-xs cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
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
