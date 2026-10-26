import React from "react";
import { Card } from "@/components/ui/card";
import { Layers, ShieldCheck, ShieldPlus, Users } from "lucide-react";
import { useTranslations } from "next-intl";

interface AccessControlStatsProps {
  totalRoles: number;
  coreRoles: number;
  customRoles: number;
  totalGovernedUsers: number;
}

export function AccessControlStats({
  totalRoles,
  coreRoles,
  customRoles,
  totalGovernedUsers,
}: AccessControlStatsProps) {
  const t = useTranslations("Dashboard.admin.settings.accessControl");

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      <Card className="border-none shadow-premium rounded-2xl bg-white p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t("totalDefinedRoles")}</span>
          <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
            <Layers size={16} />
          </div>
        </div>
        <div className="text-2xl font-black font-outfit text-slate-900">{totalRoles}</div>
        <p className="text-[11px] text-slate-400 font-medium">{t("accessBoundariesActive")}</p>
      </Card>

      <Card className="border-none shadow-premium rounded-2xl bg-white p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t("coreSystemRoles")}</span>
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck size={16} />
          </div>
        </div>
        <div className="text-2xl font-black font-outfit text-slate-900">{coreRoles}</div>
        <p className="text-[11px] text-slate-400 font-medium">{t("protectedBaselineRoles")}</p>
      </Card>

      <Card className="border-none shadow-premium rounded-2xl bg-white p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t("customProfiles")}</span>
          <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <ShieldPlus size={16} />
          </div>
        </div>
        <div className="text-2xl font-black font-outfit text-slate-900">{customRoles}</div>
        <p className="text-[11px] text-slate-400 font-medium">{t("superAdminCreated")}</p>
      </Card>

      <Card className="border-none shadow-premium rounded-2xl bg-white p-5 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">{t("governedUsers")}</span>
          <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
            <Users size={16} />
          </div>
        </div>
        <div className="text-2xl font-black font-outfit text-slate-900">{totalGovernedUsers}</div>
        <p className="text-[11px] text-slate-400 font-medium">{t("assignedAuthorityProfiles")}</p>
      </Card>
    </div>
  );
}
