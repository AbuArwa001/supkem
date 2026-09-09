"use client";

// React/Next.js core
import { Link } from "@/i18n/routing";

// External libraries
import { motion } from "framer-motion";
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  MoreVertical,
} from "lucide-react";

// Internal components
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

// Types
import { Application } from "@/app/[locale]/(dashboard)/admin/applications/_types";

interface ApplicationCardProps {
  application: Application;
  index: number;
}

export default function ApplicationCard({
  application,
  index,
}: ApplicationCardProps) {
  const t = useTranslations("Dashboard.admin.applications");

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ y: -2 }}
      className="group relative p-6 md:p-8 rounded-[24px] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:border-slate-200 transition-all duration-300 ease-out flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div className="flex items-center gap-8 w-full md:w-auto relative z-10">
        <div className="relative w-16 h-16 rounded-full bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white group-hover:shadow-lg transition-all duration-300">
          <FileText size={26} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-3">
            <h4 className="text-[22px] font-bold font-outfit text-slate-900 group-hover:text-primary transition-colors cursor-pointer">
              {application.display_id}{application.service_name ? ` - ${application.service_name}` : ""}
            </h4>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-1.5 border",
                application.status === "Approved"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                  : application.status === "Rejected"
                    ? "bg-rose-50 text-rose-700 border-rose-100"
                    : "bg-slate-100 text-slate-700 border-slate-200",
              )}
            >
              {application.status === "Approved" ? (
                <CheckCircle2 size={10} />
              ) : application.status === "Rejected" ? (
                <AlertCircle size={10} />
              ) : (
                <Clock size={10} />
              )}
              {t(`filters.${application.status.toUpperCase()}`) || application.status}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <span className="text-slate-900 font-bold">
              {application.organization_name || t("type")}
            </span>
            • {t("submittedOn")}{" "}
            {application.submitted_at
              ? new Date(application.submitted_at).toLocaleDateString()
              : t("filters.PENDING")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto md:border-l border-slate-100 md:pl-8 relative z-10">
        <div className="hidden lg:block text-right pr-4">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
            {t("lastAction")}
          </p>
          <p className="text-sm font-bold text-slate-800">{t("adminReview")}</p>
        </div>
        <Link
          href={`/admin/applications/${application.id}`}
          className="group/btn flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-[16px] font-bold text-sm hover:bg-primary hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {t("reviewDetails")} <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
        <button className="p-3 bg-white border border-slate-200 rounded-[16px] text-slate-400 hover:text-slate-900 hover:border-slate-300 hover:bg-slate-50 transition-all duration-300">
          <MoreVertical size={18} />
        </button>
      </div>
    </motion.div>
  );
}
