import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ShieldCheck, ShieldAlert, Users, Sparkles } from "lucide-react";

interface DialogHeaderUIProps {
    roleName: string;
    onRoleNameChange?: (name: string) => void;
    isSystemRole?: boolean;
    usersCount?: number;
    canEditName?: boolean;
}

export function DialogHeaderUI({
    roleName,
    onRoleNameChange,
    isSystemRole,
    usersCount = 0,
    canEditName = false,
}: DialogHeaderUIProps) {
    return (
        <div className="bg-slate-900 p-8 text-white relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] -mt-20 -mr-20" />
            <DialogHeader className="relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/10 p-3.5 rounded-2xl text-indigo-400">
                            {isSystemRole ? <ShieldCheck className="h-6 w-6" /> : <ShieldAlert className="h-6 w-6 text-emerald-400" />}
                        </div>
                        <div>
                            <DialogTitle className="text-2xl font-black uppercase tracking-tight font-outfit">
                                Manage <span className="text-indigo-400">Role & Access</span>
                            </DialogTitle>
                            <DialogDescription className="text-slate-400 font-medium text-xs mt-0.5">
                                Fine-tune authority policies and operational rights
                            </DialogDescription>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-center">
                        <Badge
                            className={`border-none font-black text-[9px] uppercase tracking-widest px-3 py-1 rounded-full ${
                                isSystemRole
                                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            }`}
                        >
                            {isSystemRole ? "Core System Role" : "Custom Defined Profile"}
                        </Badge>
                        <Badge className="bg-white/10 text-slate-300 border-none font-bold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
                            <Users size={11} />
                            <span>{usersCount} {usersCount === 1 ? "User" : "Users"}</span>
                        </Badge>
                    </div>
                </div>

                {canEditName && !isSystemRole ? (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-1.5">
                        <label className="block text-[10px] font-black uppercase tracking-wider text-slate-300">
                            Role Title / Identifier
                        </label>
                        <Input
                            value={roleName}
                            onChange={(e) => onRoleNameChange?.(e.target.value)}
                            placeholder="Enter role title..."
                            className="h-11 rounded-xl bg-white/10 border-white/10 text-white font-bold text-sm focus:bg-white/20 focus:ring-2 focus:ring-indigo-400 transition-all placeholder:text-slate-500"
                        />
                    </div>
                ) : (
                    <div className="mt-3 flex items-center gap-2 text-xs text-slate-300">
                        <span className="font-bold text-white uppercase tracking-wider font-outfit text-base">
                            {roleName}
                        </span>
                    </div>
                )}
            </DialogHeader>
        </div>
    );
}
