"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Users as UsersIcon,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  CheckCircle2,
  XCircle,
  Download,
  Trash2,
  X,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRow } from "./UserRow";
import { UserPagination } from "./UserPagination";
import { useTranslations } from "next-intl";
import type { UserItem } from "../_hooks/useUsersLogic";

interface UsersTableProps {
  users: UserItem[];
  totalCount: number;
  isLoading: boolean;
  page: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onView: (user: UserItem) => void;
  onEdit: (user: UserItem) => void;
  onDelete: (user: UserItem) => void;
  onToggleActive: (user: UserItem) => void;
  onResendVerification: (user: UserItem) => void;
  onSendPasswordReset: (user: UserItem) => void;
  searchQuery: string;
  sortField?: string;
  sortOrder?: "asc" | "desc";
  onSortChange?: (field: string) => void;
  selectedUserIds: (string | number)[];
  onToggleSelectUser: (id: string | number) => void;
  onSelectAll: (checked: boolean) => void;
  onBulkAction: (action: "activate" | "deactivate" | "delete") => void;
  onExportSelected: () => void;
}

export const UsersTable = ({
  users,
  totalCount,
  isLoading,
  page,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  onView,
  onEdit,
  onDelete,
  onToggleActive,
  onResendVerification,
  onSendPasswordReset,
  searchQuery,
  sortField,
  sortOrder,
  onSortChange,
  selectedUserIds,
  onToggleSelectUser,
  onSelectAll,
  onBulkAction,
  onExportSelected,
}: UsersTableProps) => {
  const t = useTranslations("Dashboard.admin.users.table");
  const tb = useTranslations("Dashboard.admin.users.bulk");

  const allSelected =
    users.length > 0 && users.every((u) => selectedUserIds.includes(u.id));
  const someSelected =
    selectedUserIds.length > 0 && !allSelected;

  const renderSortIcon = (field: string) => {
    if (!sortField || !sortOrder || sortField !== field) {
      return (
        <ArrowUpDown className="h-3 w-3 inline-block ml-1 opacity-40 group-hover:opacity-100 transition-opacity" />
      );
    }
    return sortOrder === "asc" ? (
      <ArrowUp className="h-3 w-3 inline-block ml-1 text-emerald-700" />
    ) : (
      <ArrowDown className="h-3 w-3 inline-block ml-1 text-emerald-700" />
    );
  };

  const getSortProps = (field: string) => ({
    onClick: () => onSortChange?.(field),
    className:
      "group cursor-pointer hover:text-slate-900 transition-colors flex items-center w-max select-none",
  });

  return (
    <Card className="border border-slate-100 shadow-sm bg-white rounded-[2.5rem] overflow-hidden relative">
      {/* Header */}
      <CardHeader className="border-b border-slate-100 p-7 md:p-8 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 uppercase font-outfit">
            Team <span className="text-emerald-700 italic">Directory</span>
          </CardTitle>
          <p className="text-[11px] text-slate-400 font-black mt-1 uppercase tracking-widest flex items-center gap-2">
            <UsersIcon className="h-3.5 w-3.5 text-emerald-600" />
            {t("verifiedMembers", { totalCount })}
          </p>
        </div>
      </CardHeader>

      {/* Floating Bulk Action Bar */}
      <AnimatePresence>
        {selectedUserIds.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-4 z-20 mx-6 -mb-14 p-3 bg-slate-900 text-white rounded-2xl shadow-2xl flex flex-wrap items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2 pl-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-200">
                {tb("selected", { count: selectedUserIds.length })}
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onBulkAction("activate")}
                className="h-8 rounded-xl text-emerald-400 hover:text-emerald-300 hover:bg-emerald-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {tb("activate")}
              </Button>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onBulkAction("deactivate")}
                className="h-8 rounded-xl text-amber-400 hover:text-amber-300 hover:bg-amber-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5"
              >
                <XCircle className="h-3.5 w-3.5" />
                {tb("suspend")}
              </Button>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={onExportSelected}
                className="h-8 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5"
              >
                <Download className="h-3.5 w-3.5" />
                {tb("export")}
              </Button>

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onBulkAction("delete")}
                className="h-8 rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-950 font-black text-[11px] uppercase tracking-wider flex items-center gap-1.5"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {tb("delete")}
              </Button>

              <div className="h-4 w-px bg-slate-700 mx-1" />

              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => onSelectAll(false)}
                title={tb("deselect")}
                className="h-8 w-8 p-0 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CardContent className="p-0">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-100 h-16">
                {/* Select All Checkbox */}
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

            <TableBody>
              {isLoading ? (
                [1, 2, 3, 4, 5].map((i) => (
                  <TableRow key={i} className="border-slate-100 h-20">
                    <TableCell colSpan={7} className="px-6">
                      <div className="flex items-center gap-4">
                        <Skeleton className="h-10 w-10 rounded-2xl" />
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-48 rounded-lg" />
                          <Skeleton className="h-3 w-32 rounded-lg" />
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    isSelected={selectedUserIds.includes(user.id)}
                    onToggleSelect={onToggleSelectUser}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onToggleActive={onToggleActive}
                    onResendVerification={onResendVerification}
                    onSendPasswordReset={onSendPasswordReset}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                        <UsersIcon className="h-12 w-12 text-slate-300" />
                      </div>
                      <p className="text-slate-400 font-black uppercase tracking-widest text-xs max-w-sm">
                        {searchQuery
                          ? t("noResults", { searchQuery })
                          : t("noUsersMatch")}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <UserPagination
          page={page}
          onPrev={onPrev}
          onNext={onNext}
          hasPrev={hasPrev}
          hasNext={hasNext}
          isLoading={isLoading}
        />
      </CardContent>
    </Card>
  );
};
