import {
    Building2,
    GraduationCap,
    HeartPulse,
    Users,
    HandHeart,
    Landmark,
    LucideIcon,
} from "lucide-react";

export interface OrgTypeTheme {
    icon: LucideIcon;
    badgeBg: string;
    badgeText: string;
    iconBg: string;
    iconColor: string;
    accentBorder: string;
    accentBg: string;
}

export function getOrgTypeTheme(type?: string): OrgTypeTheme {
    const normalized = (type || "").toLowerCase().trim();

    if (normalized.includes("mosque") || normalized.includes("masjid")) {
        return {
            icon: Landmark,
            badgeBg: "bg-emerald-50 border-emerald-200/80",
            badgeText: "text-emerald-700",
            iconBg: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
            iconColor: "text-emerald-600",
            accentBorder: "group-hover:border-emerald-500/40",
            accentBg: "bg-emerald-500",
        };
    }

    if (normalized.includes("school") || normalized.includes("college") || normalized.includes("edu")) {
        return {
            icon: GraduationCap,
            badgeBg: "bg-indigo-50 border-indigo-200/80",
            badgeText: "text-indigo-700",
            iconBg: "bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white",
            iconColor: "text-indigo-600",
            accentBorder: "group-hover:border-indigo-500/40",
            accentBg: "bg-indigo-500",
        };
    }

    if (normalized.includes("hospital") || normalized.includes("clinic") || normalized.includes("health")) {
        return {
            icon: HeartPulse,
            badgeBg: "bg-rose-50 border-rose-200/80",
            badgeText: "text-rose-700",
            iconBg: "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
            iconColor: "text-rose-600",
            accentBorder: "group-hover:border-rose-500/40",
            accentBg: "bg-rose-500",
        };
    }

    if (normalized.includes("ngo") || normalized.includes("cbo")) {
        return {
            icon: Users,
            badgeBg: "bg-amber-50 border-amber-200/80",
            badgeText: "text-amber-700",
            iconBg: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
            iconColor: "text-amber-600",
            accentBorder: "group-hover:border-amber-500/40",
            accentBg: "bg-amber-500",
        };
    }

    if (normalized.includes("community") || normalized.includes("group") || normalized.includes("youth") || normalized.includes("women")) {
        return {
            icon: HandHeart,
            badgeBg: "bg-cyan-50 border-cyan-200/80",
            badgeText: "text-cyan-700",
            iconBg: "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white",
            iconColor: "text-cyan-600",
            accentBorder: "group-hover:border-cyan-500/40",
            accentBg: "bg-cyan-500",
        };
    }

    // Default / Other
    return {
        icon: Building2,
        badgeBg: "bg-slate-100 border-slate-200",
        badgeText: "text-slate-700",
        iconBg: "bg-slate-100 text-slate-600 group-hover:bg-slate-800 group-hover:text-white",
        iconColor: "text-slate-600",
        accentBorder: "group-hover:border-slate-400",
        accentBg: "bg-slate-600",
    };
}
