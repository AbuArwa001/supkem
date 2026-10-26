import React from "react";
import { motion } from "framer-motion";
import { Cpu, ArrowUpRight, Users, Shield, Plug, Activity, Sliders, Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface ITQuickActionsGridProps {
  totalUsers: number;
  totalParams: number;
}

export function ITQuickActionsGrid({ totalUsers, totalParams }: ITQuickActionsGridProps) {
  const t = useTranslations("Dashboard.admin.it");

  const quickActions = [
    { title: t("usersTitle"), desc: t("usersDesc"), href: "/admin/users", icon: Users, badge: t("usersBadge", { count: totalUsers }), color: "from-blue-600 to-indigo-600", lightBg: "bg-blue-50 text-blue-700 border-blue-200" },
    { title: t("rbacTitle"), desc: t("rbacDesc"), href: "/admin/settings/access-control", icon: Shield, badge: t("rbacBadge"), color: "from-emerald-600 to-teal-600", lightBg: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    { title: t("apiTitle"), desc: t("apiDesc"), href: "/admin/settings/integrations", icon: Plug, badge: t("apiBadge"), color: "from-amber-600 to-orange-600", lightBg: "bg-amber-50 text-amber-700 border-amber-200" },
    { title: t("auditTitle"), desc: t("auditDesc"), href: "/admin/settings/audit", icon: Activity, badge: t("auditBadge"), color: "from-purple-600 to-violet-600", lightBg: "bg-purple-50 text-purple-700 border-purple-200" },
    { title: t("paramsTitle"), desc: t("paramsDesc"), href: "/admin/settings/system-parameters", icon: Sliders, badge: t("paramsBadge", { count: totalParams }), color: "from-slate-700 to-slate-900", lightBg: "bg-slate-100 text-slate-700 border-slate-200" },
    { title: t("orgTitle"), desc: t("orgDesc"), href: "/admin/organizations", icon: Building2, badge: t("orgBadge"), color: "from-teal-600 to-cyan-600", lightBg: "bg-teal-50 text-teal-700 border-teal-200" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold font-outfit text-slate-900 tracking-tight flex items-center gap-2">
          <Cpu className="text-primary h-5 w-5" />
          {t("itOpsHub")}
        </h2>
        <span className="text-xs text-slate-400 font-medium">{t("directShortcuts")}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.div key={action.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: idx * 0.05 }}>
              <Link href={action.href} className="block group h-full">
                <div className="h-full bg-white rounded-3xl p-6 border border-slate-100 shadow-xs hover:shadow-md transition-all duration-300 hover:border-slate-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-2xl bg-linear-to-tr ${action.color} text-white shadow-xs`}>
                        <Icon size={22} />
                      </div>
                      <Badge variant="outline" className={`${action.lightBg} font-bold text-[11px] px-2.5 py-0.5`}>
                        {action.badge}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-primary transition-colors mb-1.5 flex items-center gap-1.5">
                      {action.title}
                      <ArrowUpRight size={15} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{action.desc}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-600 group-hover:text-primary transition-colors">
                    <span>{t("launchModule")}</span>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
