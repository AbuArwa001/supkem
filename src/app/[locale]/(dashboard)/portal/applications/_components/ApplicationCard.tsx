import { Link } from "@/i18n/routing";
import { FileText, Building2, Calendar, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Application } from "./types";

interface ApplicationCardProps {
  application: Application;
  getStatusStyles: (status: string) => string;
  getStatusIcon: (status: string) => any;
}

export function ApplicationCard({ 
  application, 
  getStatusStyles, 
  getStatusIcon 
}: ApplicationCardProps) {
  const StatusIcon = getStatusIcon(application.status);

  return (
    <Link
      href={`/portal/applications/${application.id}`}
      className="flex flex-col md:flex-row items-start md:items-center gap-6 p-6 md:p-8 hover:bg-slate-50/50 transition-colors group relative"
    >
      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary shrink-0 shadow-inner border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all">
        <FileText size={28} />
      </div>

      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-black text-slate-800 tracking-tight group-hover:text-primary transition-colors">
            {application.service_name || "Halal Certification"}
          </h3>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
              (!application.payment || application.payment.status !== "Completed")
                ? "bg-amber-100 text-amber-700 border-amber-200"
                : getStatusStyles(application.status),
            )}
          >
            {(!application.payment || application.payment.status !== "Completed") ? (
              <>Pending Payment</>
            ) : (
              <><StatusIcon size={14} />{application.status}</>
            )}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-slate-500">
          <div className="flex items-center gap-1.5">
            <Building2 size={16} className="text-slate-400" />
            {application.organization_name || "Personal/Individual"}
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={16} className="text-slate-400" />
            Submitted{" "}
            {application.submitted_at
              ? new Date(application.submitted_at).toLocaleDateString()
              : "N/A"}
          </div>
          {application.id && (
            <div className="flex items-center gap-1.5 font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-600">
              Ref: #{String(application.id).substring(0, 8).toUpperCase()}
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 md:ml-auto w-full md:w-auto flex justify-end">
        <div className="w-10 h-10 rounded-full bg-white border border-border/80 flex items-center justify-center text-slate-400 group-hover:border-primary/30 group-hover:text-primary group-hover:bg-primary/5 transition-all shadow-sm">
          <ChevronRight
            size={20}
            className="group-hover:translate-x-0.5 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
