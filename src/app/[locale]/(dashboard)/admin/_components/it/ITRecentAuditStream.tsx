import React from "react";
import { format } from "date-fns";
import { Activity, Clock, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { AuditItem } from "./itTypes";

interface ITRecentAuditStreamProps {
  logs?: AuditItem[];
  isLoading: boolean;
}

const getActionColor = (action: string) => {
  switch (action) {
    case "CREATE": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "DELETE": return "bg-rose-50 text-rose-700 border-rose-200";
    case "LOGIN": return "bg-violet-50 text-violet-700 border-violet-200";
    case "CONFIG": return "bg-amber-50 text-amber-700 border-amber-200";
    case "SECURITY": return "bg-indigo-50 text-indigo-700 border-indigo-200";
    default: return "bg-blue-50 text-blue-700 border-blue-200";
  }
};

export function ITRecentAuditStream({ logs, isLoading }: ITRecentAuditStreamProps) {
  const t = useTranslations("Dashboard.admin.it");

  return (
    <div className="lg:col-span-7 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-outfit text-slate-900 tracking-tight flex items-center gap-2">
          <Activity className="text-purple-600 h-5 w-5" />
          {t("recentSecurityTrail")}
        </h2>
        <Link href="/admin/settings/audit" className="text-xs text-purple-700 font-bold hover:underline flex items-center gap-1">
          {t("viewFullLogs")} <ArrowUpRight size={12} />
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-14 w-full rounded-2xl" />
            ))}
          </div>
        ) : !logs || logs.length === 0 ? (
          <div className="py-12 text-center">
            <Clock className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium">{t("noRecentAudit")}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {logs.slice(0, 6).map((log, idx) => (
              <div key={log.id || idx} className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 flex items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-3 min-w-0">
                  <Badge className={`${getActionColor(log.action)} font-black text-[10px] uppercase tracking-wider px-2 py-0.5 shrink-0`}>
                    {log.action}
                  </Badge>
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 truncate">{log.object_repr || `${log.content_type_name} ${t("modified")}`}</p>
                    <p className="text-[11px] text-slate-500 truncate">{t("by")} {log.user_details?.email || "System"} • {log.content_type_name?.toUpperCase() || "RECORD"}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] text-slate-400 font-medium block">{log.timestamp ? format(new Date(log.timestamp), "HH:mm • dd MMM") : t("recent")}</span>
                  {log.ip_address && <span className="text-[10px] text-slate-400 font-mono">{log.ip_address}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
