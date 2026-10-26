import React from "react";
import { Link } from "@/i18n/routing";
import { Bell, RefreshCw, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface NotificationsHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export function NotificationsHeader({ onRefresh, isLoading }: NotificationsHeaderProps) {
  const t = useTranslations("Dashboard.admin.settings.notifications");

  return (
    <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/settings"
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-primary self-start mt-2"
        >
          <ChevronLeft size={24} className="rtl:rotate-180" />
        </Link>
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100">
              <Bell size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
                {t("title")} <span className="text-foreground/40 italic">{t("titleSub")}</span>
              </h1>
              <p className="text-foreground/60 font-medium tracking-tight mt-1">
                {t("desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRefresh}
        className="rounded-xl hover:bg-slate-100 text-slate-500"
        title={t("refresh")}
      >
        <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
      </Button>
    </header>
  );
}
