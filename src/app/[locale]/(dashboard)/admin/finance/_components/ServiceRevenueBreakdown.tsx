import React from "react";
import { Layers, Receipt } from "lucide-react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useTranslations } from "next-intl";
import { ServiceRevenueItem } from "./financeTypes";

interface ServiceRevenueBreakdownProps {
  servicesData?: ServiceRevenueItem[];
  totalCollected: number;
  isLoading: boolean;
}

export function ServiceRevenueBreakdown({
  servicesData,
  totalCollected,
  isLoading,
}: ServiceRevenueBreakdownProps) {
  const t = useTranslations("Dashboard.admin.finance");

  return (
    <Card className="lg:col-span-2 border-none shadow-premium bg-white rounded-[2.5rem] p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <CardTitle className="text-xl font-black font-outfit text-slate-900 uppercase tracking-tight flex items-center gap-2.5">
            <Layers className="h-5 w-5 text-primary" />
            {t("revenueByCategory")}
          </CardTitle>
          <CardDescription className="text-slate-400 font-medium text-xs mt-1">
            {t("revenueByCategoryDesc")}
          </CardDescription>
        </div>
        <Badge className="bg-primary/10 text-primary border-none font-bold text-xs uppercase px-3 py-1">
          {t("activePortfolio")}
        </Badge>
      </div>

      <div className="space-y-4 pt-2">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-48 rounded-lg" />
              <Skeleton className="h-3 w-full rounded-full" />
            </div>
          ))
        ) : servicesData && servicesData.length > 0 ? (
          servicesData.map((item, idx) => {
            const percent = totalCollected > 0 ? (item.total_amount / totalCollected) * 100 : 0;
            return (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="space-y-0.5">
                    <span className="text-sm font-black text-slate-800 uppercase tracking-tight">
                      {item.service_name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-primary uppercase">{item.category}</span>
                      <span className="text-[11px] text-slate-400 font-medium">
                        • {item.count} {item.count === 1 ? t("payment") : t("payments")}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-slate-900 font-outfit">
                      KES {Number(item.total_amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {percent.toFixed(1)}{t("ofTotal")}
                    </p>
                  </div>
                </div>
                <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-linear-to-r from-primary to-teal-500 transition-all duration-700" style={{ width: `${Math.max(percent, 2)}%` }} />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 text-slate-400">
            <Receipt className="h-10 w-10 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-sm">{t("noServiceCollections")}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
