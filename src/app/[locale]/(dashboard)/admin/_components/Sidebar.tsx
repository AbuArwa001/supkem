"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  ArrowUpRight,
  CheckCircle2,
  FileText,
  Plus,
  Video,
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
      {/* Upcoming Deadlines */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-black font-outfit text-slate-900">
            {t("deadlines")}
          </h3>
          <Link
            href="/admin/deadlines"
            className="text-xs md:text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group whitespace-nowrap"
          >
            {tc("viewAll")}{" "}
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
          {deadlines && deadlines.length > 0 ? (
            deadlines.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-[24px] bg-white border border-slate-300/50 shadow-md flex items-start gap-4 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all cursor-pointer group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-16 h-16 bg-slate-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-500" />

                <div
                  className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform relative z-10",
                    item.type === "warning"
                      ? "bg-amber-50 text-amber-600 border border-amber-100"
                      : item.type === "danger"
                        ? "bg-rose-50 text-rose-600 border border-rose-100"
                        : "bg-indigo-50 text-indigo-600 border border-indigo-100",
                  )}
                >
                  <Clock size={20} />
                </div>
                <div className="space-y-1 relative z-10">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-base text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                      {item.title}
                    </p>
                    {item.type === "danger" && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                    )}
                  </div>
                  <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="p-12 text-center bg-gradient-to-br from-slate-50 to-white border border-dashed border-slate-200 rounded-[20px] space-y-4 shadow-inner relative overflow-hidden group">
              <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="w-16 h-16 bg-white rounded-[20px] flex items-center justify-center mx-auto shadow-xl border border-slate-100 group-hover:scale-110 transition-transform relative z-10">
                <CheckCircle2 className="text-emerald-500" size={32} />
              </div>
              <div className="space-y-2 relative z-10">
                <p className="text-xl font-black font-outfit text-slate-900 tracking-tight">
                  {t("optimal")}
                </p>
                <p className="text-sm text-slate-400 font-medium max-w-[200px] mx-auto leading-relaxed">
                  {t("optimalDesc")}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions / CMS Shortcuts */}
      <div className="space-y-6">
        <h3 className="text-xl md:text-2xl font-black font-outfit text-slate-900">
          {t("mediaManagement")}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
          <Link
            href="/admin/news"
            className="group p-6 rounded-[24px] bg-white border border-slate-300/50 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-inner shrink-0">
              <FileText size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 leading-tight">{t("newsCms")}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {t("manageArticles")}
              </p>
            </div>
            <Plus
              size={16}
              className="text-slate-300 group-hover:text-primary transition-colors shrink-0"
            />
          </Link>

          <Link
            href="/admin/videos"
            className="group p-6 rounded-[24px] bg-white border border-slate-300/50 shadow-md hover:shadow-xl hover:shadow-primary/10 transition-all flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/5 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-inner shrink-0">
              <Video size={20} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-slate-900 leading-tight">
                {t("videoBriefings")}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                {t("pressUpdates")}
              </p>
            </div>
            <Plus
              size={16}
              className="text-slate-300 group-hover:text-amber-500 transition-colors shrink-0"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
