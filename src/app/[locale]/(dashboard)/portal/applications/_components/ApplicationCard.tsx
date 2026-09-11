"use client";

import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
  FileText, Building2, Calendar, ChevronRight,
  CheckCircle2, Clock, ShieldAlert, HelpCircle,
  CreditCard, Award, Mail,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Application } from "./types";
import { useTranslations } from "next-intl";

interface ApplicationCardProps {
  application: Application;
  view?: "grid" | "list";
  getStatusStyles: (status: string) => string;
  getStatusIcon: (status: string) => any;
  index: number;
  isSelected?: boolean;
  onToggleSelect?: (id: string | number) => void;
}

function getDocBadge(app: Application, t: any) {
  const svc = (app.service_name || "").toLowerCase();
  const isLetter = ["study", "hajj", "umrah", "travel", "visa", "employment", "marriage"].some(k => svc.includes(k));
  return isLetter
    ? { label: t("letter"), icon: Mail, cls: "bg-blue-50 text-blue-600 border-blue-100" }
    : { label: t("certificate"), icon: Award, cls: "bg-emerald-50 text-emerald-600 border-emerald-100" };
}

function PaymentBadge({ app, t }: { app: Application; t: any }) {
  const paid = app.payment?.status === "Completed";
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
      paid ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-700 border-amber-200"
    )}>
      <CreditCard size={10} />
      {paid ? t("paid") : t("pendingPayment")}
    </span>
  );
}

export function ApplicationCard({
  application,
  view = "grid",
  getStatusStyles,
  getStatusIcon,
  index,
  isSelected = false,
  onToggleSelect,
}: ApplicationCardProps) {
  const t = useTranslations("Dashboard.portal.applicationsPage");
  const StatusIcon = getStatusIcon(application.status);
  const docBadge = getDocBadge(application, t);
  const DocIcon = docBadge.icon;

  if (view === "grid") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.04, type: "spring", stiffness: 300, damping: 28 }}
        className="relative group h-full"
      >
        <div
          className={cn(
            "relative flex flex-col h-full bg-white rounded-[24px] border transition-all duration-300 overflow-hidden",
            isSelected
              ? "border-primary ring-2 ring-primary/25 shadow-lg"
              : "border-slate-100 shadow-[0_4px_24px_rgb(0,0,0,0.05)] hover:shadow-[0_16px_48px_rgb(0,0,0,0.10)] hover:-translate-y-1"
          )}
        >
          {/* Top accent bar */}
          <div className={cn(
            "h-1.5 w-full transition-opacity",
            isSelected
              ? "bg-primary opacity-100"
              : "bg-gradient-to-r from-primary via-emerald-500 to-primary/50 opacity-0 group-hover:opacity-100"
          )} />

          <div className="p-6 flex flex-col gap-4 flex-1">
            {/* Header with Checkbox and Status */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {onToggleSelect && (
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggleSelect(application.id)}
                    className="w-4 h-4 rounded text-primary focus:ring-primary/20 cursor-pointer accent-emerald-700"
                    title="Select application"
                  />
                )}
                <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 shrink-0">
                  <FileText size={20} />
                </div>
              </div>
              <span className={cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shrink-0",
                getStatusStyles(application.status)
              )}>
                <StatusIcon size={10} />
                {application.status}
              </span>
            </div>

            {/* Service name */}
            <div className="flex-1">
              <Link href={`/portal/applications/${application.id}`}>
                <h3 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors leading-snug hover:underline">
                  {application.service_name || "Application"}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className={cn("inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-widest border", docBadge.cls)}>
                  <DocIcon size={9} />
                  {docBadge.label}
                </span>
                <PaymentBadge app={application} t={t} />
              </div>
            </div>

            {/* Footer meta */}
            <div className="border-t border-slate-50 pt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Building2 size={13} />
                {application.organization_name || t("personalIndividual")}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Calendar size={13} />
                  {application.submitted_at
                    ? new Date(application.submitted_at).toLocaleDateString()
                    : "—"}
                </div>
                <span className="font-mono text-[10px] text-slate-300 bg-slate-50 px-2 py-0.5 rounded-lg border border-slate-100">
                  #{String(application.id).substring(0, 8).toUpperCase()}
                </span>
              </div>
            </div>
          </div>

          {/* CTA Link */}
          <div className="px-6 pb-6 mt-auto">
            <Link
              href={`/portal/applications/${application.id}`}
              className="flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 group-hover:bg-primary/10 border border-slate-100 group-hover:border-primary/20 text-slate-700 group-hover:text-primary font-bold text-xs sm:text-sm transition-all"
            >
              {t("viewDetails")} <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </motion.div>
    );
  }

  // LIST VIEW
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
        {/* Icon */}
        <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 text-slate-500 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300 shrink-0">
          <FileText size={22} />
        </div>

        {/* Main info */}
        <div className="flex-1 min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-base font-black text-slate-900 group-hover:text-primary transition-colors">
              {application.service_name || "Application"}
            </h3>
            <span className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest border",
              getStatusStyles(application.status)
            )}>
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
              {application.submitted_at
                ? new Date(application.submitted_at).toLocaleDateString()
                : "—"}
            </span>
            <span className="font-mono text-[10px] bg-slate-50 border border-slate-100 px-2 py-0.5 rounded-lg text-slate-400">
              #{String(application.id).substring(0, 8).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Arrow */}
        <div className="shrink-0 w-9 h-9 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary transition-all ml-auto">
          <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>
    </motion.div>
  );
}
