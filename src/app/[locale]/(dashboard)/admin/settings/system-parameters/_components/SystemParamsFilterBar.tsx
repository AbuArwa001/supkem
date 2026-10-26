import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { CATEGORY_CONFIG, ParameterCategory } from "./systemParamTypes";

interface SystemParamsFilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export function SystemParamsFilterBar({
  search, setSearch, selectedCategory, setSelectedCategory,
}: SystemParamsFilterBarProps) {
  const t = useTranslations("Dashboard.admin.settings.systemParams");

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input
          placeholder={t("searchPlaceholder")}
          className="h-12 pl-11 rtl:pl-4 rtl:pr-11 rounded-2xl border-none shadow-sm bg-white font-medium"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex gap-2 p-1 bg-white rounded-2xl shadow-sm overflow-x-auto no-scrollbar">
        <Button
          variant={selectedCategory === "all" ? "default" : "ghost"}
          onClick={() => setSelectedCategory("all")}
          className={`rounded-xl px-4 h-10 font-bold text-xs uppercase tracking-widest ${
            selectedCategory === "all" ? "bg-primary hover:bg-primary/90" : ""
          }`}
        >
          {t("allCategories")}
        </Button>
        {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
          <Button
            key={key}
            variant={selectedCategory === key ? "default" : "ghost"}
            onClick={() => setSelectedCategory(key as ParameterCategory)}
            className={`rounded-xl px-4 h-10 font-bold text-xs uppercase tracking-widest ${
              selectedCategory === key ? "bg-primary hover:bg-primary/90" : ""
            }`}
          >
            <config.icon className="h-3 w-3 mr-2 rtl:mr-0 rtl:ml-2" />
            {t.has(key) ? t(key) : config.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
