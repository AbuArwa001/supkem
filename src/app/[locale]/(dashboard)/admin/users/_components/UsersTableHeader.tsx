"use client";

import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useTranslations } from "next-intl";

interface UsersTableHeaderProps {
  allSelected: boolean;
  someSelected: boolean;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSelectAll: (checked: boolean) => void;
  onSortChange?: (field: string) => void;
}

export function UsersTableHeader({
  allSelected,
  someSelected,
  sortField,
  sortOrder,
  onSelectAll,
  onSortChange,
}: UsersTableHeaderProps) {
  const t = useTranslations("Dashboard.admin.users.table");

  const renderSortIcon = (field: string) => {
    if (!sortField || !sortOrder || sortField !== field) {
      return <ArrowUpDown className="h-3 w-3 inline-block ml-1 opacity-40 group-hover:opacity-100 transition-opacity" />;
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="h-3 w-3 inline-block ml-1 text-emerald-700" />
    ) : (
      <ArrowDown className="h-3 w-3 inline-block ml-1 text-emerald-700" />
    );
  };

  const getSortProps = (field: string) => ({
    onClick: () => onSortChange?.(field),
    className: "group cursor-pointer hover:text-slate-900 transition-colors flex items-center w-max select-none",
  });

  return (
    <TableHeader>
      <TableRow className="hover:bg-transparent border-slate-100 h-16">
        <TableHead className="ltr:pl-6 rtl:pr-6 w-12 text-center">
          <input
            type="checkbox"
            checked={allSelected}
            ref={(el) => {
              if (el) el.indeterminate = someSelected;
            }}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="h-4 w-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600"
          />
        </TableHead>

        <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 px-4 text-start">
          <div {...getSortProps("full_name")}>
            {t("memberDetails")} {renderSortIcon("full_name")}
          </div>
        </TableHead>

        <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-start hidden md:table-cell">
          <div {...getSortProps("role__role_name")}>
            {t("systemRole")} {renderSortIcon("role__role_name")}
          </div>
        </TableHead>

        <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-start hidden lg:table-cell">
          <div {...getSortProps("location")}>
            {t("location")} {renderSortIcon("location")}
          </div>
        </TableHead>

        <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-start hidden lg:table-cell">
          <div {...getSortProps("created_at")}>
            {t("dateJoined")} {renderSortIcon("created_at")}
          </div>
        </TableHead>

        <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-start hidden sm:table-cell">
          <div {...getSortProps("is_active")}>
            {t("status")} {renderSortIcon("is_active")}
          </div>
        </TableHead>

        <TableHead className="text-end ltr:pr-6 rtl:pl-6 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
          {t("actions")}
        </TableHead>
      </TableRow>
    </TableHeader>
  );
}
