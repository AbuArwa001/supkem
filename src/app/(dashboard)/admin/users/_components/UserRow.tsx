"use client";

import {
  Users as UsersIcon,
  Mail,
  Shield,
  MapPin,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string | number;
  full_name: string;
  email: string;
  role?: { role_name: string };
  role_name?: string;
  location?: string;
  is_active: boolean;
}

interface UserRowProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

export const UserRow = ({ user, onEdit, onDelete }: UserRowProps) => {
  return (
    <TableRow className="hover:bg-slate-50/50 transition-colors border-slate-50/50 group h-24">
      <TableCell className="px-8">
        <div className="flex items-center space-x-4">
          <div className="bg-slate-100 h-12 w-12 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-rose-600 group-hover:text-white transition-all duration-500">
            <UsersIcon className="h-6 w-6" />
          </div>
          <div>
            <p className="font-black text-slate-900 tracking-tighter text-lg leading-none mb-1 uppercase font-outfit">
              {user.full_name}
            </p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none flex items-center gap-1">
              <Mail className="h-2.5 w-2.5" /> {user.email}
            </p>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant="outline"
          className="rounded-xl border-rose-100 bg-rose-50/50 text-rose-600 font-black text-[9px] px-3 py-1 uppercase tracking-widest flex items-center w-fit gap-2"
        >
          <Shield className="h-3 w-3" />
          {user.role?.role_name || user.role_name || "MEMBER"}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex items-center text-slate-600 font-black text-[10px] uppercase tracking-wider gap-2">
          <MapPin className="h-3 w-3 text-slate-300" />
          {user.location || "N/A"}
        </div>
      </TableCell>
      <TableCell>
        <Badge
          variant={user.is_active ? "default" : "secondary"}
          className={`rounded-full px-3 py-1 text-[9px] font-black uppercase tracking-tighter ${user.is_active ? "bg-emerald-500 hover:bg-emerald-600 text-white" : "bg-slate-100 text-slate-400"}`}
        >
          {user.is_active ? "Active" : "Disabled"}
        </Badge>
      </TableCell>
      <TableCell className="text-right px-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-xl hover:bg-slate-100 h-10 w-10"
            >
              <MoreVertical className="h-5 w-5 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="rounded-[1.5rem] border-none shadow-premium p-3 min-w-[200px] bg-white"
          >
            <DropdownMenuItem
              className="rounded-xl font-black text-[10px] py-4 px-4 cursor-pointer text-slate-600 focus:bg-slate-50 focus:text-slate-900 transition-all uppercase tracking-widest"
              onClick={() => onEdit(user)}
            >
              <Edit2 className="h-4 w-4 mr-3 text-slate-300" />
              Edit Account
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-xl font-black text-[10px] py-4 px-4 cursor-pointer text-rose-600 focus:bg-rose-50 focus:text-rose-700 transition-all uppercase tracking-widest"
              onClick={() => onDelete(user)}
            >
              <Trash2 className="h-4 w-4 mr-3 opacity-40" />
              Remove Access
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
