"use client";

import { useTranslations } from "next-intl";

interface ProfileStatusCardProps {
  roleName?: string;
}

export function ProfileStatusCard({ roleName }: ProfileStatusCardProps) {
  const t = useTranslations("Dashboard.portal.profilePage");

  return (
    <div className="space-y-8">
      <div className="p-10 rounded-[20px] premium-gradient text-white shadow-2xl shadow-primary/20 space-y-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <h3 className="text-2xl font-bold font-outfit relative z-10">
          {t("accountStatus")}
        </h3>
        <p className="text-sm font-medium text-white/70 relative z-10 leading-relaxed">
          {t("signedInAs")}{" "}
          <span className="text-secondary font-black">
            {roleName || t("portalUser")}
          </span>
          . {t("statusDesc")}
        </p>
      </div>
    </div>
  );
}
