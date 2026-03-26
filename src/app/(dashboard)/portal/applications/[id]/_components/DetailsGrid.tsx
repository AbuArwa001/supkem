"use client";

import { motion } from "framer-motion";
import { FileText, Building2 } from "lucide-react";

interface DetailsGridProps {
  application: {
    id: string;
    service_name: string;
    organization_name?: string;
    user_name: string;
    submitted_at: string;
    updated_at: string;
  };
}

export const DetailsGrid = ({ application }: DetailsGridProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Service Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-8 bg-white border border-border/50 rounded-[16px] shadow-sm space-y-6"
      >
        <div className="flex items-center gap-4 border-b border-border/50 pb-6">
          <div className="w-12 h-12 bg-primary/5 text-primary rounded-2xl flex items-center justify-center shrink-0">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Requested Service
            </p>
            <h3 className="text-xl font-bold text-slate-800">
              {application.service_name}
            </h3>
          </div>
        </div>

        <div className="space-y-4 pt-2 text-sm text-slate-600 font-medium">
          <DetailItem label="Submission Date" value={new Date(application.submitted_at).toLocaleDateString()} />
          <DetailItem label="Last Updated" value={new Date(application.updated_at).toLocaleDateString()} />
          <DetailItem label="Application ID" value={application.id} isMono />
        </div>
      </motion.div>

      {/* Entity Details */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-8 bg-white border border-border/50 rounded-[16px] shadow-sm space-y-6"
      >
        <div className="flex items-center gap-4 border-b border-border/50 pb-6">
          <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center shrink-0">
            <Building2 size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Entity Details
            </p>
            <h3 className="text-xl font-bold text-slate-800">
              {application.organization_name || "Personal/Individual Application"}
            </h3>
          </div>
        </div>

        <div className="space-y-4 pt-2 text-sm text-slate-600 font-medium">
          <DetailItem label="Applicant Name" value={application.user_name} />
        </div>
      </motion.div>
    </div>
  );
};

const DetailItem = ({ label, value, isMono = false }: { label: string; value: string; isMono?: boolean }) => (
  <div className="flex justify-between items-center py-2 border-b border-dashed border-border/50">
    <span className="text-slate-400">{label}</span>
    <span className={isMono ? "text-slate-800 font-mono text-xs" : "text-slate-800 font-bold"}>
      {value}
    </span>
  </div>
);
