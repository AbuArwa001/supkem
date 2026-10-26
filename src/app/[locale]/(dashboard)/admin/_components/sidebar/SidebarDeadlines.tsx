import React from "react";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export interface DeadlineItem {
  title: string;
  desc: string;
  type: "warning" | "danger" | "info";
}

interface SidebarDeadlinesProps {
  deadlines: DeadlineItem[];
}

export function SidebarDeadlines({ deadlines }: SidebarDeadlinesProps) {
  const t = useTranslations("Dashboard.admin.overview");
  const tc = useTranslations("Dashboard.common");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">{t("deadlines")}</h3>
          <p className="text-xs text-slate-400 font-medium">Time-sensitive compliance & expiry notifications</p>
        </div>
        <Link href="/admin/deadlines" className="text-xs font-black uppercase tracking-wider text-emerald-800 hover:text-emerald-900 flex items-center gap-1 group whitespace-nowrap">
          {tc("viewAll")}
          <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
                className="p-5 rounded-[1.75rem] bg-white border border-slate-200/80 shadow-2xs hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-1 transition-all group relative overflow-hidden"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs transition-transform group-hover:scale-105",
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
                      {isDanger && <span className="inline-block w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />}
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="p-8 text-center bg-white border border-dashed border-slate-200 rounded-[2rem] space-y-3 shadow-2xs">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto border border-emerald-100">
              <CheckCircle2 size={24} />
            </div>
            <p className="text-base font-black font-outfit text-slate-900">{t("optimal")}</p>
            <p className="text-xs text-slate-400 font-medium max-w-[220px] mx-auto">{t("optimalDesc")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
