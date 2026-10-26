"use client";

import { Shield, Lock, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface UserAccessTabsProps {
  user: any;
  activeTab: "permissions" | "organizations";
}

export function UserAccessTabs({ user, activeTab }: UserAccessTabsProps) {
  const t = useTranslations("Dashboard.admin.users.details");

  if (activeTab === "permissions") {
    return (
      <div className="space-y-4 p-2">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
          <div className="flex items-center gap-2 text-slate-800 font-black text-xs uppercase tracking-wider">
            <Shield className="h-4 w-4 text-emerald-600" />
            {t("clearanceLevel")}
          </div>
          <p className="text-sm font-bold text-slate-900">
            {user?.is_superuser ? t("superuserClearance") : user?.is_staff ? t("staffClearance") : t("standardClearance")}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-black uppercase tracking-wider text-slate-400">Assigned Privileges</p>
          <div className="flex flex-wrap gap-2">
            {user?.role?.permissions && user.role.permissions.length > 0 ? (
              user.role.permissions.map((p: any) => (
                <Badge key={p.id} variant="outline" className="rounded-xl border-slate-200 bg-white font-bold text-[10px] text-slate-700 px-3 py-1">
                  <Lock className="h-3 w-3 mr-1 text-slate-400" />
                  {p.name || p.codename}
                </Badge>
              ))
            ) : (
              <Badge variant="outline" className="rounded-xl border-slate-200 bg-white font-bold text-[10px] text-slate-600 px-3 py-1">
                Standard Member Permissions
              </Badge>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 p-2">
      {user?.organizations && user.organizations.length > 0 ? (
        user.organizations.map((org: any) => (
          <div key={org.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-xl text-emerald-600 shadow-sm border border-slate-100"><Building2 className="h-5 w-5" /></div>
              <div>
                <p className="font-black text-xs uppercase tracking-wider text-slate-900">{org.name}</p>
                <p className="text-[10px] text-slate-400 font-medium capitalize">
                  {org.type || "Institution"} • Joined {org.joined_at ? format(new Date(org.joined_at), "MMM yyyy") : "N/A"}
                </p>
              </div>
            </div>
            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 font-black text-[10px] uppercase">
              {org.status || "Member"}
            </Badge>
          </div>
        ))
      ) : (
        <div className="text-center py-10 space-y-2">
          <Building2 className="h-10 w-10 text-slate-300 mx-auto" />
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t("noOrgs")}</p>
        </div>
      )}
    </div>
  );
}
