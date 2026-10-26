import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Info, Save, Loader2, Cpu } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { SystemParameter, CATEGORY_CONFIG } from "./systemParamTypes";

interface SystemParamItemCardProps {
  param: SystemParameter;
  pendingValue?: string;
  isUpdating: boolean;
  onValueChange: (key: string, val: string) => void;
  onSave: (key: string) => void;
}

export function SystemParamItemCard({
  param, pendingValue, isUpdating, onValueChange, onSave,
}: SystemParamItemCardProps) {
  const t = useTranslations("Dashboard.admin.settings.systemParams");
  const locale = useLocale();
  const conf = CATEGORY_CONFIG[param.category] || { label: param.category, icon: Cpu, color: "text-slate-600 bg-slate-50" };
  const Icon = conf.icon;
  const currentVal = pendingValue ?? param.value;

  return (
    <Card className="border-none shadow-premium bg-white rounded-[2rem] overflow-hidden hover:shadow-premium-hover transition-all duration-300">
      <CardContent className="p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl ${conf.color}`}>
                <Icon className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase font-outfit">
                  {t.has(`items.${param.key}.name`) ? t(`items.${param.key}.name`) : param.name}
                </h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  {t("paramId", { key: param.key })}
                </p>
              </div>
            </div>

            <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
              <Info className="h-4 w-4 text-primary opacity-40 shrink-0 mt-0.5" />
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                {t.has(`items.${param.key}.description`) ? t(`items.${param.key}.description`) : param.description}
              </p>
            </div>
          </div>

          <div className="w-full md:w-[400px] space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                {t("settingValue")}
              </label>
              <div className="relative group">
                {param.data_type === "boolean" ? (
                  <div className="h-14 flex items-center justify-between px-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                      {currentVal === "True" ? t("enabled") : t("disabled")}
                    </span>
                    <Switch checked={currentVal === "True"} onCheckedChange={(c) => onValueChange(param.key, c ? "True" : "False")} />
                  </div>
                ) : (
                  <Input type={param.data_type === "number" ? "number" : "text"} value={currentVal} onChange={(e) => onValueChange(param.key, e.target.value)} className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:border-primary/20 font-bold text-slate-900 transition-all text-lg shadow-sm" />
                )}
              </div>
            </div>

            <AnimatePresence>
              {pendingValue !== undefined && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}>
                  <Button className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20" onClick={() => onSave(param.key)} disabled={isUpdating}>
                    {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" />{t("commitChange")}</>}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
      <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <Badge variant="outline" className="bg-white text-[9px] font-black uppercase tracking-widest border-slate-200 px-2 py-0.5 rounded-md">
          {t("type", { type: t.has(`types.${param.data_type}`) ? t(`types.${param.data_type}`) : param.data_type })}
        </Badge>
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
          {t("synchronized", { date: new Date(param.updated_at).toLocaleDateString(locale === "ar" ? "ar-EG" : "en-US", { year: "numeric", month: "short", day: "numeric" }) })}
        </span>
      </div>
    </Card>
  );
}
