import React from "react";
import { Link } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

export function ProfileHeader() {
  const t = useTranslations("Dashboard.admin.settings.profile");

  return (
    <div className="flex items-center gap-4 mb-8">
      <Link
        href="/admin/settings"
        className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-primary"
      >
        <ChevronRight className="rotate-180 rtl:rotate-0" size={24} />
      </Link>
      <div className="space-y-1">
        <h1 className="text-4xl font-bold font-outfit text-primary">
          {t("title")}
        </h1>
        <p className="text-foreground/60 font-medium tracking-tight">
          {t("desc")}
        </p>
      </div>
    </div>
  );
}
