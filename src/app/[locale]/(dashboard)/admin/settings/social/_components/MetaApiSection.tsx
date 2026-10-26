import React, { useState } from "react";
import { RefreshCw, HelpCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { MetaGuideAccordion } from "./MetaGuideAccordion";
import { MetaDiagnosticTool } from "./MetaDiagnosticTool";
import { MetaApiSettings } from "@/lib/socialSettings";

interface MetaApiSectionProps {
  metaApi?: MetaApiSettings;
  isToggling: boolean;
  isSaving: boolean;
  isTesting: boolean;
  testResult: any;
  onToggle: (enabled: boolean) => void;
  onUpdate: (updates: { facebookPageId?: string; facebookAccessToken?: string; instagramBusinessId?: string }) => void;
  onRunTest: () => void;
}

export function MetaApiSection({
  metaApi, isToggling, isSaving, isTesting, testResult, onToggle, onUpdate, onRunTest,
}: MetaApiSectionProps) {
  const t = useTranslations("Dashboard.admin.settings.social");
  const [showToken, setShowToken] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  return (
    <Card className="rounded-3xl border border-slate-200/90 shadow-xs bg-white overflow-hidden">
      <CardHeader className="bg-linear-to-r from-blue-50/70 via-pink-50/40 to-transparent pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5 items-center">
                <div className="w-6 h-6 rounded-full bg-[#1877F2] text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-2 ring-white">f</div>
                <div className="w-6 h-6 rounded-full bg-linear-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center text-[10px] font-bold shadow-xs ring-2 ring-white">IG</div>
              </div>
              <CardTitle className="text-xl font-bold font-outfit text-slate-900">{t("meta.title")}</CardTitle>
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-[10px] py-0 font-semibold">{t("meta.badge")}</Badge>
            </div>
            <CardDescription className="text-sm text-slate-500">{t("meta.desc")}</CardDescription>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                {t("directIngestion")}
                {isToggling && <RefreshCw size={11} className="animate-spin text-blue-600" />}
              </span>
              <span className={`text-[10px] font-semibold flex items-center gap-1 ${metaApi?.enabled ? "text-blue-600" : "text-slate-400"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${metaApi?.enabled ? "bg-blue-500 animate-pulse" : "bg-slate-300"}`} />
                {metaApi?.enabled ? t("activeStreaming") : t("inactive")}
              </span>
            </div>
            <Switch checked={metaApi?.enabled ?? false} onCheckedChange={onToggle} disabled={isToggling || isSaving} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("meta.pageIdLabel")}</label>
            <Input placeholder={t("meta.pageIdPlaceholder")} value={metaApi?.facebookPageId || ""} onChange={(e) => onUpdate({ facebookPageId: e.target.value.trim() })} className="h-11 rounded-xl text-sm font-mono" />
            <p className="text-xs text-slate-400">{t("meta.pageIdHint", { default: "100079747610399" })}</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("meta.igIdLabel")}</label>
            <Input placeholder={t("meta.igIdPlaceholder")} value={metaApi?.instagramBusinessId || ""} onChange={(e) => onUpdate({ instagramBusinessId: e.target.value.trim() })} className="h-11 rounded-xl text-sm font-mono" />
            <p className="text-xs text-slate-400">If connected to Facebook, this can also be auto-detected.</p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("meta.tokenLabel")}</label>
              <button type="button" onClick={() => setShowGuide(!showGuide)} className="text-xs text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center gap-1">
                <HelpCircle size={13} /> {t("meta.guideBtn")}
              </button>
            </div>
            <div className="relative">
              <Input type={showToken ? "text" : "password"} placeholder={t("meta.tokenPlaceholder")} value={metaApi?.facebookAccessToken || ""} onChange={(e) => onUpdate({ facebookAccessToken: e.target.value.trim() })} className="h-11 rounded-xl text-sm font-mono pr-20 rtl:pr-3 rtl:pl-20" />
              <button type="button" onClick={() => setShowToken(!showToken)} className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 p-1 font-medium">
                {showToken ? t("hide") : t("show")}
              </button>
            </div>
            <p className="text-xs text-slate-400">{t("meta.tokenHint")}</p>
          </div>
        </div>
        <MetaGuideAccordion isOpen={showGuide} />
        <MetaDiagnosticTool isTesting={isTesting} hasToken={Boolean(metaApi?.facebookAccessToken)} testResult={testResult} onRunTest={onRunTest} />
      </CardContent>
    </Card>
  );
}
