"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { FileText, Building2, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Application } from "./types";
import { useTranslations } from "next-intl";
import { getDocBadge, PaymentBadge } from "./ApplicationBadges";

interface ApplicationListCardProps {
  application: Application;
  getStatusStyles: (status: string) => string;
  getStatusIcon: (status: string) => any;
  index: number;
}

export function ApplicationListCard({
  application,
  getStatusStyles,
  getStatusIcon,
  index,
}: ApplicationListCardProps) {
  const t = useTranslations("Dashboard.portal.applicationsPage");
  const StatusIcon = getStatusIcon(application.status);
  const docBadge = getDocBadge(application, t);
  const DocIcon = docBadge.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 28 }}
    >
      <Link
        href={`/portal/applications/${application.id}`}
        className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 md:p-6 bg-white rounded-[20px] border border-slate-100 shadow-[0_2px_12px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_32px_rgb(0,0,0,0.08)] hover:border-primary/20 transition-all duration-300"
      >
        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 shrink-0">
          <FileText size={22} />
        </div>

        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-black text-slate-900 group-hover:text-primary transition-colors">
              {application.service_name || "Application"}
            </h3>
            <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border", getStatusStyles(application.status))}>
              <StatusIcon size={10} />
              {application.status}
            </span>
            <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border", docBadge.cls)}>
              <DocIcon size={9} />
              {docBadge.label}
            </span>
            <PaymentBadge app={application} t={t} />
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-400">
            <span className="flex items-center gap-1.5">
              <Building2 size={12} />
              {application.organization_name || t("personalIndividual")}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={12} />
              {application.submitted_at ? new Date(application.submitted_at).toLocaleDateString() : "—"}
            </span>
            <span className="font-mono text-[10px] bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg text-slate-400">
              #{String(application.id).substring(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="shrink-0 w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary transition-all ml-auto">
          <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
