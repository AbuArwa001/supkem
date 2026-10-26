import React from "react";
import { motion } from "framer-motion";
import {
  Activity, Calendar, RefreshCw, Plus, ChevronDown, Building2, Users, Award, Sparkles, Receipt, BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface AdminExecutiveHeaderProps {
  userName: string;
  isValidating: boolean;
  onRefresh: () => void;
  onOpenReport: () => void;
  permissions: { canOrg: boolean; canUsers: boolean; canServices: boolean; canNews: boolean; canFinance: boolean; canReport: boolean };
}

export function AdminExecutiveHeader({
  userName, isValidating, onRefresh, onOpenReport, permissions,
}: AdminExecutiveHeaderProps) {
  const t = useTranslations("Dashboard.admin.overview");
  const hour = new Date().getHours();
  const greeting = hour < 12 ? t("greetingMorning") : hour < 17 ? t("greetingAfternoon") : t("greetingEvening");
  const formattedDate = new Intl.DateTimeFormat("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }).format(new Date());
  const hasAnyQuickAction = permissions.canOrg || permissions.canUsers || permissions.canServices || permissions.canNews || permissions.canFinance;

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2.5">
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-[10px] font-black tracking-widest uppercase shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <Activity size={12} />
            {t("systemOperational")}
          </motion.div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold tracking-wider uppercase">
            <Calendar size={11} className="text-slate-400" />
            {formattedDate}
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-5xl font-black font-outfit text-slate-900 tracking-tight leading-tight">
            {greeting}, <span className="text-emerald-700 italic">{userName}</span>
          </h1>
          <p className="text-slate-500 font-medium text-sm md:text-base mt-1 max-w-2xl">{t("desc")}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <Button variant="outline" size="icon" onClick={onRefresh} title={t("liveRefresh")} className="rounded-2xl border-slate-200 bg-white h-12 w-12 hover:bg-slate-50 shadow-xs transition-all shrink-0 cursor-pointer">
          <RefreshCw className={`h-4 w-4 text-slate-600 ${isValidating ? "animate-spin" : ""}`} />
        </Button>

        {hasAnyQuickAction && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-2xl border-slate-200 bg-white font-black text-xs uppercase tracking-wider h-12 px-5 hover:bg-slate-50 shadow-xs transition-all flex items-center gap-2 text-slate-700 cursor-pointer">
                <Plus size={16} className="text-emerald-700" />
                {t("quickActions")}
                <ChevronDown size={14} className="text-slate-400" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-2xl border border-slate-100 shadow-xl p-2 min-w-[220px] bg-white text-slate-700 z-50">
              {permissions.canOrg && <DropdownMenuItem asChild className="rounded-xl font-bold text-xs py-2.5 px-3 cursor-pointer"><Link href="/admin/organizations" className="flex items-center gap-2"><Building2 size={15} className="text-emerald-600" />{t("registerOrg")}</Link></DropdownMenuItem>}
              {permissions.canUsers && <DropdownMenuItem asChild className="rounded-xl font-bold text-xs py-2.5 px-3 cursor-pointer"><Link href="/admin/users" className="flex items-center gap-2"><Users size={15} className="text-indigo-600" />{t("addNewUser")}</Link></DropdownMenuItem>}
              {permissions.canServices && <DropdownMenuItem asChild className="rounded-xl font-bold text-xs py-2.5 px-3 cursor-pointer"><Link href="/admin/services" className="flex items-center gap-2"><Award size={15} className="text-amber-600" />{t("createService")}</Link></DropdownMenuItem>}
              {permissions.canNews && <DropdownMenuItem asChild className="rounded-xl font-bold text-xs py-2.5 px-3 cursor-pointer"><Link href="/admin/news" className="flex items-center gap-2"><Sparkles size={15} className="text-teal-600" />{t("publishNews")}</Link></DropdownMenuItem>}
              {permissions.canFinance && <DropdownMenuItem asChild className="rounded-xl font-bold text-xs py-2.5 px-3 cursor-pointer"><Link href="/admin/finance" className="flex items-center gap-2"><Receipt size={15} className="text-emerald-600" />Finance & Payments</Link></DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {permissions.canReport && (
          <Button onClick={onOpenReport} className="rounded-2xl font-black bg-emerald-700 hover:bg-emerald-800 text-white h-12 px-6 shadow-lg shadow-emerald-700/20 transition-all active:scale-95 flex items-center gap-2.5 uppercase tracking-wider text-xs cursor-pointer">
            <BarChart3 size={16} />
            {t("generateReport")}
          </Button>
        )}
      </div>
    </div>
  );
}
