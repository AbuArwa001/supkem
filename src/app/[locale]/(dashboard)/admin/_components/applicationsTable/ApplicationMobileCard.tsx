import React from "react";
import { Link } from "@/i18n/routing";
import { FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApplicationItem } from "./applicationsTableTypes";

interface ApplicationMobileCardProps {
  app: ApplicationItem;
  statusLabel: string;
  initials: string;
}

export function ApplicationMobileCard({ app, statusLabel, initials }: ApplicationMobileCardProps) {
  return (
    <div className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors space-y-3">
      <div className="flex items-center justify-between gap-2">
        <Link
          href={`/admin/applications/${app.id}`}
          className="font-black text-sm text-slate-900 hover:text-emerald-700 transition-colors font-mono tracking-tight"
        >
          {app.display_id}
        </Link>
        <span
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 border shadow-2xs shrink-0",
            app.status === "Approved"
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : app.status === "Rejected"
              ? "bg-rose-50 text-rose-700 border-rose-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              app.status === "Approved"
                ? "bg-emerald-500"
                : app.status === "Rejected"
                ? "bg-rose-500"
                : "bg-amber-500 animate-pulse"
            )}
          />
          {statusLabel}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 border border-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0">
          {initials}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-sm text-slate-900 truncate">{app.organization_name}</p>
          <p className="text-xs font-semibold text-slate-400 truncate flex items-center gap-1 mt-0.5">
            <FileText size={12} className="shrink-0 text-slate-300" />
            {app.service_name}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-50 text-xs">
        <span className="font-semibold text-slate-400">
          {new Date(app.submitted_at).toLocaleDateString()}
        </span>
        <Link
          href={`/admin/applications/${app.id}`}
          className="font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
        >
          Review
          <ChevronRight size={14} />
        </Link>
      </div>
    </div>
  );
}
