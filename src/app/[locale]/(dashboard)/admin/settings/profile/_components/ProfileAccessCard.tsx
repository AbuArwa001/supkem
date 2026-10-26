import React from "react";
import Image from "next/image";
import { Bell } from "lucide-react";
import { useTranslations } from "next-intl";

interface ProfileAccessCardProps {
  userRoleName?: string;
}

export function ProfileAccessCard({ userRoleName }: ProfileAccessCardProps) {
  const t = useTranslations("Dashboard.admin.settings.profile");

  const roleDisplay = userRoleName?.toLowerCase().includes("super")
    ? t("superAdmin")
    : userRoleName?.toLowerCase().includes("admin")
      ? t("admin")
      : userRoleName;

  return (
    <div className="space-y-8">
      <div className="p-10 rounded-[20px] premium-gradient text-white shadow-2xl shadow-primary/20 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <Image src="/logo.svg" alt="SUPKEM Logo" width={48} height={48} className="relative z-10" />
        <h3 className="text-2xl font-bold font-outfit relative z-10">{t("accessVerificationTitle")}</h3>
        <p className="text-sm font-medium text-white/70 relative z-10 leading-relaxed">
          {t("accessVerificationDesc")} <span className="text-secondary font-black">{roleDisplay}</span>. {t("accessVerificationScope")}
        </p>
      </div>

      <div className="p-10 rounded-[20px] bg-white border border-border shadow-sm space-y-8">
        <div className="flex items-center gap-3 text-primary">
          <Bell size={24} className="opacity-40" />
          <h4 className="text-xl font-bold font-outfit">{t("notificationsTitle")}</h4>
        </div>
        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 rounded-3xl bg-primary/[0.02] border border-primary/5 cursor-pointer group">
            <span className="text-sm font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
              {t("emailUpdates")}
            </span>
            <input type="checkbox" className="w-5 h-5 accent-primary" defaultChecked />
          </label>
          <label className="flex items-center justify-between p-4 rounded-3xl bg-primary/[0.02] border border-primary/5 cursor-pointer group">
            <span className="text-sm font-bold text-primary opacity-60 group-hover:opacity-100 transition-opacity">
              {t("smsAlerts")}
            </span>
            <input type="checkbox" className="w-5 h-5 accent-primary" />
          </label>
        </div>
      </div>
    </div>
  );
}
