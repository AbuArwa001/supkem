"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";

interface UserSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const UserSearch = ({ value, onChange }: UserSearchProps) => {
  const t = useTranslations("Dashboard.admin.users");

  return (
    <div className="relative group">
      <Search className="absolute ltr:left-6 rtl:right-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-rose-600 transition-colors" />
      <Input
        placeholder={t("searchPlaceholder")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="ltr:pl-14 rtl:pr-14 h-16 rounded-[1.5rem] border-none bg-white shadow-premium focus:ring-4 focus:ring-rose-500/5 transition-all text-lg font-bold placeholder:text-slate-300"
      />
    </div>
  );
};

