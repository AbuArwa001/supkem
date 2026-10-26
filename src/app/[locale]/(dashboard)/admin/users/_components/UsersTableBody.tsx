"use client";

import { Users as UsersIcon } from "lucide-react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRow } from "./UserRow";
import { useTranslations } from "next-intl";
import type { UserItem } from "../_hooks/useUsersLogic";

interface UsersTableBodyProps {
  isLoading: boolean;
  users: UserItem[];
  selectedUserIds: (string | number)[];
  searchQuery: string;
  onToggleSelectUser: (id: string | number) => void;
  onView: (user: UserItem) => void;
  onEdit: (user: UserItem) => void;
  onDelete: (user: UserItem) => void;
  onToggleActive: (user: UserItem) => void;
  onResendVerification: (user: UserItem) => void;
  onSendPasswordReset: (user: UserItem) => void;
}

export function UsersTableBody({
  isLoading,
  users,
  selectedUserIds,
  searchQuery,
  onToggleSelectUser,
  onView,
  onEdit,
  onDelete,
  onToggleActive,
  onResendVerification,
  onSendPasswordReset,
}: UsersTableBodyProps) {
  const t = useTranslations("Dashboard.admin.users.table");

  if (isLoading) {
    return (
      <TableBody>
        {[1, 2, 3, 4, 5].map((i) => (
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
        ))}
      </TableBody>
    );
  }

  if (users.length === 0) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={7} className="h-64 text-center">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                <UsersIcon className="h-12 w-12 text-slate-300" />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs max-w-sm">
                {searchQuery ? t("noResults", { searchQuery }) : t("noUsersMatch")}
              </p>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {users.map((user) => (
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
      ))}
    </TableBody>
  );
}
