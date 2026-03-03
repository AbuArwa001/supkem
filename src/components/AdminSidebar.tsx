"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Building2,
    FileText,
    Award,
    Users,
    Settings,
    LogOut,
    ChevronRight,
    User
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

const AdminSidebar = () => {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    const menuItems = [
        { name: "Overview", href: "/admin", icon: LayoutDashboard },
        { name: "Organizations", href: "/admin/organizations", icon: Building2 },
        { name: "Applications", href: "/admin/applications", icon: FileText },
        { name: "Certificates", href: "/admin/certificates", icon: Award },
        { name: "User Management", href: "/admin/users", icon: Users },
        { name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <aside className="w-80 h-screen sticky top-0 bg-white border-r border-border flex flex-col z-[60]">
            <div className="p-8 pb-4">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 bg-primary/5 rounded-xl group-hover:rotate-12 transition-transform">
                        <Image src="/logo.svg" alt="Logo" width={32} height={32} />
                    </div>
                    <div>
                        <p className="font-bold text-primary text-xl tracking-tight leading-tight">SUPKEM</p>
                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Administrator</p>
                    </div>
                </Link>
            </div>

            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-2xl font-bold transition-all group",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-foreground/40 hover:bg-primary/5 hover:text-primary"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon size={22} className={cn(isActive ? "text-white" : "opacity-50 group-hover:opacity-100")} />
                                <span>{item.name}</span>
                            </div>
                            {isActive && <ChevronRight size={18} />}
                        </Link>
                    );
                })}
            </nav>

            <div className="p-6 border-t border-border space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-2xl bg-primary/[0.02]">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                        <User size={20} />
                    </div>
                    <div className="overflow-hidden">
                        <p className="font-bold text-primary truncate text-sm">{user?.full_name || "Admin User"}</p>
                        <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest truncate">{user?.role?.role_name || "Super Admin"}</p>
                    </div>
                </div>

                <button
                    onClick={logout}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
                >
                    <LogOut size={22} className="opacity-70" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
