"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveApplicationsListProps {
  apps: any[];
  loading: boolean;
}

export default function ActiveApplicationsList({ apps, loading }: ActiveApplicationsListProps) {
  return (
    <div className="lg:col-span-2 space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-black font-outfit text-slate-900 tracking-tight">Active Applications</h3>
        <Link href="/portal/applications" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1 group">
          View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="p-12 text-center text-slate-400 animate-pulse font-bold uppercase tracking-widest">Loading...</div>
        ) : apps.length === 0 ? (
          <div className="p-12 text-center text-slate-500 font-medium border-2 border-slate-200 border-dashed rounded-[32px] bg-white">
            No active applications found.
          </div>
        ) : (
          apps.map((app, i) => (
            <Link href={`/portal/applications/${app.id}`} key={app.id || i}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="p-6 md:p-8 rounded-[32px] bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:border-primary/20 transition-all group mb-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <Search className="w-8 h-8" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-xl md:text-2xl font-black font-outfit text-slate-900 leading-tight">{app?.service_name || "Application"}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-500 font-bold">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] text-slate-600">#{String(app.id).substring(0, 8).toUpperCase()}</span>
                      <span>•</span>
                      <span className="truncate max-w-[200px]">{app?.organization_name || "Organization"}</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-3">
                  <span className={cn("px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border shadow-sm",
                    app?.status === "Under Review" ? "bg-amber-50 text-amber-700 border-amber-200" :
                      app?.status === "Submitted" ? "bg-blue-50 text-blue-700 border-blue-200" :
                        "bg-slate-50 text-slate-700 border-slate-200")}>
                    <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse", app?.status === "Under Review" ? "bg-amber-500" : "bg-blue-500")} />
                    {app?.status || "In Progress"}
                  </span>
                  <p className="text-xs text-slate-400 font-bold">{app?.submitted_at ? new Date(app.submitted_at).toLocaleDateString() : "N/A"}</p>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
