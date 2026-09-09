"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Plus,
  Video,
  Users,
  Building2,
  ShieldCheck,
  Server,
  Activity,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface Deadline {
  title: string;
  desc: string;
  type: "warning" | "danger" | "info";
}

interface SidebarProps {
  deadlines: Deadline[];
}

export const Sidebar = ({ deadlines }: SidebarProps) => {
  const t = useTranslations("Dashboard.admin.overview");
  const tc = useTranslations("Dashboard.common");

  return (
    <div className="space-y-8">
      {/* Critical Deadlines & Alerts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">
              {t("deadlines")}
            </h3>
            <p className="text-xs text-slate-400 font-medium">
              Time-sensitive compliance & expiry notifications
            </p>
          </div>
          <Link
            href="/admin/deadlines"
            className="text-xs font-black uppercase tracking-wider text-emerald-800 hover:text-emerald-900 flex items-center gap-1 group whitespace-nowrap"
          >
            {tc("viewAll")}
            <ArrowUpRight
              size={15}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>

        <div className="space-y-3">
          {deadlines && deadlines.length > 0 ? (
            deadlines.map((item, i) => {
              const isDanger = item.type === "danger";
              const isWarning = item.type === "warning";

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-[1.75rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start gap-3.5">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-xs transition-transform group-hover:scale-105",
                        isDanger
                          ? "bg-rose-50 text-rose-600 border border-rose-200/80"
                          : isWarning
                            ? "bg-amber-50 text-amber-600 border border-amber-200/80"
                            : "bg-emerald-50 text-emerald-600 border border-emerald-200/80"
                      )}
                    >
                      <Clock size={18} />
                    </div>
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-bold text-sm text-slate-900 leading-tight group-hover:text-emerald-700 transition-colors truncate">
                          {item.title}
                        </p>
                        {isDanger && (
                          <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="p-8 text-center bg-white border border-dashed border-slate-200 rounded-[2rem] space-y-3 shadow-xs">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
                <CheckCircle2 size={24} />
              </div>
              <p className="text-base font-black font-outfit text-slate-900">
                {t("optimal")}
              </p>
              <p className="text-xs text-slate-400 font-medium max-w-[220px] mx-auto">
                {t("optimalDesc")}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Governance & Quick Action Shortcuts */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">
            {t("mediaManagement")}
          </h3>
          <p className="text-xs text-slate-400 font-medium">
            Fast portals for operational and communications staff
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
          <Link
            href="/admin/users"
            className="group p-4 rounded-[1.5rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-700 group-hover:text-white transition-all shadow-xs shrink-0">
                <Users size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 leading-tight">Team Management</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">
                  Clearance & Registry
                </p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-emerald-700 transition-colors" />
          </Link>

          <Link
            href="/admin/organizations"
            className="group p-4 rounded-[1.5rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:bg-teal-700 group-hover:text-white transition-all shadow-xs shrink-0">
                <Building2 size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 leading-tight">Organization Registry</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">
                  Mosques & Societies
                </p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-teal-700 transition-colors" />
          </Link>

          <Link
            href="/admin/news"
            className="group p-4 rounded-[1.5rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center group-hover:bg-indigo-700 group-hover:text-white transition-all shadow-xs shrink-0">
                <FileText size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 leading-tight">{t("newsCms")}</p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">
                  {t("manageArticles")}
                </p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-indigo-700 transition-colors" />
          </Link>

          <Link
            href="/admin/videos"
            className="group p-4 rounded-[1.5rem] bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all shadow-xs shrink-0">
                <Video size={18} />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900 leading-tight">
                  {t("videoBriefings")}
                </p>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">
                  {t("pressUpdates")}
                </p>
              </div>
            </div>
            <ArrowUpRight size={16} className="text-slate-300 group-hover:text-amber-600 transition-colors" />
          </Link>
        </div>
      </div>

      {/* System Health & Security Card */}
      <div className="p-6 rounded-[2rem] bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex items-center justify-between mb-4 relative z-10">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
              System Health
            </span>
          </div>
          <Server size={16} className="text-slate-400" />
        </div>

        <div className="space-y-2 relative z-10">
          <p className="font-bold text-sm text-slate-100">
            All Services Operational
          </p>
          <p className="text-[11px] text-slate-400 font-medium">
            Core Database Connected • API Latency 24ms
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono relative z-10">
          <span>TLS 1.3 ENCRYPTED</span>
          <span>UPTIME 99.98%</span>
        </div>
      </div>
    </div>
  );
};
