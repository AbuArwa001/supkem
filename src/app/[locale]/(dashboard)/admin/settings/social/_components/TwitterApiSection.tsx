import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { TwitterApiSettings } from "@/lib/socialSettings";

interface TwitterApiSectionProps {
  twitterApi?: TwitterApiSettings;
  isToggling: boolean;
  isSaving: boolean;
  onToggle: (enabled: boolean) => void;
  onUpdate: (updates: { username?: string; bearerToken?: string }) => void;
}

export function TwitterApiSection({
  twitterApi,
  isToggling,
  isSaving,
  onToggle,
  onUpdate,
}: TwitterApiSectionProps) {
  const t = useTranslations("Dashboard.admin.settings.social");
  const [showToken, setShowToken] = useState(false);

  return (
    <Card className="rounded-3xl border border-slate-200/90 shadow-xs bg-white overflow-hidden">
      <CardHeader className="bg-linear-to-r from-slate-100/70 to-transparent pb-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-slate-900 text-white flex items-center justify-center text-[12px] font-bold shadow-xs ring-2 ring-white">
                𝕏
              </div>
              <CardTitle className="text-xl font-bold font-outfit text-slate-900">{t("twitter.title")}</CardTitle>
              <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 text-[10px] py-0 font-semibold">
                {t("twitter.badge")}
              </Badge>
            </div>
            <CardDescription className="text-sm text-slate-500">{t("twitter.desc")}</CardDescription>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                {t("directIngestion")}
                {isToggling && <RefreshCw size={11} className="animate-spin text-slate-600" />}
              </span>
              <span className={`text-[10px] font-semibold flex items-center gap-1 ${twitterApi?.enabled ? "text-emerald-600" : "text-slate-400"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${twitterApi?.enabled ? "bg-emerald-500 animate-pulse" : "bg-slate-300"}`} />
                {twitterApi?.enabled ? t("activeStreaming") : t("inactive")}
              </span>
            </div>
            <Switch checked={twitterApi?.enabled ?? false} onCheckedChange={onToggle} disabled={isToggling || isSaving} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("twitter.usernameLabel")}</label>
            <Input
              placeholder={t("twitter.usernamePlaceholder")}
              value={twitterApi?.username || ""}
              onChange={(e) => onUpdate({ username: e.target.value.replace(/^@/, "").trim() })}
              className="h-11 rounded-xl text-sm font-mono"
            />
            <p className="text-xs text-slate-400">{t("twitter.usernameHint", { default: "SUPKEM1" })}</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600">{t("twitter.tokenLabel")}</label>
            <div className="relative">
              <Input
                type={showToken ? "text" : "password"}
                placeholder={t("twitter.tokenPlaceholder")}
                value={twitterApi?.bearerToken || ""}
                onChange={(e) => onUpdate({ bearerToken: e.target.value.trim() })}
                className="h-11 rounded-xl text-sm font-mono pr-20 rtl:pr-3 rtl:pl-20"
              />
              <button
                type="button"
                onClick={() => setShowToken(!showToken)}
                className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 p-1 font-medium"
              >
                {showToken ? t("hide") : t("show")}
              </button>
            </div>
            <p className="text-xs text-slate-400">{t("twitter.tokenHint")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
