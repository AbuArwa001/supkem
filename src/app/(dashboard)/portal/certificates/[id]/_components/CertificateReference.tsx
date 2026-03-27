"use client";

import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

interface CertificateReferenceProps {
  applicationId: string | number;
}

export function CertificateReference({
  applicationId,
}: CertificateReferenceProps) {
  return (
    <div className="max-w-4xl mx-auto flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <CheckCircle2 size={18} />
        </div>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
            Reference Application
          </p>
          <p className="text-sm font-bold text-slate-800">
            #{String(applicationId).substring(0, 8).toUpperCase()}
          </p>
        </div>
      </div>
      <Link
        href={`/portal/applications/${applicationId}`}
        className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:border-slate-300 hover:shadow-sm transition-all"
      >
        View App Details
      </Link>
    </div>
  );
}
