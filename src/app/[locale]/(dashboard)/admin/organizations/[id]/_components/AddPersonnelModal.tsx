"use client";

import { motion } from "framer-motion";
import { User as UserIcon, X, Search, Users, Loader2, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";

import { Personnel, User } from "./types";

interface AddPersonnelModalProps {
    orgName: string;
    personnel: Personnel[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchResults: User[];
    defaultUsers: User[];
    isSearching: boolean;
    actionLoading: string | null;
    onSearchUsers: (e: React.FormEvent) => void;
    onAddPersonnel: (userId: string) => void;
    onClose: () => void;
}

export function AddPersonnelModal({
    orgName,
    personnel,
    searchQuery,
    setSearchQuery,
    searchResults,
    defaultUsers,
    isSearching,
    actionLoading,
    onSearchUsers,
    onAddPersonnel,
    onClose
}: AddPersonnelModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white w-full max-w-lg rounded-[16px] overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[80vh]"
            >
                <div className="p-6 sm:p-8 border-b border-border flex items-center justify-between bg-slate-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/10 shadow-sm">
                            <UserIcon size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold font-outfit text-slate-800 tracking-tight">Assign Personnel</h3>
                            <p className="text-xs font-medium text-slate-500 mt-0.5">Search and add users to {orgName}</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2.5 hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm rounded-xl transition-all"
                    >
                        <X size={20} className="text-slate-400 hover:text-slate-600" />
                    </button>
                </div>

                <div className="p-6 sm:p-8 flex-col flex gap-6 overflow-hidden">
                    <form onSubmit={onSearchUsers} className="relative group shrink-0">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full bg-slate-50 hover:bg-slate-100 focus:bg-white border border-slate-200 focus:border-primary/30 rounded-2xl py-4 pl-12 pr-24 text-sm font-medium transition-all outline-none shadow-sm focus:ring-4 focus:ring-primary/5"
                        />
                        <button
                            type="submit"
                            disabled={isSearching || !searchQuery.trim()}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold disabled:opacity-50 hover:bg-primary transition-colors"
                        >
                            {isSearching ? <Loader2 size={14} className="animate-spin" /> : "Search"}
                        </button>
                    </form>

                    <div className="flex-1 overflow-y-auto min-h-[200px] custom-scrollbar pr-2 space-y-3">
                        {searchResults.length === 0 && !isSearching && searchQuery ? (
                            <div className="text-center py-10">
                                <Users size={32} className="mx-auto text-slate-300 mb-3" />
                                <p className="text-slate-500 font-medium text-sm">No users found matching &quot;{searchQuery}&quot;</p>
                            </div>
                        ) : (
                            (searchResults.length > 0 ? searchResults : defaultUsers).map((user) => {
                                const isAlreadyAssigned = personnel.some(p => p.user.id === user.id);
                                return (
                                    <div key={user.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-primary/20 hover:shadow-md transition-all">
                                        <div className="min-w-0 pr-4">
                                            <p className="text-sm font-bold text-slate-800 truncate">{user.full_name}</p>
                                            <p className="text-xs text-slate-500 truncate mt-0.5">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => onAddPersonnel(user.id)}
                                            disabled={isAlreadyAssigned || actionLoading === user.id}
                                            className={cn(
                                                "shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-sm border",
                                                isAlreadyAssigned
                                                    ? "bg-slate-50 text-slate-400 border-slate-200"
                                                    : "bg-white text-primary border-primary/20 hover:bg-primary hover:text-white"
                                            )}
                                        >
                                            {actionLoading === user.id ? (
                                                <Loader2 size={14} className="animate-spin" />
                                            ) : isAlreadyAssigned ? (
                                                <>Assigned <CheckCircle2 size={14} /></>
                                            ) : (
                                                "Add User"
                                            )}
                                        </button>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
