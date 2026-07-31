"use client";

import { useAuth } from "@/hooks/useAuth";
import { ChevronDown, LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserNavDropdown() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const initials = user.full_name
    ? user.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "U";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 md:border-l md:border-border/10 md:pl-6 cursor-pointer outline-none group hover:opacity-80 transition-opacity">
        <div className="h-9 w-9 bg-primary/10 text-primary font-bold text-sm rounded-full flex items-center justify-center border border-primary/20 shadow-sm">
          {initials}
        </div>
        <div className="hidden md:flex flex-col items-start gap-0.5">
          <span className="text-sm font-semibold text-foreground/80 leading-none">
            {user.full_name || "User"}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-primary leading-none mt-1">
            {user.role?.role_name || "Member"}
          </span>
        </div>
        <ChevronDown size={14} className="text-foreground/40 hidden md:block group-hover:text-primary transition-colors" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl border border-border/10 shadow-lg">
        <DropdownMenuLabel className="font-normal px-4 py-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-bold leading-none text-foreground">{user.full_name}</p>
            <p className="text-xs font-medium leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer px-4 py-3 group" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4 text-red-500 group-hover:text-red-600" />
          <span className="text-red-500 font-semibold group-hover:text-red-600">Secure Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
