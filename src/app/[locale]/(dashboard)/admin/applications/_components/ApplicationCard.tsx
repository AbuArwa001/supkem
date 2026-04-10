"use client";

// React/Next.js core
import Link from "next/link";

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
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      className="group p-6 rounded-[16px] bg-white border border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all flex flex-col md:flex-row items-center justify-between gap-8"
    >
      <div className="flex items-center gap-8 w-full md:w-auto">
        <div className="w-16 h-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
          <FileText size={28} />
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
              {application.status}
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground/40 flex items-center gap-2">
            <span className="text-secondary font-bold underline underline-offset-4 decoration-2 decoration-secondary/30">
              {application.organization_name || "Individual Application"}
            </span>
            • Submitted on{" "}
            {application.submitted_at
              ? new Date(application.submitted_at).toLocaleDateString()
              : "Pending"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto md:border-l border-border/50 md:pl-8">
        <div className="hidden lg:block text-right pr-4">
          <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest leading-none mb-1">
            Last Action
          </p>
          <p className="text-sm font-bold text-primary">Admin Review</p>
        </div>
        <Link
          href={`/admin/applications/${application.id}`}
          className="flex-1 md:flex-none px-6 py-3 bg-primary/[0.03] text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
        >
          Review Details <ChevronRight size={16} />
        </Link>
        <button className="p-3 bg-white border border-border rounded-xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
          <MoreVertical size={18} />
        </button>
      </div>
    </motion.div>
  );
}
