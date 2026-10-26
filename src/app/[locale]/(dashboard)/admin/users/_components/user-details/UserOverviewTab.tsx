"use client";

import { Mail, Phone, MapPin, Calendar, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { useTranslations } from "next-intl";

interface UserOverviewTabProps {
  user: any;
}

export function UserOverviewTab({ user }: UserOverviewTabProps) {
  const t = useTranslations("Dashboard.admin.users.details");

  const DetailRow = ({ icon: Icon, label, value, className = "" }: any) => (
    <div className={`flex items-start justify-between gap-3 p-3.5 rounded-2xl hover:bg-slate-50 transition-colors ${className}`}>
      <div className="flex items-start gap-3.5 min-w-0">
        <div className="bg-slate-100 p-2.5 rounded-xl text-slate-500 shrink-0 mt-0.5">
          <Icon size={16} />
        </div>
        <div className="space-y-0.5 text-start min-w-0">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">{label}</p>
          <p className="text-sm font-bold text-slate-800 break-all">{value || "N/A"}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-1">
      <DetailRow icon={Mail} label={t("email")} value={user?.email} />
      <DetailRow icon={Phone} label={t("phone")} value={user?.phone_number} />
      <DetailRow icon={MapPin} label={t("locationBranch")} value={user?.location || "Nairobi"} />
      <DetailRow
        icon={Calendar}
        label={t("memberSince")}
        value={user?.created_at ? format(new Date(user.created_at), "MMMM dd, yyyy") : null}
      />
      <DetailRow
        icon={user?.is_email_verified ? CheckCircle2 : XCircle}
        label={t("emailVerified")}
        value={user?.is_email_verified ? t("verified") : t("unverified")}
        className={user?.is_email_verified ? "text-emerald-700" : "text-amber-700"}
      />
      <DetailRow
        icon={user?.is_active ? CheckCircle2 : XCircle}
        label={t("accountStatus")}
        value={user?.is_active ? t("verifiedActive") : t("suspendedDisabled")}
        className={user?.is_active ? "text-emerald-700" : "text-rose-700"}
      />
    </div>
  );
}
