import React from "react";
import { Link } from "@/i18n/routing";
import { ArrowUpRight, FileText, Video, Users, Building2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function SidebarQuickLinks() {
  const t = useTranslations("Dashboard.admin.overview");

  const links = [
    { href: "/admin/users", icon: Users, bg: "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700", arrow: "text-slate-300 group-hover:text-emerald-700", title: "Team Management", sub: "Clearance & Registry" },
    { href: "/admin/organizations", icon: Building2, bg: "bg-teal-50 text-teal-700 group-hover:bg-teal-700", arrow: "text-slate-300 group-hover:text-teal-700", title: "Organization Registry", sub: "Mosques & Societies" },
    { href: "/admin/news", icon: FileText, bg: "bg-indigo-50 text-indigo-700 group-hover:bg-indigo-700", arrow: "text-slate-300 group-hover:text-indigo-700", title: t("newsCms"), sub: t("manageArticles") },
    { href: "/admin/videos", icon: Video, bg: "bg-amber-50 text-amber-700 group-hover:bg-amber-600", arrow: "text-slate-300 group-hover:text-amber-600", title: t("videoBriefings"), sub: t("pressUpdates") },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">{t("mediaManagement")}</h3>
        <p className="text-xs text-slate-400 font-medium">Fast portals for operational and communications staff</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="group p-4 rounded-[1.5rem] bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-emerald-500/40 transition-all flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center group-hover:text-white transition-all shadow-2xs shrink-0 ${link.bg}`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-bold text-sm text-slate-900 leading-tight">{link.title}</p>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mt-0.5">{link.sub}</p>
                </div>
              </div>
              <ArrowUpRight size={16} className={`transition-colors ${link.arrow}`} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
