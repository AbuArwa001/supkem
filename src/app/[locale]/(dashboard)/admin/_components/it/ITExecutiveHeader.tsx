import React from "react";
import { Server, CheckCircle2, Activity, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface ITExecutiveHeaderProps {
  userName: string;
  isRefreshing: boolean;
  onRefresh: () => void;
}

export function ITExecutiveHeader({
  userName,
  isRefreshing,
  onRefresh,
}: ITExecutiveHeaderProps) {
  const t = useTranslations("Dashboard.admin.it");

  return (
    <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2 border-b border-slate-100">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Badge className="bg-indigo-50 text-indigo-700 border-indigo-200 font-black tracking-widest text-[10px] uppercase px-2.5 py-0.5 flex items-center gap-1.5">
            <Server size={12} />
            {t("primaryDashboardTitle")}
          </Badge>
          <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-bold text-[10px] uppercase px-2 py-0.5 flex items-center gap-1">
            <CheckCircle2 size={11} />
            {t("allSystemsOp")}
          </Badge>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-outfit text-slate-900 tracking-tight">
          {t("welcomeBack")} <span className="text-primary italic">{userName}</span>
        </h1>
        <p className="text-slate-500 font-medium text-sm mt-1">{t("commandCenterDesc")}</p>
      </div>

      <div className="flex items-center gap-3 self-start lg:self-end">
        <Link href="/admin/settings/audit">
          <Button
            variant="outline"
            className="h-11 px-4 rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 shadow-xs"
          >
            <Activity className="h-4 w-4 text-purple-600" />
            <span>{t("fullAuditTrail")}</span>
          </Button>
        </Link>

        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          className="h-11 w-11 rounded-xl hover:bg-slate-100 text-slate-500 border border-slate-200"
          title={t("refreshTelemetry")}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin text-primary" : ""}`} />
        </Button>
      </div>
    </header>
  );
}
