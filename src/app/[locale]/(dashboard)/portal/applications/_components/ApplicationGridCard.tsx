"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { FileText, Building2, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Application } from "./types";
import { useTranslations } from "next-intl";
import { getDocBadge, PaymentBadge } from "./ApplicationBadges";

interface ApplicationGridCardProps {
  application: Application;
  getStatusStyles: (status: string) => string;
  getStatusIcon: (status: string) => any;
  index: number;
  isSelected?: boolean;
  onToggleSelect?: (id: string | number) => void;
}

export function ApplicationGridCard({
  application,
  getStatusStyles,
  getStatusIcon,
  index,
  isSelected = false,
  onToggleSelect,
}: ApplicationGridCardProps) {
  const t = useTranslations("Dashboard.portal.applicationsPage");
  const StatusIcon = getStatusIcon(application.status);
  const docBadge = getDocBadge(application, t);
  const DocIcon = docBadge.icon;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 28 }} className="relative group h-full">
      <div className={cn("relative flex flex-col h-full bg-white rounded-[24px] border transition-all duration-300 overflow-hidden", isSelected ? "border-primary ring-2 ring-primary/25 shadow-lg" : "border-slate-100 shadow-[0_4px_24px_rgb(0,0,0,0.05)] hover:shadow-[0_16px_48px_rgb(0,0,0,0.10)] hover:-translate-y-1")}>
        <div className={cn("h-1.5 w-full transition-opacity", isSelected ? "bg-primary opacity-100" : "bg-gradient-to-r from-primary via-emerald-500 to-primary/50 opacity-0 group-hover:opacity-100")} />

        <div className="p-6 flex flex-col gap-4 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              {onToggleSelect && (
                <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(application.id)} className="w-4 h-4 rounded text-primary focus:ring-primary/20 cursor-pointer accent-emerald-700" title="Select application" />
              )}
              <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 shrink-0">
                <FileText size={20} />
              </div>
            </div>
            <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0", getStatusStyles(application.status))}>
              <StatusIcon size={10} /> {application.status}
            </span>
          </div>

          <div className="flex-1">
            <Link href={`/portal/applications/${application.id}`}>
              <h3 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors leading-snug hover:underline">
                {application.service_name || "Application"}
              </h3>
            </Link>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border", docBadge.cls)}>
                <DocIcon size={9} /> {docBadge.label}
              </span>
              <PaymentBadge app={application} t={t} />
            </div>
          </div>

          <div className="border-t border-slate-50 pt-4 space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
              <Building2 size={13} /> {application.organization_name || t("personalIndividual")}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Calendar size={13} /> {application.submitted_at ? new Date(application.submitted_at).toLocaleDateString() : "—"}
              </div>
              <span className="font-mono text-[10px] text-slate-300 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                #{String(application.id).substring(0, 8).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 mt-auto">
          <Link href={`/portal/applications/${application.id}`} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 group-hover:bg-primary/10 border border-slate-100 group-hover:border-primary/20 text-slate-700 group-hover:text-primary font-bold text-xs sm:text-sm transition-all">
            {t("viewDetails")} <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
