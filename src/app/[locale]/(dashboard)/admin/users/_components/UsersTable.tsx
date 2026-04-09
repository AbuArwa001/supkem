"use client";

import { Users as UsersIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { UserRow } from "./UserRow";
import { UserPagination } from "./UserPagination";
import { useTranslations } from "next-intl";

interface User {
  id: string | number;
  full_name: string;
  email: string;
  role?: { role_name: string };
  role_name?: string;
  location?: string;
  is_active: boolean;
}

interface UsersTableProps {
  users: User[];
  totalCount: number;
  isLoading: boolean;
  page: number;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  searchQuery: string;
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
  searchQuery,
}: UsersTableProps) => {
  const t = useTranslations("Dashboard.admin.users.table");

  return (
    <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden">
      <CardHeader className="border-b border-slate-50 p-8">
        <div>
          <CardTitle className="text-2xl font-black tracking-tight text-slate-900 uppercase font-outfit">
            Team <span className="text-rose-600 italic">Directory</span>
          </CardTitle>
          <p className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-widest flex items-center gap-2">
            <UsersIcon className="h-3 w-3" />
            {t("verifiedMembers", { totalCount })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto no-scrollbar">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent border-slate-50/50 h-16">
                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 px-8 text-start">
                  {t("memberDetails")}
                </TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-start">
                  {t("systemRole")}
                </TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-start">
                  {t("location")}
                </TableHead>
                <TableHead className="font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 text-start">
                  {t("status")}
                </TableHead>
                <TableHead className="text-end px-8 font-black text-[10px] uppercase tracking-[0.2em] text-slate-400">
                  {t("actions")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                [1, 2, 3].map((i) => (
                  <TableRow key={i} className="border-slate-50 h-24">
                    <TableCell colSpan={5} className="px-8">
                      <Skeleton className="h-12 w-full rounded-2xl" />
                    </TableCell>
                  </TableRow>
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onView={onView}
                    onEdit={onEdit}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-64 text-center">
                    <div className="flex flex-col items-center justify-center space-y-6">
                      <div className="bg-slate-50 p-10 rounded-2xl">
                        <UsersIcon className="h-16 w-16 text-slate-200" />
                      </div>
                      <p className="text-slate-400 font-black italic uppercase tracking-widest text-[10px]">
                        {t("noResults", { searchQuery })}
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

