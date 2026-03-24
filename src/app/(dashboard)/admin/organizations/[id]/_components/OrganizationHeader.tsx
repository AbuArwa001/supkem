"use client";

import { ArrowLeft } from "lucide-react";

interface OrganizationHeaderProps {
    name: string;
    id: string | number;
    onBack: () => void;
}

export function OrganizationHeader({ name, id, onBack }: OrganizationHeaderProps) {
    return (
        <div className="flex items-center gap-6">
            <button
                onClick={onBack}
                className="p-3 bg-white border border-border rounded-2xl hover:bg-primary hover:text-white transition-all shadow-sm"
            >
                <ArrowLeft size={20} />
            </button>
            <div className="space-y-1">
                <h1 className="text-3xl lg:text-4xl font-black font-outfit text-primary tracking-tight">
                    {name}
                </h1>
                <p className="text-foreground/50 font-medium uppercase tracking-widest text-xs flex items-center gap-2">
                    Organization Registry Profile <span className="w-1 h-1 bg-primary/30 rounded-full" /> ID: {String(id).substring(0, 8).toUpperCase()}
                </p>
            </div>
        </div>
    );
}
