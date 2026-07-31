import { Loader2, CheckCircle2 } from "lucide-react";
import type { Permission } from "../types";

interface PermissionsListProps {
    isLoading: boolean;
    groupedPermissions: Record<string, Permission[]>;
    selectedIds: (string | number)[];
    onToggle: (id: string | number) => void;
}

export function PermissionsList({ isLoading, groupedPermissions, selectedIds, onToggle }: PermissionsListProps) {
    if (isLoading) {
        return (
            <div className="py-20 flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                <p className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Loading Security Protocols...</p>
            </div>
        );
    }

    return (
        <div className="space-y-10">
            {Object.entries(groupedPermissions).map(([group, perms]) => (
                <div key={group} className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600 ml-1">
                        {group}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {perms.map((perm) => (
                            <PermissionCard
                                key={perm.id}
                                perm={perm}
                                isSelected={selectedIds.includes(perm.id)}
                                onToggle={() => onToggle(perm.id)}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

function PermissionCard({ perm, isSelected, onToggle }: { perm: Permission, isSelected: boolean, onToggle: () => void }) {
    return (
        <button
            onClick={onToggle}
            className={`flex items-center justify-between p-4 rounded-2xl border transition-all duration-300 text-left hover:scale-[1.02] active:scale-[0.98] ${
                isSelected ? "bg-indigo-50 border-indigo-200 shadow-sm" : "bg-white border-slate-100 hover:border-slate-200"
            }`}
        >
            <div className="space-y-0.5">
                <p className={`text-xs font-black uppercase tracking-tight ${isSelected ? "text-indigo-700" : "text-slate-700"}`}>
                    {perm.name.split("|").pop()?.trim()}
                </p>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider opacity-60">
                    {perm.codename}
                </p>
            </div>
            <div className={`shrink-0 h-6 w-6 rounded-full flex items-center justify-center transition-all ${
                isSelected ? "bg-indigo-600 text-white" : "bg-slate-100 text-transparent border border-slate-200"
            }`}>
                <CheckCircle2 className="h-4 w-4" />
            </div>
        </button>
    );
}
