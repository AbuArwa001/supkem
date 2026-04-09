"use client";

import { Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export const AccessRestricted = () => {
  const t = useTranslations("Dashboard.admin.users.restricted");

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <div className="bg-rose-50 p-6 rounded-full">
        <Shield className="h-12 w-12 text-rose-500" />
      </div>
      <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
        {t("title")}
      </h2>
      <p className="text-slate-500 font-semibold max-w-md text-center">
        {t("desc")}
      </p>
    </div>
  );
};

