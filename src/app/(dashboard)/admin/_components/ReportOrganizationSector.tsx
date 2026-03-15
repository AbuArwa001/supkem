"use client";

import { Building2, Users, FileText, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrganizationType {
  type: string;
  count: number;
}

interface ReportOrganizationSectorProps {
  organizationTypes: OrganizationType[];
}

export const ReportOrganizationSector = ({
  organizationTypes,
}: ReportOrganizationSectorProps) => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
          <Building2 className="text-emerald-500" size={20} /> Impact by
          Organization Sector
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {organizationTypes?.map((ot, i) => {
          const icons = [Building2, Users, FileText, Award];
          const colors = [
            "bg-indigo-50 text-indigo-600",
            "bg-emerald-50 text-emerald-600",
            "bg-amber-50 text-amber-600",
            "bg-blue-50 text-blue-600",
          ];
          const Icon = icons[i % icons.length];
          const color = colors[i % colors.length];
          return (
            <div
              key={i}
              className="p-6 bg-white border border-slate-100 rounded-[14px] hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform",
                  color,
                )}
              >
                <Icon size={24} />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                {ot.type}
              </p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-black text-slate-900">{ot.count}</p>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  +4%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
