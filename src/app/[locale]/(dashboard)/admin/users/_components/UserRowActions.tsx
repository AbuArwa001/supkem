"use client";

import { MoreVertical, Edit2, Trash2, Info, Send, KeyRound, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import type { UserItem } from "../_hooks/useUsersLogic";

interface UserRowActionsProps {
  user: UserItem;
  onView: (user: UserItem) => void;
  onEdit: (user: UserItem) => void;
  onDelete: (user: UserItem) => void;
  onToggleActive: (user: UserItem) => void;
  onResendVerification: (user: UserItem) => void;
  onSendPasswordReset: (user: UserItem) => void;
}

export function UserRowActions({
  user,
  onView,
  onEdit,
  onDelete,
  onToggleActive,
  onResendVerification,
  onSendPasswordReset,
}: UserRowActionsProps) {
  const t = useTranslations("Dashboard.admin.users.row");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 h-9 w-9 outline-none focus:ring-0">
          <MoreVertical className="h-4 w-4 text-slate-400" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-[1.25rem] border border-slate-100 shadow-xl p-2 min-w-[210px] bg-white text-slate-700">
        <DropdownMenuItem className="rounded-xl font-black text-[10px] py-3 px-3 cursor-pointer hover:bg-slate-50 hover:text-slate-900 uppercase tracking-wider flex items-center gap-2.5 rtl:flex-row-reverse" onClick={() => onView(user)}>
          <Info className="h-4 w-4 text-slate-400" /> {t("viewDetails")}
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-xl font-black text-[10px] py-3 px-3 cursor-pointer hover:bg-slate-50 hover:text-slate-900 uppercase tracking-wider flex items-center gap-2.5 rtl:flex-row-reverse" onClick={() => onEdit(user)}>
          <Edit2 className="h-4 w-4 text-slate-400" /> {t("editAccount")}
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-xl font-black text-[10px] py-3 px-3 cursor-pointer hover:bg-slate-50 hover:text-slate-900 uppercase tracking-wider flex items-center gap-2.5 rtl:flex-row-reverse" onClick={() => onToggleActive(user)}>
          <AlertCircle className="h-4 w-4 text-slate-400" /> {t("toggleStatus")} ({user.is_active ? t("disabled") : t("active")})
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-xl font-black text-[10px] py-3 px-3 cursor-pointer hover:bg-slate-50 hover:text-slate-900 uppercase tracking-wider flex items-center gap-2.5 rtl:flex-row-reverse" onClick={() => onResendVerification(user)}>
          <Send className="h-4 w-4 text-slate-400" /> {t("resendVerification")}
        </DropdownMenuItem>

        <DropdownMenuItem className="rounded-xl font-black text-[10px] py-3 px-3 cursor-pointer hover:bg-slate-50 hover:text-slate-900 uppercase tracking-wider flex items-center gap-2.5 rtl:flex-row-reverse" onClick={() => onSendPasswordReset(user)}>
          <KeyRound className="h-4 w-4 text-slate-400" /> {t("sendPasswordReset")}
        </DropdownMenuItem>

        <DropdownMenuSeparator className="my-1 bg-slate-100" />

        <DropdownMenuItem className="rounded-xl font-black text-[10px] py-3 px-3 cursor-pointer text-rose-600 hover:bg-rose-50 hover:text-rose-700 uppercase tracking-wider flex items-center gap-2.5 rtl:flex-row-reverse" onClick={() => onDelete(user)}>
          <Trash2 className="h-4 w-4 text-rose-400" /> {t("removeAccess")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
