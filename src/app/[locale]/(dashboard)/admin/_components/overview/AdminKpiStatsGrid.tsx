import React from "react";
import { Building2, Users, FileText, Award } from "lucide-react";
import { StatCard } from "../StatCard";

interface StatItem {
  label: string;
  value: string | number;
  change?: string;
  changeType?: "increase" | "decrease" | "neutral";
  description?: string;
  trend?: "up" | "down" | "neutral";
}

interface AdminKpiStatsGridProps {
  stats: StatItem[];
}

export function AdminKpiStatsGrid({ stats }: AdminKpiStatsGridProps) {
  const getIcon = (label: string) => {
    switch (label) {
      case "Organizations": return Building2;
      case "Total Users": return Users;
      case "Applications": return FileText;
      default: return Award;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {stats.map((s, i) => (
        <StatCard key={i} icon={getIcon(s.label)} {...s} delay={i * 0.08} />
      ))}
    </div>
  );
}
