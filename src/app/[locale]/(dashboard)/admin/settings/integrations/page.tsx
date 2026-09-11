"use client";

import { useState, useCallback } from "react";
import useSWR from "swr";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronDown,
    ChevronUp,
    Eye,
    EyeOff,
    Save,
    RefreshCw,
    CheckCircle2,
    XCircle,
    Loader2,
    Plug,
    Zap,
    Mail,
    CreditCard,
    Bot,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import api from "@/lib/api";

// ─── Types ───────────────────────────────────────────────────────────────────
interface IntegrationParam {
    id: string;
    key: string;
    name: string;
    description: string;
    value: string;
    data_type: string;
    category: string;
    is_configured: boolean;
    updated_at: string;
}

interface IntegrationDef {
    id: string;
    label: string;
    tagline: string;
    icon: React.ElementType;
    accent: string;
    accentLight: string;
    accentDark: string;
    docsUrl: string;
    paramKeys: string[];
}

// ─── Integration definitions ──────────────────────────────────────────────────
const INTEGRATIONS: IntegrationDef[] = [
    {
        id: "knock",
        label: "Knock",
        tagline: "In-app notifications & bell alerts",
        icon: Zap,
        accent: "#6d28d9",
        accentLight: "#ede9fe",
        accentDark: "#4c1d95",
        docsUrl: "https://docs.knock.app/",
        paramKeys: ["KNOCK_SECRET_API_KEY", "KNOCK_PUBLIC_API_KEY", "KNOCK_FEED_CHANNEL_ID"],
    },
    {
        id: "mpesa",
        label: "M-Pesa",
        tagline: "Safaricom STK Push mobile payments",
        icon: CreditCard,
        accent: "#059669",
        accentLight: "#d1fae5",
        accentDark: "#064e3b",
        docsUrl: "https://developer.safaricom.co.ke/",
        paramKeys: [
            "MPESA_CONSUMER_KEY",
            "MPESA_CONSUMER_SECRET",
            "MPESA_SHORTCODE",
            "MPESA_PASSKEY",
            "MPESA_ENVIRONMENT",
            "MPESA_CALLBACK_URL",
        ],
    },
    {
        id: "resend",
        label: "Resend",
        tagline: "Transactional email delivery",
        icon: Mail,
        accent: "#0f172a",
        accentLight: "#f1f5f9",
        accentDark: "#020617",
        docsUrl: "https://resend.com/docs",
        paramKeys: ["RESEND_API_KEY"],
    },
    {
        id: "openai",
        label: "OpenAI",
        tagline: "AI-powered Arabic auto-translation",
        icon: Bot,
        accent: "#0d9488",
        accentLight: "#ccfbf1",
        accentDark: "#134e4a",
        docsUrl: "https://platform.openai.com/docs",
        paramKeys: ["OPENAI_API_KEY"],
    },
];

const MASKED = "••••••••";
const SECRET_PATTERNS = ["KEY", "SECRET", "TOKEN", "PASSKEY", "PASSWORD"];
const isSecret = (key: string) => SECRET_PATTERNS.some((p) => key.toUpperCase().includes(p));

// ─── Animations ───────────────────────────────────────────────────────────────
const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

const fetcher = (url: string) => api.get(url).then((r) => r.data);

// ─── Helpers ─────────────────────────────────────────────────────────────────
function groupByKey(params: IntegrationParam[]): Record<string, IntegrationParam> {
    return Object.fromEntries(params.map((p) => [p.key, p]));
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function SecretInput({
    value,
    onChange,
    placeholder,
}: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
}) {
    const [visible, setVisible] = useState(false);
    return (
        <div className="relative">
            <Input
                type={visible ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder ?? "Enter value…"}
                className="pr-10 bg-slate-50 border-slate-200 focus:border-violet-400 focus:ring-violet-100 font-mono text-sm"
            />
            <button
                type="button"
                onClick={() => setVisible((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
                {visible ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
        </div>
    );
}

function TestButton({
    serviceId,
    disabled,
}: {
    serviceId: string;
    disabled: boolean;
}) {
    const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
    const [msg, setMsg] = useState("");

    const runTest = async () => {
        setState("loading");
        setMsg("");
        try {
            const res = await api.get(`/configurations/integrations/test/${serviceId}/`);
            if (res.data.ok) {
                setState("ok");
                setMsg(res.data.message);
            } else {
                setState("error");
                setMsg(res.data.message);
            }
        } catch {
            setState("error");
            setMsg("Connection test failed.");
        }
        setTimeout(() => setState("idle"), 6000);
    };

    return (
        <div className="flex items-center gap-3">
            <Button
                variant="outline"
                size="sm"
                onClick={runTest}
                disabled={disabled || state === "loading"}
                className="gap-2 text-xs border-slate-200 hover:border-slate-300"
            >
                {state === "loading" ? (
                    <Loader2 size={13} className="animate-spin" />
                ) : (
                    <RefreshCw size={13} />
                )}
                Test Connection
            </Button>
            <AnimatePresence mode="wait">
                {state !== "idle" && state !== "loading" && (
                    <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-center gap-1 text-xs font-medium ${state === "ok" ? "text-emerald-600" : "text-rose-600"}`}
                    >
                        {state === "ok" ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                        {msg}
                    </motion.span>
                )}
            </AnimatePresence>
        </div>
    );
}

// ─── Integration Card ─────────────────────────────────────────────────────────
function IntegrationCard({
    integration,
    params,
    onSaved,
}: {
    integration: IntegrationDef;
    params: Record<string, IntegrationParam>;
    onSaved: () => void;
}) {
    const [expanded, setExpanded] = useState(false);
    const [saving, setSaving] = useState(false);

    // Derive local edit state from params
    const initialEdits = () =>
        Object.fromEntries(
            integration.paramKeys.map((k) => {
                const p = params[k];
                return [k, p ? (isSecret(k) && p.is_configured ? MASKED : p.value) : ""];
            })
        );

    const [edits, setEdits] = useState<Record<string, string>>(initialEdits);

    const handleEdit = (key: string, val: string) => {
        setEdits((prev) => ({ ...prev, [key]: val }));
    };

    // Whether any key in this integration is configured
    const configuredCount = integration.paramKeys.filter((k) => params[k]?.is_configured).length;
    const totalCount = integration.paramKeys.length;
    const fullyConfigured = configuredCount === totalCount;
    const partiallyConfigured = configuredCount > 0 && !fullyConfigured;

    const handleSave = async () => {
        setSaving(true);
        const failures: string[] = [];

        for (const key of integration.paramKeys) {
            const newVal = edits[key];
            // Skip if value is the mask sentinel (nothing changed for secrets)
            if (newVal === MASKED) continue;
            // Skip if empty and was not previously configured (no change)
            if (!newVal && !params[key]?.is_configured) continue;

            try {
                await api.patch(`/configurations/integrations/${key}/`, { value: newVal });
            } catch {
                failures.push(params[key]?.name ?? key);
            }
        }

        setSaving(false);
        onSaved();

        if (failures.length === 0) {
            toast.success(`${integration.label} settings saved successfully.`);
        } else {
            toast.error(`Failed to save: ${failures.join(", ")}`);
        }
    };

    const Icon = integration.icon;

    return (
        <motion.div variants={item}>
            <Card
                className="border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] rounded-[28px] overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-300"
                style={{ borderColor: expanded ? `${integration.accent}22` : undefined }}
            >
                {/* Card Header */}
                <button
                    onClick={() => setExpanded((v) => !v)}
                    className="w-full text-left"
                    aria-expanded={expanded}
                >
                    <CardHeader className="p-6 md:p-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-5">
                                {/* Icon bubble */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                                    style={{ backgroundColor: integration.accentLight }}
                                >
                                    <Icon
                                        size={26}
                                        style={{ color: integration.accent }}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 flex-wrap">
                                        <h3 className="text-xl font-black font-outfit text-slate-900 tracking-tight">
                                            {integration.label}
                                        </h3>
                                        {fullyConfigured ? (
                                            <Badge className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                                                ✓ Configured
                                            </Badge>
                                        ) : partiallyConfigured ? (
                                            <Badge className="bg-amber-50 text-amber-700 border border-amber-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                                                {configuredCount}/{totalCount} Set
                                            </Badge>
                                        ) : (
                                            <Badge className="bg-slate-50 text-slate-500 border border-slate-200 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                                                Not Configured
                                            </Badge>
                                        )}
                                    </div>
                                    <p className="text-slate-500 text-sm font-medium mt-1">
                                        {integration.tagline}
                                    </p>
                                </div>
                            </div>
                            <div className="text-slate-400">
                                {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                            </div>
                        </div>
                    </CardHeader>
                </button>

                {/* Expanded credential form */}
                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <CardContent className="px-6 md:px-8 pb-8 pt-0">
                                {/* Separator */}
                                <div
                                    className="h-px mb-6"
                                    style={{ backgroundColor: `${integration.accent}18` }}
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {integration.paramKeys.map((key) => {
                                        const param = params[key];
                                        return (
                                            <div key={key} className="space-y-2">
                                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                                    {param?.name ?? key}
                                                    {param?.is_configured && (
                                                        <span className="text-emerald-500">✓</span>
                                                    )}
                                                </label>
                                                {isSecret(key) ? (
                                                    <SecretInput
                                                        value={edits[key] ?? ""}
                                                        onChange={(v) => handleEdit(key, v)}
                                                        placeholder={
                                                            param?.is_configured
                                                                ? "Leave blank to keep existing"
                                                                : "Enter value…"
                                                        }
                                                    />
                                                ) : (
                                                    <Input
                                                        value={edits[key] ?? ""}
                                                        onChange={(e) => handleEdit(key, e.target.value)}
                                                         placeholder={
                                                             key === "MPESA_ENVIRONMENT"
                                                                 ? "sandbox or production"
                                                                 : key === "MPESA_CALLBACK_URL"
                                                                 ? "e.g. https://supkem-drf.onrender.com/api/v1/applications/applications/mpesa_callback/"
                                                                 : "Enter value…"
                                                         }
                                                        className="bg-slate-50 border-slate-200 focus:border-violet-400 focus:ring-violet-100 font-mono text-sm"
                                                    />
                                                )}
                                                {param?.description && (
                                                    <p className="text-[11px] text-slate-400 leading-relaxed">
                                                        {param.description}
                                                    </p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-100">
                                    <TestButton
                                        serviceId={integration.id}
                                        disabled={configuredCount === 0}
                                    />
                                    <div className="flex items-center gap-3">
                                        <a
                                            href={integration.docsUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
                                        >
                                            View docs →
                                        </a>
                                        <Button
                                            onClick={handleSave}
                                            disabled={saving}
                                            className="gap-2 font-bold text-white shadow-lg"
                                            style={{
                                                background: `linear-gradient(135deg, ${integration.accent}, ${integration.accentDark})`,
                                                boxShadow: `0 4px 15px ${integration.accent}40`,
                                            }}
                                        >
                                            {saving ? (
                                                <Loader2 size={15} className="animate-spin" />
                                            ) : (
                                                <Save size={15} />
                                            )}
                                            Save {integration.label}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Card>
        </motion.div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function IntegrationsPage() {
    const { user } = useAuth();
    const isAdmin =
        user?.is_superuser ||
        user?.is_staff ||
        ["Super Admin", "Admin", "IT Officer"].includes(user?.role?.role_name ?? user?.role_name ?? "");

    const {
        data: rawData,
        error,
        isLoading,
        mutate,
    } = useSWR<IntegrationParam[] | { results: IntegrationParam[] }>(
        isAdmin ? "/configurations/integrations/" : null,
        fetcher,
        { revalidateOnFocus: false }
    );

    const params: Record<string, IntegrationParam> = rawData
        ? groupByKey(Array.isArray(rawData) ? rawData : rawData.results ?? [])
        : {};

    if (!isAdmin) {
        return (
            <div className="flex flex-col items-center justify-center h-64 gap-4 text-slate-500">
                <XCircle size={40} className="text-rose-400" />
                <p className="font-semibold">You don&apos;t have permission to view this page.</p>
                <Link href="/admin/settings" className="text-sm underline text-slate-400">
                    ← Back to Settings
                </Link>
            </div>
        );
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-8"
        >
            {/* Header */}
            <motion.header variants={item}>
                <div className="flex items-center gap-4 mb-2">
                    <Link
                        href="/admin/settings"
                        className="flex items-center gap-1 text-sm text-slate-400 hover:text-slate-600 transition-colors font-medium"
                    >
                        <ChevronLeft size={16} />
                        Settings
                    </Link>
                </div>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 md:p-12 rounded-[40px] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-violet-600 to-indigo-700 shadow-xl shadow-violet-200">
                            <Plug size={30} className="text-white" />
                        </div>
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-black font-outfit text-slate-900 tracking-tight">
                                Integrations{" "}
                                <span className="text-slate-300 font-normal italic">Config</span>
                            </h1>
                            <p className="text-slate-500 font-medium text-lg mt-2">
                                Manage API keys for Knock, M-Pesa, Resend, and OpenAI. Secrets are stored encrypted and never exposed in plain text.
                            </p>
                        </div>
                    </div>
                    {/* Overall status pill */}
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                Status
                            </p>
                            <p className="text-sm font-bold text-slate-700 mt-0.5">
                                {Object.values(params).filter((p) => p.is_configured).length} /{" "}
                                {INTEGRATIONS.reduce((acc, i) => acc + i.paramKeys.length, 0)} keys set
                            </p>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* Loading skeletons */}
            {isLoading && (
                <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-24 rounded-[28px] bg-slate-100" />
                    ))}
                </div>
            )}

            {/* Error */}
            {error && (
                <div className="flex items-center gap-3 p-6 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700">
                    <XCircle size={20} />
                    <p className="font-medium">Failed to load integration settings. Please refresh.</p>
                </div>
            )}

            {/* Integration cards */}
            {!isLoading && !error && (
                <div className="space-y-4">
                    {INTEGRATIONS.map((integration) => (
                        <IntegrationCard
                            key={integration.id}
                            integration={integration}
                            params={params}
                            onSaved={() => mutate()}
                        />
                    ))}
                </div>
            )}

            {/* Security note */}
            <motion.div
                variants={item}
                className="flex items-start gap-4 p-5 bg-slate-50 border border-slate-200 rounded-2xl"
            >
                <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-sm">🔒</span>
                </div>
                <div>
                    <p className="text-sm font-bold text-slate-700">Security Note</p>
                    <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                        Secret keys are <strong>write-only</strong> — once saved, they display as{" "}
                        <code className="bg-slate-200 px-1 py-0.5 rounded text-xs font-mono">
                            ••••••••
                        </code>{" "}
                        and are never returned in API responses. To rotate a key, simply type the new
                        value and save. Changes take effect immediately without a server restart.
                    </p>
                </div>
            </motion.div>
        </motion.div>
    );
}
