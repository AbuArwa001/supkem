"use client";

import React, { useState } from "react";
import { Copy, Check, FileText } from "lucide-react";
import { VerificationData } from "./types";

interface VerificationCoreInfoProps {
  result: VerificationData;
}

export function VerificationCoreInfo({ result }: VerificationCoreInfoProps) {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
          <span>Serial Number</span>
          <button onClick={() => handleCopy(result.serial_number, "serial")} className="hover:text-slate-800 flex items-center gap-1 transition">
            {copied === "serial" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
            <span>{copied === "serial" ? "Copied" : "Copy"}</span>
          </button>
        </div>
        <p className="text-lg font-black text-slate-900 font-mono tracking-tight">{result.serial_number}</p>
      </div>

      <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
          <span>Verification Hash</span>
          <button onClick={() => handleCopy(result.qr_code_hash, "hash")} className="hover:text-slate-800 flex items-center gap-1 transition">
            {copied === "hash" ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
            <span>{copied === "hash" ? "Copied" : "Copy"}</span>
          </button>
        </div>
        <p className="text-sm font-mono text-emerald-900 font-bold break-all">{result.qr_code_hash}</p>
      </div>

      <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-100">
        <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">Document Type</p>
        <div className="flex items-center gap-2">
          <FileText size={18} className="text-emerald-700" />
          <p className="font-bold text-slate-900">
            {result.document_type === "Certificate" ? "Official Certificate" : "Official Support / Recommendation Letter"}
          </p>
        </div>
      </div>
    </div>
  );
}
