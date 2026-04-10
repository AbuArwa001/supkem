"use client";

import { useState } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import {
    Settings2,
    Save,
    RefreshCw,
    Search,
    AlertCircle,
    CheckCircle2,
    Info,
    LayoutDashboard,
    DollarSign,
    Truck,
    Bell,
    Cpu,
    Loader2,
    ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "@/i18n/routing";

// ─── Types ───────────────────────────────────────────────────────────────────
interface SystemParameter {
    id: string;
    key: string;
    name: string;
    description: string;
    value: string;
    data_type: 'string' | 'number' | 'boolean' | 'json';
    category: 'general' | 'financial' | 'notifications' | 'system';
    updated_at: string;
}

type ParameterCategory = SystemParameter['category'];

// ─── Animations ───────────────────────────────────────────────────────────────
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

// ─── Constants ───────────────────────────────────────────────────────────────
const CATEGORY_CONFIG: Record<ParameterCategory, { label: string; icon: any; color: string }> = {
    general: { label: "General", icon: LayoutDashboard, color: "text-indigo-600 bg-indigo-50" },
    financial: { label: "Financial", icon: DollarSign, color: "text-emerald-600 bg-emerald-50" },
    notifications: { label: "Notifications", icon: Bell, color: "text-rose-600 bg-rose-50" },
    system: { label: "System", icon: Cpu, color: "text-slate-600 bg-slate-50" },
};

const fetcher = (url: string) => api.get(url).then(res => res.data);

export default function SystemParametersPage() {
    const { user } = useAuth();
    const isAdmin = user?.role?.role_name === "Admin" || user?.is_staff;

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<ParameterCategory | "all">("all");
    const [pendingChanges, setPendingChanges] = useState<Record<string, string>>({});
    const [updatingKey, setUpdatingKey] = useState<string | null>(null);

    const { data: rawData, error, mutate, isLoading } = useSWR<any>(
        isAdmin ? "/configurations/system-parameters/" : null,
        fetcher
    );

    const parameters: SystemParameter[] = Array.isArray(rawData) ? rawData : (rawData?.results || []);

    const handleSave = async (key: string) => {
        const value = pendingChanges[key];
        if (value === undefined) return;

        setUpdatingKey(key);
        try {
            await api.patch(`/configurations/system-parameters/${key}/`, { value });
            // Update local cache
            if (parameters) {
                const updatedParameters = parameters.map((p: SystemParameter) => p.key === key ? { ...p, value } : p);
                mutate(rawData.results ? { ...rawData, results: updatedParameters } : updatedParameters, false);
            }
            setPendingChanges(prev => {
                const next = { ...prev };
                delete next[key];
                return next;
            });
        } catch (err) {
            console.error("Failed to update parameter", err);
            alert("Failed to update parameter. Please try again.");
        } finally {
            setUpdatingKey(null);
        }
    };

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="bg-rose-50 p-6 rounded-full">
                    <AlertCircle className="h-12 w-12 text-rose-500" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Access Restricted</h2>
                <p className="text-slate-500 font-semibold max-w-md text-center">
                    System configuration requires top-level administrative clearance.
                </p>
            </div>
        );
    }

    const filteredParameters = parameters?.filter((p: SystemParameter) => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.key.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    const handleValueChange = (key: string, value: string) => {
        setPendingChanges(prev => ({ ...prev, [key]: value }));
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
                        <ChevronRight className="rotate-180" size={24} />
                    </Link>
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary">
                                <Settings2 size={28} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">
                                    System <span className="text-foreground/40 italic">Parameters</span>
                                </h1>
                                <p className="text-foreground/60 font-medium tracking-tight mt-1">
                                    Fine-tuning core application behaviors and facility defaults.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => mutate()}
                        className="rounded-xl hover:bg-slate-100 text-slate-500"
                    >
                        <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                    </Button>
                </div>
            </header>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input
                        placeholder="Search parameters by name or identifier..."
                        className="h-12 pl-11 rounded-2xl border-none shadow-sm bg-white font-medium"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 p-1 bg-white rounded-2xl shadow-sm overflow-x-auto no-scrollbar">
                    <Button
                        variant={selectedCategory === "all" ? "default" : "ghost"}
                        onClick={() => setSelectedCategory("all")}
                        className={`rounded-xl px-4 h-10 font-bold text-xs uppercase tracking-widest ${selectedCategory === "all" ? "bg-primary hover:bg-primary/90" : ""
                            }`}
                    >
                        All
                    </Button>
                    {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
                        <Button
                            key={key}
                            variant={selectedCategory === key ? "default" : "ghost"}
                            onClick={() => setSelectedCategory(key as ParameterCategory)}
                            className={`rounded-xl px-4 h-10 font-bold text-xs uppercase tracking-widest ${selectedCategory === key ? "bg-primary hover:bg-primary/90" : ""
                                }`}
                        >
                            <config.icon className="h-3 w-3 mr-2" />
                            {config.label}
                        </Button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {isLoading ? (
                    [...Array(4)].map((_, i) => (
                        <Card key={i} className="border-none shadow-sm rounded-[2rem] overflow-hidden bg-white">
                            <CardContent className="p-8">
                                <Skeleton className="h-6 w-1/3 mb-4" />
                                <Skeleton className="h-12 w-full rounded-xl" />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <AnimatePresence mode="popLayout">
                        {filteredParameters?.map((param) => (
                            <motion.div
                                key={param.id}
                                layout
                                variants={item}
                                initial="hidden"
                                animate="show"
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <Card className="border-none shadow-premium bg-white rounded-[2rem] overflow-hidden hover:shadow-premium-hover transition-all duration-300">
                                    <CardContent className="p-8">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                                            <div className="space-y-4 flex-1">
                                                <div className="flex items-center gap-3">
                                                    <div className={`p-2 rounded-xl ${CATEGORY_CONFIG[param.category].color}`}>
                                                        {(() => {
                                                            const Icon = CATEGORY_CONFIG[param.category].icon;
                                                            return <Icon className="h-4 w-4" />;
                                                        })()}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-lg font-bold text-slate-900 tracking-tight uppercase font-outfit">
                                                            {param.name}
                                                        </h3>
                                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                            ID: {param.key}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100 flex items-start gap-3">
                                                    <Info className="h-4 w-4 text-primary opacity-40 shrink-0 mt-0.5" />
                                                    <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                                        {param.description}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="w-full md:w-[400px] space-y-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-primary ml-1">
                                                        Setting Value
                                                    </label>
                                                    <div className="relative group">
                                                        {param.data_type === "boolean" ? (
                                                            <div className="h-14 flex items-center justify-between px-6 bg-slate-50 rounded-2xl border border-slate-100">
                                                                <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">
                                                                    {(pendingChanges[param.key] ?? param.value) === "True" ? "Enabled" : "Disabled"}
                                                                </span>
                                                                <Switch
                                                                    checked={(pendingChanges[param.key] ?? param.value) === "True"}
                                                                    onCheckedChange={(checked: boolean) => handleValueChange(param.key, checked ? "True" : "False")}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <Input
                                                                type={param.data_type === "number" ? "number" : "text"}
                                                                value={pendingChanges[param.key] ?? param.value}
                                                                onChange={(e) => handleValueChange(param.key, e.target.value)}
                                                                className="h-14 px-6 rounded-2xl border-slate-100 bg-slate-50 focus:bg-white focus:border-primary/20 font-bold text-slate-900 transition-all text-lg shadow-sm"
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <AnimatePresence>
                                                    {pendingChanges[param.key] !== undefined && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            exit={{ opacity: 0, y: 10 }}
                                                        >
                                                            <Button
                                                                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest text-xs shadow-lg shadow-primary/20"
                                                                onClick={() => handleSave(param.key)}
                                                                disabled={updatingKey === param.key}
                                                            >
                                                                {updatingKey === param.key ? (
                                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                                ) : (
                                                                    <>
                                                                        <Save className="h-4 w-4 mr-2" />
                                                                        Commit Change
                                                                    </>
                                                                )}
                                                            </Button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <div className="px-8 py-3 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                                        <Badge variant="outline" className="bg-white text-[9px] font-black uppercase tracking-widest border-slate-200 px-2 py-0.5 rounded-md">
                                            Type: {param.data_type}
                                        </Badge>
                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                                            Synchronized: {new Date(param.updated_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
}
