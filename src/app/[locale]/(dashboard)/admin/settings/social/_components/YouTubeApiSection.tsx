import React, { useState } from "react";
import { RefreshCw, CheckCircle2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { YouTubeDiagnosticTool } from "./YouTubeDiagnosticTool";
import { YouTubeApiSettings } from "@/lib/socialSettings";

interface YouTubeApiSectionProps {
  youtubeApi?: YouTubeApiSettings;
  isToggling: boolean;
  isSaving: boolean;
  isTesting: boolean;
  testResult: any;
  onToggle: (enabled: boolean) => void;
  onUpdate: (updates: { apiKey?: string; channelId?: string; searchQuery?: string }) => void;
  onRunTest: () => void;
}

export function YouTubeApiSection({
  youtubeApi, isToggling, isSaving, isTesting, testResult, onToggle, onUpdate, onRunTest,
}: YouTubeApiSectionProps) {
  const t = useTranslations("Dashboard.admin.settings.social");
  const [showKey, setShowKey] = useState(false);

  return (
    <Card className="rounded-3xl border border-slate-200/90 shadow-xs bg-white overflow-hidden">
      <CardHeader className="bg-linear-to-r from-red-50/70 to-transparent pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[11px] font-black shadow-xs">▶</div>
              <CardTitle className="text-xl font-bold font-outfit text-slate-900">{t("youtube.title")}</CardTitle>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 text-[10px] py-0 font-semibold">{t("youtube.badge")}</Badge>
            </div>
            <CardDescription className="text-sm text-slate-500">{t("youtube.desc")}</CardDescription>
          </div>
          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                {t("youtube.videoStream")}
                {isToggling && <RefreshCw size={11} className="animate-spin text-red-600" />}
              </span>
              <span className={`text-[10px] font-semibold flex items-center gap-1 ${youtubeApi?.enabled ? "text-red-600" : "text-slate-400"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${youtubeApi?.enabled ? "bg-red-500 animate-pulse" : "bg-slate-300"}`} />
                {youtubeApi?.enabled ? t("activeStreaming") : t("inactive")}
              </span>
            </div>
            <Switch checked={youtubeApi?.enabled ?? true} onCheckedChange={onToggle} disabled={isToggling || isSaving} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("youtube.apiKeyLabel")}</label>
              <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <CheckCircle2 size={13} /> 10,000 free requests/day
              </span>
            </div>
            <div className="relative">
              <Input type={showKey ? "text" : "password"} placeholder={t("youtube.apiKeyPlaceholder")} value={youtubeApi?.apiKey || ""} onChange={(e) => onUpdate({ apiKey: e.target.value.trim() })} className="h-11 rounded-xl text-sm font-mono pr-20 rtl:pr-3 rtl:pl-20" />
              <button type="button" onClick={() => setShowKey(!showKey)} className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 p-1 font-medium">
                {showKey ? t("hide") : t("show")}
              </button>
            </div>
            <p className="text-xs text-slate-400">{t("youtube.apiKeyHint")}</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("youtube.channelIdLabel")}</label>
            <Input placeholder={t("youtube.channelIdPlaceholder")} value={youtubeApi?.channelId || ""} onChange={(e) => onUpdate({ channelId: e.target.value.trim() })} className="h-11 rounded-xl text-sm font-mono" />
            <p className="text-xs text-slate-400">{t("youtube.channelIdHint")}</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("youtube.searchQueryLabel")}</label>
            <Input placeholder={t("youtube.searchQueryPlaceholder")} value={youtubeApi?.searchQuery || ""} onChange={(e) => onUpdate({ searchQuery: e.target.value })} className="h-11 rounded-xl text-sm" />
            <p className="text-xs text-slate-400">{t("youtube.searchQueryHint")}</p>
          </div>
        </div>
        <YouTubeDiagnosticTool isTesting={isTesting} hasApiKey={Boolean(youtubeApi?.apiKey)} testResult={testResult} onRunTest={onRunTest} />
      </CardContent>
    </Card>
  );
}
