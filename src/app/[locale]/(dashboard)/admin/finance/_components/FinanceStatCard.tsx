import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface FinanceStatCardProps {
  title: string;
  icon: React.ReactNode;
  iconBg: string;
  gradientClass: string;
  borderClass: string;
  titleColor: string;
  isLoading: boolean;
  value: React.ReactNode;
  footer: React.ReactNode;
}

export function FinanceStatCard({
  title,
  icon,
  iconBg,
  gradientClass,
  borderClass,
  titleColor,
  isLoading,
  value,
  footer,
}: FinanceStatCardProps) {
  return (
    <Card className={`border-none shadow-premium rounded-[2rem] bg-linear-to-br ${gradientClass} overflow-hidden relative border ${borderClass}`}>
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-black uppercase tracking-wider ${titleColor}`}>
            {title}
          </span>
          <div className={`p-2.5 rounded-2xl text-white shadow-md ${iconBg}`}>
            {icon}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        {isLoading ? (
          <Skeleton className="h-10 w-36 rounded-xl" />
        ) : (
          <>
            <div className="text-2xl sm:text-3xl font-black font-outfit text-slate-900 tracking-tight">
              {value}
            </div>
            {footer}
          </>
        )}
      </CardContent>
    </Card>
  );
}
