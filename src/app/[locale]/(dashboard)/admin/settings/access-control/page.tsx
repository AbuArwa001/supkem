"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion } from "framer-motion";
import {
    Shield,
    Lock,
    ShieldCheck,
    ShieldPlus,
    ShieldAlert,
    CheckCircle2,
    Search,
    RefreshCw,
    AlertCircle,
    ChevronRight,
    ChevronLeft,
    Users,
    Layers,
    Sparkles
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { usePermissions } from "@/hooks/usePermissions";
import { format } from "date-fns";
import { RolePermissionsDialog } from "@/components/forms/RolePermissionsDialog";
import { AddRoleDialog } from "@/components/forms/AddRoleDialog";
import { Link } from "@/i18n/routing";

// --- Types ---
interface Permission {
    id: string | number;
    name: string;
    codename: string;
}

interface Role {
    id: string;
    role_name: string;
    permissions: Permission[];
    users_count?: number;
    is_system_role?: boolean;
    created_at: string;
    updated_at: string;
}


// --- Animations ---
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

const MODULE_DISPLAY: Record<string, string> = {
    user: "Users",
    role: "Roles",
    permission: "Permissions",
    organization: "Organizations",
    application: "Applications",
    service: "Services",
    news: "News",
    location: "Locations",
};

const ACTION_COLOR: Record<string, string> = {
    view: "bg-blue-50 text-blue-600 border-blue-100",
    add: "bg-emerald-50 text-emerald-600 border-emerald-100",
    change: "bg-amber-50 text-amber-600 border-amber-100",
    delete: "bg-rose-50 text-rose-600 border-rose-100",
};

function formatPermission(codename: string) {
    const parts = codename.split("_");
    const action = parts[0];
    const model = parts.slice(1).join("_");

    return {
        action: action.charAt(0).toUpperCase() + action.slice(1),
        module: MODULE_DISPLAY[model] || model.charAt(0).toUpperCase() + model.slice(1),
        color: ACTION_COLOR[action] || "bg-slate-50 text-slate-600 border-slate-100",
    };
}

const fetcher = (url: string) => api.get(url).then(res => res.data);
import { RoleGuard } from "@/components/RoleGuard";

export default function AccessControlPage() {
    return (
        <RoleGuard module="settings_access_control">
            <AccessControlContent />
        </RoleGuard>
    );
}

function AccessControlContent() {
    const { user } = useAuth();
    const { isSuperAdmin } = usePermissions();
    const isAdmin =
        user?.is_superuser ||
        user?.is_staff ||
        user?.role?.role_name?.toLowerCase().includes("admin") ||
        user?.role_name?.toLowerCase().includes("admin");
    const [search, setSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isAddRoleOpen, setIsAddRoleOpen] = useState(false);

    const { data: rawRoles, isLoading, error, mutate } = useSWR<any>(
        isAdmin ? "/users/roles/" : null,
        fetcher
    );

    const roles: Role[] = Array.isArray(rawRoles) ? rawRoles : (rawRoles?.results || []);

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="bg-rose-50 p-6 rounded-full">
                    <AlertCircle className="h-12 w-12 text-rose-500" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Access Restricted</h2>
                <p className="text-slate-500 font-semibold max-w-md text-center">
                    Managing security protocols requires high-level administrative clearance.
                </p>
            </div>
        );
    }

    const filteredRoles = roles?.filter((role: Role) =>
        role.role_name.toLowerCase().includes(search.toLowerCase())
    );

    const totalRoles = roles.length;
    const coreRoles = roles.filter(r => r.is_system_role).length;
    const customRoles = roles.filter(r => !r.is_system_role).length;
    const totalGovernedUsers = roles.reduce((sum, r) => sum + (r.users_count || 0), 0);

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-10"
        >
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link
                        href="/admin/settings"
                        className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-primary self-start mt-2"
                    >
                        <ChevronLeft size={24} />
                    </Link>
                    <div>
                        <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
                            Access <span className="text-foreground/40 italic">Control</span>
                        </h1>
                        <p className="text-foreground/60 font-medium tracking-tight mt-1">
                            Operational role definitions, user assignments, and fine-grained <span className="text-indigo-500 underline decoration-indigo-500/20 underline-offset-4 decoration-4">permission profiles</span>.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 self-start md:self-end">
                    {isSuperAdmin && (
                        <Button
                            onClick={() => setIsAddRoleOpen(true)}
                            className="h-11 px-5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wider shadow-lg shadow-primary/20 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <ShieldPlus className="h-4 w-4" />
                            <span>Add Role</span>
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => mutate()}
                        className="h-11 w-11 rounded-xl hover:bg-slate-100 text-slate-500"
                        title="Refresh roles"
                    >
                        <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
            </header>

            {/* Role Management Summary Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card className="border-none shadow-premium rounded-2xl bg-white p-5 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Total Defined Roles</span>
                        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                            <Layers size={16} />
                        </div>
                    </div>
                    <div className="text-2xl font-black font-outfit text-slate-900">{totalRoles}</div>
                    <p className="text-[11px] text-slate-400 font-medium">Access boundaries active</p>
                </Card>

                <Card className="border-none shadow-premium rounded-2xl bg-white p-5 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Core System Roles</span>
                        <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                            <ShieldCheck size={16} />
                        </div>
                    </div>
                    <div className="text-2xl font-black font-outfit text-slate-900">{coreRoles}</div>
                    <p className="text-[11px] text-slate-400 font-medium">Protected baseline roles</p>
                </Card>

                <Card className="border-none shadow-premium rounded-2xl bg-white p-5 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Custom Profiles</span>
                        <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                            <ShieldPlus size={16} />
                        </div>
                    </div>
                    <div className="text-2xl font-black font-outfit text-slate-900">{customRoles}</div>
                    <p className="text-[11px] text-slate-400 font-medium">Super Admin created</p>
                </Card>

                <Card className="border-none shadow-premium rounded-2xl bg-white p-5 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">Governed Users</span>
                        <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                            <Users size={16} />
                        </div>
                    </div>
                    <div className="text-2xl font-black font-outfit text-slate-900">{totalUsersGoverned}</div>
                    <p className="text-[11px] text-slate-400 font-medium">Assigned authority profiles</p>
                </Card>
            </div>

            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" />
                <Input
                    placeholder="Search defined roles..."
                    className="h-16 pl-14 pr-6 rounded-[1.5rem] border-none shadow-premium bg-white font-bold text-lg focus:ring-4 focus:ring-primary/5 transition-all"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {isLoading ? (
                    [...Array(6)].map((_, i) => (
                        <Card key={i} className="border-none shadow-premium rounded-[2.5rem] overflow-hidden bg-white p-10">
                            <Skeleton className="h-12 w-12 rounded-2xl mb-6" />
                            <Skeleton className="h-8 w-2/3 mb-4" />
                            <Skeleton className="h-24 w-full rounded-2xl" />
                        </Card>
                    ))
                ) : (
                    filteredRoles?.map((role) => (
                        <motion.div
                            key={role.id}
                            variants={item}
                            onClick={() => {
                                setSelectedRole(role);
                                setIsDialogOpen(true);
                            }}
                            className="cursor-pointer"
                        >
                            <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden hover:shadow-premium-hover transition-all duration-500 group flex flex-col h-full border border-transparent hover:border-slate-100">
                                <CardHeader className="p-8 pb-4">
                                    <div className="flex items-start justify-between">
                                        <div className={`p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
                                            role.is_system_role ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
                                        }`}>
                                            {role.is_system_role ? <ShieldCheck size={30} /> : <ShieldAlert size={30} />}
                                        </div>
                                        <div className="flex flex-col items-end gap-1.5">
                                            <Badge className={`border-none font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[8px] ${
                                                role.is_system_role ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-800"
                                            }`}>
                                                {role.is_system_role ? "CORE SYSTEM" : "CUSTOM ROLE"}
                                            </Badge>
                                            <div className="flex items-center gap-1.5">
                                                <Badge className="bg-slate-100 text-slate-500 border-none font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-[8px]">
                                                    {role.permissions.length} POLICIES
                                                </Badge>
                                                <Badge className="bg-slate-100 text-slate-500 border-none font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-[8px] flex items-center gap-1">
                                                    <Users size={9} />
                                                    {role.users_count ?? 0}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <CardTitle className="text-2xl font-black tracking-tight text-slate-900 mt-5 font-outfit uppercase">
                                        {role.role_name}
                                    </CardTitle>
                                    <p className="text-slate-400 font-bold text-xs uppercase tracking-tight mt-1">
                                        {role.is_system_role ? "System-Defined Authority Profile" : "Custom Delegated Authority Profile"}
                                    </p>
                                </CardHeader>
                                <CardContent className="p-8 pt-4 flex-1 flex flex-col justify-between">
                                    <div className="space-y-4">
                                        <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto pr-2 no-scrollbar">
                                            {role.permissions.length > 0 ? (
                                                role.permissions.slice(0, 10).map((perm) => {
                                                    const { action, module, color } = formatPermission(perm.codename);
                                                    return (
                                                        <div
                                                            key={perm.id}
                                                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider ${color}`}
                                                        >
                                                            <CheckCircle2 size={12} />
                                                            <span>{action} {module}</span>
                                                        </div>
                                                    );
                                                })
                                            ) : (
                                                <p className="text-slate-400 italic text-xs font-medium">No permissions granted yet.</p>
                                            )}
                                            {role.permissions.length > 10 && (
                                                <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-wider">
                                                    + {role.permissions.length - 10} MORE
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-slate-400">
                                        <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                                            <Lock size={12} />
                                            {role.updated_at ? format(new Date(role.updated_at), "MMM dd") : "STABLE"}
                                        </span>
                                        <span className="text-[11px] font-black text-indigo-600 uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                                            Manage
                                            <ChevronRight className="h-4 w-4" />
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>


            <RolePermissionsDialog
                isOpen={isDialogOpen}
                onClose={() => {
                    setIsDialogOpen(false);
                    setSelectedRole(null);
                }}
                role={selectedRole}
            />

            <AddRoleDialog
                isOpen={isAddRoleOpen}
                onClose={() => setIsAddRoleOpen(false)}
            />


            <footer className="pt-12 text-center pb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-50/50 rounded-full border border-indigo-100/50">
                    <Shield className="h-4 w-4 text-indigo-500" />
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-tight">
                        RBAC infrastructure is active and enforcing security boundaries.
                    </span>
                </div>
            </footer>
        </motion.div>
    );
}
