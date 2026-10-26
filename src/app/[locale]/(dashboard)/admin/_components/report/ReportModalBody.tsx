import React from "react";
import { TrendingUp, Layers } from "lucide-react";
import { AreaChart, BarChart } from "../Charts";
import { ReportOrganizationSector } from "../ReportOrganizationSector";
import { useTranslations } from "next-intl";

interface ReportModalBodyProps {
  data: any;
}

export function ReportModalBody({ data }: ReportModalBodyProps) {
  const t = useTranslations("Dashboard.admin.report");

  return (
    <div id="report-content" className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
              <TrendingUp className="text-indigo-600" size={20} /> {t("growthTrend")}
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">
              {t("last30Days")}
            </span>
          </div>
          <div className="p-8 bg-slate-50 border border-slate-100 rounded-[16px]">
            <AreaChart data={data?.growth_trend || []} />
          </div>
          <p className="text-sm text-slate-500 font-medium leading-relaxed">
            {t.rich("growthAnalysis", {
              percentage: (chunks) => <span className="text-indigo-600 font-bold">{chunks} 18%</span>,
            })}
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold font-outfit text-slate-900 flex items-center gap-2">
              <Layers className="text-amber-500" size={20} /> {t("distribution")}
            </h3>
          </div>
          <div className="p-8 bg-slate-50 border border-slate-100 rounded-[16px]">
            <BarChart data={data?.status_distribution || []} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {data?.status_distribution?.map((s: any, i: number) => (
              <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.status}</p>
                <p className="text-2xl font-black text-slate-900">{s.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ReportOrganizationSector organizationTypes={data?.organization_types} />
    </div>
  );
}
