"use client";

import { Users as UsersIcon } from "lucide-react";
import { Table } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPagination } from "./UserPagination";
import { UserBulkActionBar } from "./UserBulkActionBar";
import { UsersTableHeader } from "./UsersTableHeader";
import { UsersTableBody } from "./UsersTableBody";
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
  onBulkAction: (action: "activate" | "deactivate" | "delete" | "resend_verification") => void;
  onExportSelected: () => void;
}

export const UsersTable = (props: UsersTableProps) => {
  const { users, totalCount, isLoading, page, onPrev, onNext, hasPrev, hasNext, onView, onEdit, onDelete, onToggleActive, onResendVerification, onSendPasswordReset, searchQuery, sortField, sortOrder, onSortChange, selectedUserIds, onToggleSelectUser, onSelectAll, onBulkAction, onExportSelected } = props;
  const t = useTranslations("Dashboard.admin.users.table");

  const allSelected = users.length > 0 && users.every((u) => selectedUserIds.includes(u.id));
  const someSelected = selectedUserIds.length > 0 && !allSelected;

  return (
    <Card className="border border-slate-100 shadow-sm bg-white rounded-[2.5rem] overflow-hidden relative">
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

      <UserBulkActionBar
        selectedCount={selectedUserIds.length}
        onBulkAction={onBulkAction}
        onExportSelected={onExportSelected}
        onDeselectAll={() => onSelectAll(false)}
      />

      <CardContent className="p-0">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <UsersTableHeader
              allSelected={allSelected}
              someSelected={someSelected}
              sortField={sortField}
              sortOrder={sortOrder}
              onSelectAll={onSelectAll}
              onSortChange={onSortChange}
            />
            <UsersTableBody
              isLoading={isLoading}
              users={users}
              selectedUserIds={selectedUserIds}
              searchQuery={searchQuery}
              onToggleSelectUser={onToggleSelectUser}
              onView={onView}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggleActive={onToggleActive}
              onResendVerification={onResendVerification}
              onSendPasswordReset={onSendPasswordReset}
            />
          </Table>
        </div>

        <UserPagination page={page} onPrev={onPrev} onNext={onNext} hasPrev={hasPrev} hasNext={hasNext} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};
