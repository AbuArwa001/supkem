import React from "react";
import { Link } from "@/i18n/routing";
import { ArrowLeft } from "lucide-react";

/**
 * Header component for the deadlines page.
 */
export function DeadlineHeader() {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
      <div className="space-y-2">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest hover:gap-3 transition-all"
        >
          <ArrowLeft size={16} /> Back to Overview
        </Link>
        <h1 className="text-4xl font-black font-outfit text-slate-900 tracking-tight">
          Upcoming Deadlines
        </h1>
        <p className="text-slate-500 font-medium">
          Manage and monitor critical dates, service closings, and maintenance
          schedules.
        </p>
      </div>
    </div>
  );
}
