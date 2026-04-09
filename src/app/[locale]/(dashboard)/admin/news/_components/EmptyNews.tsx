import React from "react";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";

/**
 * Empty state component for the news list.
 */
export function EmptyNews() {
  const t = useTranslations("Dashboard.admin.news");

  return (
    <div className="col-span-full py-20 text-center space-y-4">
      <div className="w-20 h-20 bg-primary/5 rounded-3xl flex items-center justify-center mx-auto">
        <FileText className="text-primary/20" size={40} />
      </div>
      <p className="text-foreground/40 font-bold">{t("empty")}</p>
    </div>
  );
}
