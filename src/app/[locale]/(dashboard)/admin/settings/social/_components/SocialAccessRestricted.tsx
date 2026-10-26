import React from "react";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function SocialAccessRestricted() {
  const t = useTranslations("Dashboard.admin.settings.social");

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center space-y-4">
      <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-3xl flex items-center justify-center mx-auto border border-rose-200">
        <ShieldAlert size={32} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">{t("accessRestricted")}</h2>
      <p className="text-slate-500 max-w-md mx-auto">{t("accessRestrictedDesc")}</p>
      <Link href="/admin/settings">
        <Button variant="outline" className="mt-4 gap-2">
          <ArrowLeft size={16} className="rtl:rotate-180" /> {t("backToSettings")}
        </Button>
      </Link>
    </div>
  );
}
