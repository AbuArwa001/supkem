import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, Clock, Mail, Users, Shield, Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { SystemParameter, Role } from "./notificationsTypes";

interface NotificationParamCardProps {
  param: SystemParameter;
  roles: Role[];
  pendingValue?: string;
  isUpdating: boolean;
  onValueChange: (key: string, val: string) => void;
  onSave: (key: string) => void;
  toggleRole: (currentValue: string, roleName: string) => string;
}

export function NotificationParamCard(props: NotificationParamCardProps) {
  const { param, roles, pendingValue, isUpdating, onValueChange, onSave, toggleRole } = props;
  const t = useTranslations("Dashboard.admin.settings.notifications");
  const tParams = useTranslations("Dashboard.admin.settings.systemParams");
  const currentVal = pendingValue ?? param.value;

  return (
    <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden group hover:shadow-premium-hover transition-all duration-500">
      <CardContent className="p-8 md:p-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-outfit flex items-center gap-3">
                  {tParams.has(`items.${param.key}.name`) ? tParams(`items.${param.key}.name`) : param.name}
                </h3>
                {param.data_type === "boolean" && (
                  <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px] uppercase tracking-widest px-2 py-0">{t("globalBadge")}</Badge>
                )}
              </div>
              <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                {tParams.has(`items.${param.key}.description`) ? tParams(`items.${param.key}.description`) : param.description}
              </p>
            </div>

            <div className="flex items-center gap-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                {param.key.includes("days") ? <Clock className="h-4 w-4 text-amber-500" /> : param.key.includes("email") ? <Mail className="h-4 w-4 text-blue-500" /> : param.key.includes("roles") ? <Users className="h-4 w-4 text-indigo-500" /> : <Shield className="h-4 w-4 text-emerald-500" />}
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t("paramKey", { key: param.key })}</span>
            </div>
          </div>

          <div className="w-full lg:w-[360px] flex flex-col justify-center gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">{t("configValue")}</label>
              {param.data_type === "boolean" ? (
                <div className="h-16 flex items-center justify-between px-8 bg-slate-50 rounded-[1.25rem] border border-slate-100 shadow-sm">
                  <span className={cn("text-xs font-black uppercase tracking-widest", currentVal.toLowerCase() === "true" ? "text-emerald-600" : "text-slate-400")}>
                    {currentVal.toLowerCase() === "true" ? t("activeOn") : t("inactiveOff")}
                  </span>
                  <Switch checked={currentVal.toLowerCase() === "true"} onCheckedChange={(c) => onValueChange(param.key, c ? "true" : "false")} />
                </div>
              ) : param.data_type === "json" && param.key === "notify_roles" ? (
                <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 bg-slate-50 rounded-[1.25rem] border border-slate-100 no-scrollbar">
                  {roles?.map((role) => {
                    const isSelected = (() => { try { return JSON.parse(currentVal).includes(role.role_name); } catch { return false; } })();
                    return (
                      <button key={role.id} onClick={() => onValueChange(param.key, toggleRole(currentVal, role.role_name))} className={cn("w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-tight", isSelected ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white text-slate-500 hover:bg-slate-100")}>
                        {role.role_name} {isSelected && <Check className="h-3 w-3" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="relative">
                  <Input type={param.data_type === "number" ? "number" : "text"} value={currentVal} onChange={(e) => onValueChange(param.key, e.target.value)} className="h-16 px-8 rounded-[1.25rem] border-slate-100 bg-slate-50 focus:bg-white focus:border-primary/20 font-bold text-slate-900 transition-all text-lg shadow-sm" />
                  {param.data_type === "number" && <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest pointer-events-none">{t("units")}</div>}
                </div>
              )}
            </div>

            <AnimatePresence>
              {pendingValue !== undefined && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }}>
                  <Button className="w-full h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-amber-200" onClick={() => onSave(param.key)} disabled={isUpdating}>
                    {isUpdating ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Save className="h-5 w-5 mr-3" />{t("updateBtn")}</>}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
