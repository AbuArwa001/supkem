"use client";

import { ChevronLeft, RefreshCw, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface UserHeaderProps {
  onRefresh: () => void;
  isValidating: boolean;
  onAddClick: () => void;
}

export const UserHeader = ({
  onRefresh,
  isValidating,
  onAddClick,
}: UserHeaderProps) => {
  const t = useTranslations("Dashboard.admin.users");

  return (
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/settings"
          className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-primary self-start mt-2"
        >
          <ChevronLeft size={24} className="rtl:rotate-180" />
        </Link>
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 font-outfit leading-tight uppercase">
            Team <span className="text-rose-600 italic">Management</span>
          </h2>
          <p className="text-slate-500 font-semibold mt-2 text-lg">
            {t("desc")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={onRefresh}
          className="rounded-2xl border-slate-200 h-12 w-12 hover:bg-slate-50 shadow-sm transition-all flex-none"
        >
          <RefreshCw
            className={`h-5 w-5 text-slate-600 ${isValidating ? "animate-spin" : ""}`}
          />
        </Button>

        <Button
          onClick={onAddClick}
          className="rounded-2xl font-black bg-rose-600 hover:bg-rose-700 h-12 px-6 md:px-8 shadow-xl shadow-rose-600/20 transition-all active:scale-95 flex items-center gap-3 text-white uppercase tracking-widest text-xs"
        >
          <Plus className="h-5 w-5" /> {t("addUser")}
        </Button>
      </div>
    </header>
  );
};

