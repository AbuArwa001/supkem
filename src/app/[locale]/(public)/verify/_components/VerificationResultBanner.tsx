"use client";

import React from "react";
import { ShieldCheck, AlertTriangle, Printer } from "lucide-react";
import { VerificationData } from "./types";

interface VerificationResultBannerProps {
  result: VerificationData;
}

export function VerificationResultBanner({ result }: VerificationResultBannerProps) {
  return (
    <div
      className={`p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b ${
        result.is_valid
          ? "bg-emerald-50/70 border-emerald-200/60"
          : "bg-amber-50/70 border-amber-200/60"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${
            result.is_valid
              ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
              : "bg-amber-600 text-white shadow-md shadow-amber-600/20"
          }`}
        >
          {result.is_valid ? <ShieldCheck size={32} /> : <AlertTriangle size={32} />}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-xs uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full ${
                result.is_valid
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {result.status}
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Verified at {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mt-1">
            {result.is_valid ? "Official Authentic Document" : "Document Expired / Inactive"}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Recorded in the Supreme Council of Kenya Muslims National Credential Database.
          </p>
        </div>
      </div>

      <button
        onClick={() => window.print()}
        className="no-print inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition"
      >
        <Printer size={15} />
        Print Verification
      </button>
    </div>
  );
}
