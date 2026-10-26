import React from "react";
import { Link } from "@/i18n/routing";
import { ChevronLeft, ShieldPlus, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface AccessControlHeaderProps {
  isSuperAdmin: boolean;
  onAddRole: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

export function AccessControlHeader({
  isSuperAdmin,
  onAddRole,
  onRefresh,
  isLoading,
}: AccessControlHeaderProps) {
  const t = useTranslations("Dashboard.admin.settings.accessControl");

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
          <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
            {t("title")} <span className="text-foreground/40 italic">{t("titleSub")}</span>
          </h1>
          <p className="text-foreground/60 font-medium tracking-tight mt-1">
            {t("desc")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3 self-start md:self-end">
        {isSuperAdmin && (
          <Button
            onClick={onAddRole}
            className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <ShieldPlus className="h-4 w-4" />
            <span>{t("addRole")}</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onRefresh}
          className="h-11 w-11 rounded-xl hover:bg-slate-100 text-slate-500"
          title={t("refresh")}
        >
          <RefreshCw className={`h-5 w-5 ${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>
    </header>
  );
}
