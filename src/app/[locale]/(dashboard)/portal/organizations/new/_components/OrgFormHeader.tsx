"use client";

import { ShieldCheck } from "lucide-react";
import { Link } from "@/i18n/routing";

export function OrgFormHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-200/80">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
          <ShieldCheck size={14} className="text-secondary" />
          <span>Accreditation Program</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-black font-outfit text-slate-900 tracking-tight">
          Institution Registration
        </h1>
        <p className="text-slate-500 text-sm md:text-base font-medium">
          Register your Islamic institution, mosque, or educational center under the Supreme Council of Kenya Muslims.
        </p>
      </div>

      <Link
        href="/portal/organizations"
        className="text-slate-500 hover:text-primary font-bold text-sm transition-colors py-2 self-start md:self-auto"
      >
        &larr; Back to Institutions
      </Link>
    </div>
  );
}
