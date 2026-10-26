import React from "react";
import { Link } from "@/i18n/routing";
import { Settings2, RefreshCw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface SystemParamsHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

export function SystemParamsHeader({ onRefresh, isLoading }: SystemParamsHeaderProps) {
  const t = useTranslations("Dashboard.admin.settings.systemParams");

  return (
    <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/settings"
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-primary self-start mt-2"
        >
          <ChevronRight className="rotate-180 rtl:rotate-0" size={24} />
        </Link>
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
              <Settings2 size={28} />
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
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          className="rounded-xl hover:bg-slate-100 text-slate-500"
          title={t("refresh")}
        >
          <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </header>
  );
}
