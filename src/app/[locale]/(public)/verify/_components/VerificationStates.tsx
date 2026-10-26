"use client";

import React from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";

interface NotFoundProps {
  identifier: string;
  onReset: () => void;
}

export function VerificationNotFound({ identifier, onReset }: NotFoundProps) {
  return (
    <div className="bg-white rounded-3xl border border-red-200 shadow-md p-8 sm:p-10 text-center space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="w-16 h-16 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto border border-red-200">
        <ShieldAlert size={36} />
      </div>
      <h3 className="text-xl font-bold text-slate-900">Document Not Found or Unverified</h3>
      <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
        No authentic SUPKEM certificate or letter matches the provided identifier (
        <span className="font-mono font-bold text-slate-800">{identifier}</span>
        ). Please verify the serial number or scan the QR code directly from the document.
      </p>
      <div className="pt-4 flex justify-center gap-4">
        <button onClick={onReset} className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition">
          Try Another Search
        </button>
        <Link href="/contact" className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition shadow-xs">
          Report Potential Fraud
        </Link>
      </div>
    </div>
  );
}

export function VerificationFaq() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-2">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">1</div>
        <h4 className="font-bold text-slate-900 text-sm">Scan QR Code</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Scan the secure dynamic QR code printed at the bottom right of any official SUPKEM document.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-2">
        <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">2</div>
        <h4 className="font-bold text-slate-900 text-sm">Verify Serial Number</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          Enter the unique serial code (e.g. CERT-XXXX or LTR-XXXX) located on the official header.
        </p>
      </div>
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 space-y-2">
        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">3</div>
        <h4 className="font-bold text-slate-900 text-sm">Instant Authenticity</h4>
        <p className="text-xs text-slate-500 leading-relaxed">
          View real-time issuance status, holder identification, and authorizing leadership credentials.
        </p>
      </div>
    </div>
  );
}
