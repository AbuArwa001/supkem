"use client";

import { Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { User } from "./types";

interface UserSearchResultItemProps {
    user: User;
    isAlreadyAssigned: boolean;
    isLoading: boolean;
    onAddPersonnel: (userId: string) => void;
}

export function UserSearchResultItem({
    user,
    isAlreadyAssigned,
    isLoading,
    onAddPersonnel
}: UserSearchResultItemProps) {
    return (
        <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-primary/20 hover:shadow-md transition-all">
            <div className="min-w-0 pr-4">
                <p className="text-sm font-bold text-slate-800 truncate">{user.full_name}</p>
                <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
            </div>
            <button
                onClick={() => onAddPersonnel(user.id)}
                disabled={isAlreadyAssigned || isLoading}
                className={cn(
                    "shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm border",
                    isAlreadyAssigned
                        ? "bg-slate-50 text-slate-400 border-slate-200"
                        : "bg-white text-primary border-primary/20 hover:bg-primary hover:text-white"
                )}
            >
                {isLoading ? (
                    <Loader2 size={14} className="animate-spin" />
                ) : isAlreadyAssigned ? (
                    <>Assigned <CheckCircle2 size={14} /></>
                ) : (
                    "Add User"
                )}
            </button>
        </div>
    );
}
