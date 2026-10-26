import React from "react";
import { RefreshCw, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface YouTubeDiagnosticToolProps {
  isTesting: boolean;
  hasApiKey: boolean;
  testResult: {
    success: boolean;
    message: string;
    channel?: { title?: string; id?: string; videoCount?: number };
  } | null;
  onRunTest: () => void;
}

export function YouTubeDiagnosticTool({
  isTesting,
  hasApiKey,
  testResult,
  onRunTest,
}: YouTubeDiagnosticToolProps) {
  const t = useTranslations("Dashboard.admin.settings.social");

  return (
    <div className="space-y-4 pt-4 border-t border-slate-100">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-slate-800">{t("diagnostics")}</h4>
          <p className="text-xs text-slate-400">{t("youtube.diagnosticsDesc")}</p>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onRunTest}
          disabled={isTesting || !hasApiKey}
          className="bg-white hover:bg-slate-50 border-slate-200 text-slate-700 text-xs font-bold gap-2"
        >
          <RefreshCw size={13} className={isTesting ? "animate-spin text-red-600" : "text-slate-500"} />
          {isTesting ? t("youtube.testing") : t("youtube.testBtn")}
        </Button>
      </div>

      {testResult && (
        <div
          className={`p-4 rounded-2xl text-xs space-y-1.5 border ${
            testResult.success
              ? "bg-emerald-50 border-emerald-200 text-emerald-900"
              : "bg-rose-50 border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            {testResult.success ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-600" />
            )}
            <span>{testResult.message}</span>
          </div>

          {testResult.channel && (
            <div className="pt-2 border-t border-emerald-200/60 flex items-center justify-between text-slate-700">
              <div>
                <strong>{t("connectedChannel")}</strong> {testResult.channel.title} (ID: {testResult.channel.id})
              </div>
              {testResult.channel.videoCount !== undefined && (
                <div className="text-slate-600 font-semibold">
                  {t("videosIndexed", { count: testResult.channel.videoCount })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
