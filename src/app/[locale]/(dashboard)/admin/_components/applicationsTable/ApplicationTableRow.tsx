import React from "react";
import { Link } from "@/i18n/routing";
import { FileText, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ApplicationItem } from "./applicationsTableTypes";

interface ApplicationTableRowProps {
  app: ApplicationItem;
  statusLabel: string;
  initials: string;
}

export function ApplicationTableRow({ app, statusLabel, initials }: ApplicationTableRowProps) {
  return (
    <tr className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
      <td className="px-6 md:px-7 py-5">
        <Link
          href={`/admin/applications/${app.id}`}
          className="font-black text-sm text-slate-900 group-hover:text-emerald-700 transition-colors font-mono tracking-tight"
        >
          {app.display_id}
        </Link>
      </td>
      <td className="px-6 md:px-7 py-5">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-linear-to-br from-slate-100 to-slate-200 border border-slate-200 text-slate-700 text-xs font-black flex items-center justify-center shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="font-bold text-sm text-slate-900 truncate group-hover:text-emerald-800 transition-colors">
              {app.organization_name}
            </p>
            <p className="text-[11px] font-semibold text-slate-400 truncate flex items-center gap-1 mt-0.5">
              <FileText size={12} className="shrink-0 text-slate-300" />
              {app.service_name}
            </p>
          </div>
        </div>
      </td>
      <td className="px-6 md:px-7 py-5">
        <span
          className={cn(
            "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider inline-flex items-center gap-1.5 border shadow-2xs",
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
      </td>
      <td className="px-6 md:px-7 py-5 text-right">
        <div className="flex items-center justify-end gap-3">
          <span className="text-xs font-semibold text-slate-400">
            {new Date(app.submitted_at).toLocaleDateString()}
          </span>
          <Link
            href={`/admin/applications/${app.id}`}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-400 transition-colors"
            title="Review Application"
          >
            <ChevronRight size={16} />
          </Link>
        </div>
      </td>
    </tr>
  );
}
