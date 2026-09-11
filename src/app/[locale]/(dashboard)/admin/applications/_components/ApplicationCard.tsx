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
      className="group relative p-6 rounded-[24px] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.08)] hover:border-slate-200 transition-all duration-300 ease-out flex flex-col justify-between h-full overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 -translate-y-12 translate-x-12 rounded-full group-hover:bg-primary/5 transition-colors" />

      <div className="relative z-10 flex flex-col gap-4 flex-1">
        <div className="flex items-start justify-between w-full">
          <div className="relative w-14 h-14 rounded-[20px] bg-slate-50 border border-slate-100 text-slate-600 flex items-center justify-center shrink-0 group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white group-hover:shadow-lg transition-all duration-300">
            <FileText size={24} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
          </div>
          <button className="p-2 bg-transparent text-slate-400 hover:text-slate-900 transition-all duration-300">
            <MoreVertical size={18} />
          </button>
        </div>

        <div className="space-y-1.5 flex-1">
          <span
            className={cn(
              "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] inline-flex items-center gap-1.5 border mb-2",
              application.status === "Approved"
                ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                : application.status === "Rejected"
                  ? "bg-rose-50 text-rose-700 border-rose-100"
                  : application.status === "Withdrawn"
                    ? "bg-slate-100 text-slate-600 border-slate-200"
                    : (application.status === "Pending" || application.status === "Submitted")
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-slate-100 text-slate-700 border-slate-200",
            )}
          >
            {application.status === "Approved" ? (
              <CheckCircle2 size={10} />
            ) : (application.status === "Rejected" || application.status === "Withdrawn") ? (
              <AlertCircle size={10} />
            ) : (
              <Clock size={10} />
            )}
            {application.status === "Submitted"
              ? (t("filters.PENDING") || "PENDING")
              : (t(`filters.${application.status.toUpperCase()}`) || application.status)}
          </span>
          <h4 className="text-xl font-bold font-outfit text-slate-900 leading-tight group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
            {application.display_id} {application.service_name ? `- ${application.service_name}` : ""}
          </h4>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest line-clamp-1">
            {application.organization_name || t("type")}
          </p>
        </div>
        
        <div className="py-4 border-t border-slate-100 mt-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
            {t("submittedOn")}
          </p>
          <p className="text-sm font-bold text-slate-700">
            {application.submitted_at
              ? new Date(application.submitted_at).toLocaleDateString()
              : t("filters.PENDING")}
          </p>
        </div>
      </div>

      <div className="relative z-10 w-full mt-2">
        <Link
          href={`/admin/applications/${application.id}`}
          className="group/btn w-full px-6 py-4 bg-slate-50 text-slate-600 rounded-[16px] font-bold text-sm hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
        >
          {t("reviewDetails")} <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
}
