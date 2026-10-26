"use client";

import React from "react";
import { Award, Building2, UserCheck, Calendar, Clock, CheckCircle2 } from "lucide-react";
import { VerificationData } from "./types";
import { VerificationCoreInfo } from "./VerificationCoreInfo";

interface VerificationDetailsGridProps {
  result: VerificationData;
}

function formatDate(dateStr?: string | null) {
  if (!dateStr) return "N/A";
  try {
    return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

export function VerificationDetailsGrid({ result }: VerificationDetailsGridProps) {
  return (
    <div className="p-6 sm:p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VerificationCoreInfo result={result} />

        <div className="space-y-4">
          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Service / Purpose</p>
            <div className="flex items-center gap-2">
              <Award size={18} className="text-amber-600" />
              <p className="font-bold text-slate-900">{result.service_name}</p>
            </div>
            {result.service_category && (
              <span className="inline-block mt-2 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-slate-200/60 text-slate-700 rounded">
                Category: {result.service_category}
              </span>
            )}
          </div>

          <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
            <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Issued To / Designated Holder</p>
            <div className="flex items-center gap-2">
              {result.organization_name ? <Building2 size={18} className="text-blue-600" /> : <UserCheck size={18} className="text-emerald-600" />}
              <p className="font-bold text-slate-900 text-base">
                {result.holder_name || result.organization_name || result.recipient || "Designated Entity"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Issue Date</p>
              <div className="flex items-center gap-1.5 text-slate-800 font-bold text-sm">
                <Calendar size={14} className="text-slate-400" />
                <span>{formatDate(result.issued_at)}</span>
              </div>
            </div>
            <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Valid Until</p>
              <div className="flex items-center gap-1.5 text-slate-800 font-bold text-sm">
                <Clock size={14} className="text-slate-400" />
                <span>{result.expires_at ? formatDate(result.expires_at) : "Indefinite"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {(result.subject || result.custom_text_en) && (
        <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Official Endorsement Record</p>
          {result.subject && <p className="font-bold text-slate-900 mb-1 text-sm">Subject: {result.subject}</p>}
          {result.custom_text_en && <p className="text-xs text-slate-600 leading-relaxed">{result.custom_text_en}</p>}
        </div>
      )}

      <div className="pt-6 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-900">Digitally Certified by SUPKEM</p>
            <p className="text-[11px] text-slate-500">Signatory: {result.signatory_title || "National Leadership"}</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold text-slate-500">Protected by Tamper-Proof Cryptographic Hash</span>
      </div>
    </div>
  );
}
