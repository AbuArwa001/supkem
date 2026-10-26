"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export type QuickTab = "all" | "active" | "pending" | "staff";

interface UserQuickTabsProps {
  quickTab: QuickTab;
  onQuickTabChange: (tab: QuickTab) => void;
  onExportCsv: () => void;
}

export function UserQuickTabs({ quickTab, onQuickTabChange, onExportCsv }: UserQuickTabsProps) {
  const t = useTranslations("Dashboard.admin.users");

  const tabs: { key: QuickTab; label: string }[] = [
    { key: "all", label: t("filters.all") },
    { key: "active", label: t("filters.active") },
    { key: "pending", label: t("filters.pending") },
    { key: "staff", label: t("filters.staff") },
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-200/60 rounded-2xl overflow-x-auto max-w-full no-scrollbar">
        {tabs.map((tab) => {
          const isActive = quickTab === tab.key;
          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onQuickTabChange(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                isActive ? "bg-white text-slate-900 shadow-sm font-extrabold" : "text-slate-500 hover:text-slate-900 hover:bg-white/50"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onExportCsv}
        className="rounded-2xl border-slate-200 hover:bg-slate-50 font-black text-xs uppercase tracking-widest h-11 px-5 flex items-center gap-2 text-slate-700 shadow-sm"
      >
        <Download className="h-4 w-4 text-slate-500" />
        {t("exportCsv")}
      </Button>
    </div>
  );
}
