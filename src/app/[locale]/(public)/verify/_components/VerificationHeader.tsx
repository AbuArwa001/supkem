"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Search, ShieldCheck } from "lucide-react";

interface VerificationHeaderProps {
  identifier: string;
  onIdentifierChange: (val: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

export function VerificationHeader({
  identifier, onIdentifierChange, onSearch, loading,
}: VerificationHeaderProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <span className="text-xs font-mono uppercase bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200/60 font-semibold tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Registry Live
        </span>
      </div>

      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm text-center relative overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-emerald-600 via-primary to-amber-500" />
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-slate-50 border border-slate-200/60 rounded-2xl flex items-center justify-center p-3 mb-6 shadow-xs">
            <Image src="/logo.svg" alt="SUPKEM Emblem" width={64} height={64} className="object-contain" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            SUPKEM Credential Verification
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-800 mt-1 mb-2 font-arabic">
            المجلس الأعلى لمسلمي كينيا - التحقق الرسمي من الوثائق
          </p>
          <p className="text-sm text-slate-600 max-w-lg leading-relaxed">
            Verify the official authenticity of certificates, marriage credentials, pilgrim authorizations, and letters issued by the Supreme Council of Kenya Muslims.
          </p>

          <form onSubmit={onSearch} className="w-full mt-8 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input
                type="text"
                value={identifier}
                onChange={(e) => onIdentifierChange(e.target.value)}
                placeholder="Enter Verification Hash (SUP-VRF-...) or Serial No. (CERT-...)"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 text-sm font-mono uppercase tracking-wide transition"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !identifier.trim()}
              className="px-7 py-3.5 bg-emerald-800 hover:bg-emerald-900 disabled:opacity-50 text-white font-bold text-sm rounded-2xl shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck size={18} />
                  <span>Verify Record</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
