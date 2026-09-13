import { useState } from "react";
import { ArrowLeft, Edit3, Copy, Check, ShieldCheck, Clock, Ban } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrganizationHeaderProps {
    name: string;
    id: string | number;
    status?: string;
    contextTitle?: string;
    canEdit?: boolean;
    onEdit?: () => void;
    onBack: () => void;
}

export function OrganizationHeader({
    name,
    id,
    status,
    contextTitle = "SUPKEM DIGITAL ADMINISTRATION & GOVERNANCE SUITE",
    canEdit = false,
    onEdit,
    onBack
}: OrganizationHeaderProps) {
    const [copied, setCopied] = useState(false);
    const shortId = String(id).substring(0, 8).toUpperCase();

    const handleCopyId = () => {
        navigator.clipboard.writeText(String(id));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="space-y-3">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-primary/60 font-outfit">
                {contextTitle}
            </p>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 sm:gap-6">
                    <button
                        onClick={onBack}
                        title="Back to Organizations"
                        className="p-3 bg-white border border-border rounded-2xl hover:bg-primary hover:text-white transition-all shadow-xs shrink-0 cursor-pointer"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="space-y-1.5">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-outfit text-primary tracking-tight">
                                {name}
                            </h1>
                            {status && (
                                <span
                                    className={cn(
                                        "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center gap-1.5",
                                        status === "Accredited"
                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                                            : status === "Pending"
                                            ? "bg-amber-50 text-amber-700 border-amber-200/80"
                                            : "bg-rose-50 text-rose-700 border-rose-200/80"
                                    )}
                                >
                                    {status === "Accredited" && <ShieldCheck size={12} />}
                                    {status === "Pending" && <Clock size={12} />}
                                    {status === "Suspended" && <Ban size={12} />}
                                    {status}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2 text-foreground/50 font-medium uppercase tracking-wider text-xs">
                            <span>Registry Profile</span>
                            <span className="w-1 h-1 bg-primary/30 rounded-full" />
                            <button
                                onClick={handleCopyId}
                                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[11px] font-bold transition-colors cursor-pointer"
                                title="Click to copy full ID"
                            >
                                <span>ID: {shortId}</span>
                                {copied ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} className="text-slate-400" />}
                            </button>
                        </div>
                    </div>
                </div>

                {canEdit && onEdit && (
                    <button
                        onClick={onEdit}
                        className="self-start md:self-auto px-5 py-3 rounded-2xl bg-white border border-primary/20 hover:border-primary text-primary hover:bg-primary/5 font-black text-xs uppercase tracking-wider flex items-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
                    >
                        <Edit3 size={15} />
                        Edit Details
                    </button>
                )}
            </div>
        </div>
    );
}
