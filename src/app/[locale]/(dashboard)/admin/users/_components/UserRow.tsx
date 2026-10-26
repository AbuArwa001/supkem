"use client";

import { Mail, Shield, MapPin, Calendar, CheckCircle } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { UserAvatar } from "./UserAvatar";
import { getRoleBadgeStyle } from "./userRoleStyles";
import { UserRowActions } from "./UserRowActions";
import type { UserItem } from "../_hooks/useUsersLogic";

interface UserRowProps {
  user: UserItem;
  isSelected: boolean;
  onToggleSelect: (id: string | number) => void;
  onView: (user: UserItem) => void;
  onEdit: (user: UserItem) => void;
  onDelete: (user: UserItem) => void;
  onToggleActive: (user: UserItem) => void;
  onResendVerification: (user: UserItem) => void;
  onSendPasswordReset: (user: UserItem) => void;
}

export const UserRow = (props: UserRowProps) => {
  const { user, isSelected, onToggleSelect, onView, onEdit, onDelete, onToggleActive, onResendVerification, onSendPasswordReset } = props;
  const t = useTranslations("Dashboard.admin.users.row");
  const roleName = user.role?.role_name || user.role_name || "Member";

  return (
    <TableRow className={`transition-colors border-slate-100 group h-20 ${isSelected ? "bg-emerald-50/40 hover:bg-emerald-50/60" : "hover:bg-slate-50/70"}`}>
      <TableCell className="ltr:pl-6 rtl:pr-6 w-12 text-center">
        <input type="checkbox" checked={isSelected} onChange={() => onToggleSelect(user.id)} className="h-4 w-4 rounded-md border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer accent-emerald-600" />
      </TableCell>

      <TableCell className="px-4 text-start">
        <div className="flex items-center space-x-3.5 rtl:space-x-reverse">
          <UserAvatar name={user.full_name} email={user.email} isActive={user.is_active} isVerified={user.is_email_verified} size="md" />
          <div className="text-start min-w-0">
            <div className="flex items-center gap-2">
              <p onClick={() => onView(user)} className="font-black text-slate-900 tracking-tight text-sm uppercase font-outfit truncate hover:text-emerald-700 cursor-pointer transition-colors">{user.full_name}</p>
              {user.is_email_verified && <span title={t("verified")}><CheckCircle className="h-3.5 w-3.5 text-emerald-600 shrink-0" /></span>}
            </div>
            <p className="text-[11px] text-slate-400 font-medium truncate flex items-center gap-1 mt-0.5"><Mail className="h-3 w-3 shrink-0" /> {user.email}</p>
          </div>
        </div>
      </TableCell>

      <TableCell className="text-start hidden md:table-cell">
        <Badge variant="outline" className={`rounded-xl font-black text-[9px] px-3 py-1 uppercase tracking-wider flex items-center w-fit gap-1.5 ${getRoleBadgeStyle(roleName)}`}>
          <Shield className="h-3 w-3 shrink-0" /> {roleName}
        </Badge>
      </TableCell>

      <TableCell className="text-start hidden lg:table-cell">
        <div className="flex items-center text-slate-600 font-bold text-xs tracking-wide gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-slate-300 shrink-0" /><span className="truncate max-w-[120px]">{user.location || "Nairobi"}</span>
        </div>
      </TableCell>

      <TableCell className="text-start hidden lg:table-cell">
        <div className="flex items-center text-slate-500 font-semibold text-xs tracking-wide gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-slate-300 shrink-0" />{user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
        </div>
      </TableCell>

      <TableCell className="text-start hidden sm:table-cell">
        <button
          type="button"
          onClick={() => onToggleActive(user)}
          title={user.is_active ? "Click to suspend" : "Click to activate"}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border transition-all cursor-pointer ${
            user.is_active ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200" : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${user.is_active ? "bg-emerald-500" : "bg-slate-400"}`} />
          {user.is_active ? t("active") : t("disabled")}
        </button>
      </TableCell>

      <TableCell className="text-end ltr:pr-6 rtl:pl-6">
        <UserRowActions user={user} onView={onView} onEdit={onEdit} onDelete={onDelete} onToggleActive={onToggleActive} onResendVerification={onResendVerification} onSendPasswordReset={onSendPasswordReset} />
      </TableCell>
    </TableRow>
  );
};
