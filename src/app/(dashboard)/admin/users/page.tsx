"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Users,
    Search,
    UserPlus,
    Shield,
    Mail,
    Phone,
    MoreVertical,
    CheckCircle2,
    XCircle,
    ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";

export default function UserManagement() {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await api.get("/users/users/");
                setUsers(res.data.results || res.data);
            } catch (err) {
                console.error("Failed to fetch users", err);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter((u: any) =>
        u.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-1">
                    <h1 className="text-4xl font-bold font-outfit text-primary">User Directory</h1>
                    <p className="text-foreground/60 font-medium">Manage access and roles for all platform members.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors" />
                        <input
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name or email..."
                            className="pl-12 pr-4 py-3 bg-white border border-border focus:border-primary/20 rounded-2xl text-sm transition-all outline-none w-64 shadow-sm"
                        />
                    </div>
                    <button className="px-6 py-3 bg-primary text-white rounded-2xl font-bold hover-lift premium-gradient shadow-lg flex items-center gap-2">
                        <UserPlus size={18} /> Add New User
                    </button>
                </div>
            </div>

            <div className="bg-white border border-border rounded-[40px] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-primary/[0.02] border-b border-border">
                        <tr className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
                            <th className="px-8 py-6">User Profile</th>
                            <th className="px-8 py-6">Role & Status</th>
                            <th className="px-8 py-6">Contact Info</th>
                            <th className="px-8 py-6 text-right font-black">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border/50">
                        {filteredUsers.map((u: any) => (
                            <tr key={u.id} className="hover:bg-primary/[0.01] transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center font-bold text-lg border border-secondary/20">
                                            {u.full_name?.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-primary text-lg group-hover:underline cursor-pointer tracking-tight">{u.full_name}</p>
                                            <p className="text-xs text-foreground/40 font-medium">UID: #USR-00{u.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="space-y-2">
                                        <span className="px-3 py-1 bg-primary/5 text-primary border border-primary/10 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 w-fit">
                                            <Shield size={10} /> {u.role?.role_name || "No Role"}
                                        </span>
                                        <span className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 w-fit",
                                            u.is_active ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                        )}>
                                            {u.is_active ? <CheckCircle2 size={10} /> : <XCircle size={10} />}
                                            {u.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 space-y-2">
                                    <p className="text-sm font-semibold text-primary/70 flex items-center gap-2"><Mail size={14} className="text-secondary" /> {u.email}</p>
                                    <p className="text-sm font-semibold text-primary/70 flex items-center gap-2"><Phone size={14} className="text-secondary" /> {u.phone || "N/A"}</p>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <Link
                                            href={`/admin/users/${u.id}`}
                                            className="px-4 py-2 bg-primary/[0.03] text-primary rounded-xl font-bold text-xs hover:bg-primary hover:text-white transition-all"
                                        >
                                            Edit Profile
                                        </Link>
                                        <button className="p-2 border border-border rounded-xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
                                            <MoreVertical size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredUsers.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mx-auto text-primary/20">
                            <Users size={32} />
                        </div>
                        <p className="text-foreground/40 font-bold">No users found match your search.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
