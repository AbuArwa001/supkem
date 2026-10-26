import React from "react";
import { Link } from "@/i18n/routing";
import { Users, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export function UserManagementCard() {
  const t = useTranslations("Dashboard.admin.settings.hub");

  return (
    <Link href="/admin/users">
      <Card className="border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-slate-900 rounded-[32px] p-8 md:p-10 hover:shadow-[0_20px_50px_rgb(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-500 group border border-slate-800 h-full relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-rose-500/30 transition-colors duration-500" />
        <div className="flex flex-col h-full relative z-10">
          <div className="bg-rose-500/20 p-5 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500 border border-rose-500/30">
            <Users className="h-8 w-8 text-rose-300" />
          </div>
          <h3 className="text-3xl font-black text-white mt-8 font-outfit tracking-tight">{t("teamManagementTitle")}</h3>
          <p className="text-slate-400 font-medium text-base mt-4 flex-grow leading-relaxed">
            {t("teamManagementDesc")}
          </p>
          <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-rose-400 font-black text-[11px] uppercase tracking-widest">
            <span>{t("manageRegistry")}</span>
            <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
          </div>
        </div>
      </Card>
    </Link>
  );
}
