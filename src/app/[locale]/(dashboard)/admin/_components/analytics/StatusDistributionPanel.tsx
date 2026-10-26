import React from "react";
import { motion } from "framer-motion";
import { Layers, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

interface StatusDistributionPanelProps {
  statusDistribution: any[];
  organizationTypes: any[];
  totalStatusApps: number;
}

export function StatusDistributionPanel({
  statusDistribution,
  organizationTypes,
  totalStatusApps,
}: StatusDistributionPanelProps) {
  const t = useTranslations("Dashboard.admin.overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "bg-emerald-500 text-emerald-700";
      case "Under Review": return "bg-amber-500 text-amber-700";
      case "Rejected": return "bg-rose-500 text-rose-700";
      default: return "bg-teal-500 text-teal-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="lg:col-span-5 p-7 md:p-8 rounded-[2.25rem] bg-white border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-6"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-base font-black font-outfit text-slate-900 tracking-tight">{t("analytics.statusTitle")}</h4>
            <p className="text-[11px] text-slate-400 font-medium">{t("analytics.statusSubtitle")}</p>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-100 text-slate-600 shrink-0"><Layers size={18} /></div>
        </div>

        <div className="space-y-2.5">
          {statusDistribution.map((item, idx) => {
            const count = item.count || 0;
            const percentage = totalStatusApps > 0 ? Math.round((count / totalStatusApps) * 100) : 0;
            const colorClass = getStatusColor(item.status);

            return (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${colorClass.split(" ")[0]}`} />
                    {item.status}
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">{count} ({percentage}%)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    className={`h-full rounded-full ${colorClass.split(" ")[0]}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-5 border-t border-slate-100 space-y-3">
        <div className="flex items-center gap-2 text-xs font-black text-slate-800 uppercase tracking-wider">
          <Building2 size={14} className="text-emerald-700" />
          <span>{t("analytics.sectorTitle")}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {organizationTypes.slice(0, 4).map((org, i) => (
            <div key={i} className="p-3 rounded-2xl bg-slate-50 border border-slate-100/80 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 truncate mr-2">{org.type || "Institution"}</span>
              <span className="px-2 py-0.5 rounded-lg bg-white text-slate-900 font-black text-[11px] shadow-2xs">{org.count}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
