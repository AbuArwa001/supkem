"use client";

import { Search } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";

export function DashboardSearch() {
  const [query, setQuery] = useState("");
  const tc = useTranslations("Dashboard.common");

  return (
    <div className="relative group w-full max-w-md hidden md:block">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-[#0b4a2d] transition-colors" />
      </div>
      <input
        type="text"
        placeholder={tc("search")}
        className="block w-full pl-11 pr-4 py-2.5 border border-slate-200/60 rounded-full leading-5 bg-white backdrop-blur-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-[#0b4a2d]/10 focus:border-[#0b4a2d] focus:bg-white transition-all sm:text-sm shadow-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}
