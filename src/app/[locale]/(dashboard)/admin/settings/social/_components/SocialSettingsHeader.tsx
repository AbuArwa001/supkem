import React from "react";
import { Link } from "@/i18n/routing";
import { ArrowLeft, Share2, RefreshCw, Save, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface SocialSettingsHeaderProps {
  isSaving: boolean;
  statusMessage: { type: "success" | "error"; text: string } | null;
  onSave: () => void;
  onReset: () => void;
}

export function SocialSettingsHeader({
  isSaving,
  statusMessage,
  onSave,
  onReset,
}: SocialSettingsHeaderProps) {
  const t = useTranslations("Dashboard.admin.settings.social");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-primary transition-colors font-semibold mb-2"
          >
            <ArrowLeft size={16} className="rtl:rotate-180" />
            {t("backToSettings")}
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <Share2 size={20} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black font-outfit text-slate-900 tracking-tight">
                {t("title")}
              </h1>
              <p className="text-slate-500 text-xs sm:text-sm font-medium">
                {t("desc")}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            disabled={isSaving}
            className="rounded-xl border-slate-200 text-xs font-bold gap-1.5"
          >
            <RefreshCw size={14} />
            {t("resetDefaults")}
          </Button>
          <Button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="rounded-xl bg-primary hover:bg-primary/90 text-white text-xs font-bold gap-2 shadow-lg shadow-primary/20"
          >
            {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {isSaving ? t("saving") : t("saveChanges")}
          </Button>
        </div>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold border ${
            statusMessage.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle size={18} className="text-rose-600 shrink-0" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}
    </div>
  );
}
