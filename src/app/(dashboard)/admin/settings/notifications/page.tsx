"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import {
    Bell,
    Save,
    RefreshCw,
    Search,
    AlertCircle,
    CheckCircle2,
    Info,
    Mail,
    Clock,
    Users,
    Shield,
    Loader2,
    Check,
    ChevronLeft
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// --- Types ---
interface SystemParameter {
    id: string;
    key: string;
    name: string;
    description: string;
    value: string;
    data_type: 'string' | 'number' | 'boolean' | 'json';
    category: 'general' | 'financial' | 'logistics' | 'notifications' | 'system';
    updated_at: string;
}

interface Role {
    id: string;
    role_name: string;
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

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function NotificationsSettingsPage() {
    const { user } = useAuth();
    const isAdmin = user?.role?.role_name === "Admin" || user?.is_staff;
    const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
    const [updatingKey, setUpdatingKey] = useState<string | null>(null);

    const { data: parameters, isLoading: paramsLoading, mutate: mutateParams } = useSWR<SystemParameter[]>(
        isAdmin ? "/configurations/system-parameters/?category=notifications" : null,
        fetcher
    );

    const { data: roles, isLoading: rolesLoading } = useSWR<Role[]>(
        isAdmin ? "/users/roles/" : null,
        fetcher
    );

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="bg-rose-50 p-6 rounded-full">
                    <AlertCircle className="h-12 w-12 text-rose-500" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Access Restricted</h2>
                <p className="text-slate-500 font-semibold max-w-md text-center">
                    Notification architecture requires system admin privileges to modify.
                </p>
            </div>
        );
    }

    const handleValueChange = (key: string, value: string) => {
        setPendingChanges(prev => ({ ...prev, [key]: value }));
    };

    const handleSave = async (key: string) => {
        const value = pendingChanges[key];
        if (value === undefined) return;

        setUpdatingKey(key);
        try {
            await api.patch(`/configurations/system-parameters/${key}/`, { value });
            toast.success("Setting updated successfully");
            if (parameters) {
                mutateParams(parameters.map(p => p.key === key ? { ...p, value } : p), false);
            }
            setPendingChanges(prev => {
                const next = { ...prev };
                delete next[key];
                return next;
            });
        } catch (err) {
            console.error("Failed to update configuration", err);
            toast.error("Failed to update configuration");
        } finally {
            setUpdatingKey(null);
        }
    };

    const toggleRole = (currentValue: string, roleName: string) => {
        let selectedRoles: string[] = [];
        try {
            selectedRoles = JSON.parse(currentValue);
        } catch (e) {
            selectedRoles = [];
        }

        if (selectedRoles.includes(roleName)) {
            selectedRoles = selectedRoles.filter(r => r !== roleName);
        } else {
            selectedRoles.push(roleName);
        }

        return JSON.stringify(selectedRoles);
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-12"
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
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-600 border border-amber-100">
                                <Bell size={28} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
                                    Notification <span className="text-foreground/40 italic">Settings</span>
                                </h1>
                                <p className="text-foreground/60 font-medium tracking-tight mt-1">
                                    Configure automated triggers and recipient protocols for system events.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => mutateParams()}
                    className="rounded-xl hover:bg-slate-100 text-slate-500"
                >
                    <RefreshCw className={`h-5 w-5 ${paramsLoading ? 'animate-spin' : ''}`} />
                </Button>
            </header>

            <div className="grid grid-cols-1 gap-8">
                {paramsLoading ? (
                    [...Array(3)].map((_, i) => (
                        <Card key={i} className="border-none shadow-premium rounded-[2.5rem] bg-white">
                            <CardContent className="p-10">
                                <Skeleton className="h-8 w-1/3 mb-6" />
                                <Skeleton className="h-20 w-full rounded-2xl" />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    parameters?.map((param) => (
                        <motion.div key={param.id} variants={item}>
                            <Card className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden group hover:shadow-premium-hover transition-all duration-500">
                                <CardContent className="p-8 md:p-10">
                                    <div className="flex flex-col lg:flex-row gap-10">
                                        <div className="flex-1 space-y-6">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight font-outfit flex items-center gap-3">
                                                        {param.name}
                                                    </h3>
                                                    {param.data_type === 'boolean' && (
                                                        <Badge className="bg-emerald-50 text-emerald-600 border-emerald-100 text-[9px] uppercase tracking-widest px-2 py-0">Global</Badge>
                                                    )}
                                                </div>
                                                <p className="text-slate-500 font-medium leading-relaxed max-w-xl">
                                                    {param.description}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-6 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                                <div className="bg-white p-2 rounded-lg shadow-sm">
                                                    {param.key.includes('days') ? <Clock className="h-4 w-4 text-amber-500" /> :
                                                        param.key.includes('email') ? <Mail className="h-4 w-4 text-blue-500" /> :
                                                            param.key.includes('roles') ? <Users className="h-4 w-4 text-indigo-500" /> :
                                                                <Shield className="h-4 w-4 text-emerald-500" />}
                                                </div>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                                                    SYSTEM PARAMETER: <span className="text-primary">{param.key}</span>
                                                </span>
                                            </div>
                                        </div>

                                        <div className="w-full lg:w-[360px] flex flex-col justify-center gap-6">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                                                    Configuration Value
                                                </label>

                                                {param.data_type === "boolean" ? (
                                                    <div className="h-16 flex items-center justify-between px-8 bg-slate-50 rounded-[1.25rem] border border-slate-100 shadow-sm">
                                                        <span className={cn(
                                                            "text-xs font-black uppercase tracking-widest",
                                                            (pendingChanges[param.key] ?? param.value).toLowerCase() === "true" ? "text-emerald-600" : "text-slate-400"
                                                        )}>
                                                            {(pendingChanges[param.key] ?? param.value).toLowerCase() === "true" ? "Enabled" : "Disabled"}
                                                        </span>
                                                        <Switch
                                                            checked={(pendingChanges[param.key] ?? param.value).toLowerCase() === "true"}
                                                            onCheckedChange={(checked) => handleValueChange(param.key, checked ? "true" : "false")}
                                                        />
                                                    </div>
                                                ) : param.data_type === "json" && param.key === "notify_roles" ? (
                                                    <div className="space-y-2 max-h-[200px] overflow-y-auto p-2 bg-slate-50 rounded-[1.25rem] border border-slate-100 no-scrollbar">
                                                        {roles?.map(role => {
                                                            const currentVal = pendingChanges[param.key] ?? param.value;
                                                            let isSelected = false;
                                                            try {
                                                                isSelected = JSON.parse(currentVal).includes(role.role_name);
                                                            } catch (e) { }

                                                            return (
                                                                <button
                                                                    key={role.id}
                                                                    onClick={() => handleValueChange(param.key, toggleRole(currentVal, role.role_name))}
                                                                    className={cn(
                                                                        "w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-bold text-xs uppercase tracking-tight",
                                                                        isSelected
                                                                            ? "bg-primary text-white shadow-lg shadow-primary/20"
                                                                            : "bg-white text-slate-500 hover:bg-slate-100"
                                                                    )}
                                                                >
                                                                    {role.role_name}
                                                                    {isSelected && <Check className="h-3 w-3" />}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                ) : (
                                                    <div className="relative">
                                                        <Input
                                                            type={param.data_type === "number" ? "number" : "text"}
                                                            value={pendingChanges[param.key] ?? param.value}
                                                            onChange={(e) => handleValueChange(param.key, e.target.value)}
                                                            className="h-16 px-8 rounded-[1.25rem] border-slate-100 bg-slate-50 focus:bg-white focus:border-primary/20 font-bold text-slate-900 transition-all text-lg shadow-sm"
                                                        />
                                                        {param.data_type === "number" && (
                                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest pointer-events-none">
                                                                Units
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                            </div>

                                            <AnimatePresence>
                                                {pendingChanges[param.key] !== undefined && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    >
                                                        <Button
                                                            className="w-full h-14 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-amber-200"
                                                            onClick={() => handleSave(param.key)}
                                                            disabled={updatingKey === param.key}
                                                        >
                                                            {updatingKey === param.key ? (
                                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                            ) : (
                                                                <>
                                                                    <Save className="h-5 w-5 mr-3" />
                                                                    Update Configuration
                                                                </>
                                                            )}
                                                        </Button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))
                )}
            </div>

            <footer className="pt-12 text-center pb-8">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 rounded-full">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-tight">
                        Settings are applied in real-time to the application environment.
                    </span>
                </div>
            </footer>
        </motion.div>
    );
}
