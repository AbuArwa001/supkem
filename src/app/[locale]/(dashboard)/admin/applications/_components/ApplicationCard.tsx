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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ scale: 1.01 }}
      className="group relative p-6 md:p-8 rounded-[24px] glass hover:bg-white/90 border border-border/50 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 ease-out flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/[0.03] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
      
      <div className="flex items-center gap-8 w-full md:w-auto relative z-10">
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:from-primary group-hover:to-accent group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300">
          <div className="absolute inset-0 bg-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]" />
          <FileText size={28} className="relative z-10" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <h4 className="text-xl font-bold font-outfit text-primary group-hover:underline cursor-pointer">
              {application.display_id} - {application.service_name}
            </h4>
            <span
              className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] inline-flex items-center gap-1.5 border",
                application.status === "Approved"
                  ? "bg-green-50 text-green-700 border-green-100"
                  : application.status === "Rejected"
                    ? "bg-red-50 text-red-700 border-red-100"
                    : "bg-amber-50 text-amber-700 border-amber-100",
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
          <p className="text-sm font-semibold text-foreground/40 flex items-center gap-2">
            <span className="text-secondary font-bold underline underline-offset-4 decoration-2 decoration-secondary/30">
              {application.organization_name || t("type")}
            </span>
            • {t("submittedOn")}{" "}
            {application.submitted_at
              ? new Date(application.submitted_at).toLocaleDateString()
              : t("filters.PENDING")}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto md:border-l border-border/50 md:pl-8 relative z-10">
        <div className="hidden lg:block text-right pr-4">
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest leading-none mb-1">
            {t("lastAction")}
          </p>
          <p className="text-sm font-bold text-primary">{t("adminReview")}</p>
        </div>
        <Link
          href={`/admin/applications/${application.id}`}
          className="group/btn flex-1 md:flex-none px-6 py-3.5 bg-primary/5 text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
        >
          {t("reviewDetails")} <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </Link>
        <button className="p-3.5 bg-white/50 backdrop-blur-sm border border-border/50 rounded-2xl text-foreground/40 hover:text-primary hover:border-primary/30 hover:bg-white hover:shadow-md transition-all duration-300">
          <MoreVertical size={18} />
        </button>
      </div>
    </motion.div>
  );
}
