"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    FileText,
    Award,
    Settings,
    LogOut,
    ChevronRight,
    User,
    ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const PortalSidebar = () => {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const menuItems = [
        { name: "Dashboard", href: "/portal", icon: LayoutDashboard },
        { name: "My Organizations", href: "/portal/organizations", icon: Building2 },
        { name: "My Applications", href: "/portal/applications", icon: FileText },
        { name: "My Certificates", href: "/portal/certificates", icon: Award },
        { name: "Profile Settings", href: "/portal/profile", icon: Settings },
    ];

    return (
        <aside className="w-[300px] h-screen sticky top-0 bg-[#0A1A14] border-r border-white/5 flex flex-col z-[60] text-slate-300">
            {/* Logo Area */}
            <div className="p-8 pb-6 flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg group">
                    <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
                    <Image src="/logo.svg" alt="Logo" width={28} height={28} className="relative z-10" />
                </div>
                <div>
                    <p className="font-outfit font-black text-white text-xl tracking-tight leading-none">SUPKEM</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-secondary mt-1">Digital Portal</p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="px-4 pb-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">User Menu</p>
                </div>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium transition-all group relative overflow-hidden",
                                isActive
                                    ? "text-white shadow-lg"
                                    : "text-white/50 hover:bg-white/5 hover:text-white"
                            )}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 opacity-90" />
                            )}
                            <div className="flex items-center gap-4 relative z-10">
                                <item.icon size={20} className={cn(
                                    "transition-colors",
                                    isActive ? "text-secondary" : "opacity-60 group-hover:opacity-100 group-hover:text-secondary/70"
                                )} />
                                <span>{item.name}</span>
                            </div>
                            {isActive && <ChevronRight size={16} className="relative z-10 text-white/50" />}
                        </Link>
                    );
                })}
            </nav>

            {/* User Area */}
            <div className="p-6 border-t border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-inner mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center text-white shrink-0 shadow-md">
                        <User size={20} />
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-bold text-white truncate text-sm leading-tight">{user?.full_name || "Member"}</p>
                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest truncate mt-0.5">Portal User</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all group"
                >
                    <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm">Secure Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default PortalSidebar;
