"use client";

import { LucideIcon, CheckCircle2 } from "lucide-react";

interface ParticularsHeaderProps {
  title: string;
  badge: string;
  subtitle: string;
  name?: string;
  idPassport?: string;
  badgeColor: "blue" | "rose";
  Icon: LucideIcon;
}

export function ParticularsHeader({
  title,
  badge,
  subtitle,
  name,
  idPassport,
  badgeColor,
  Icon,
}: ParticularsHeaderProps) {
  const isBlue = badgeColor === "blue";

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
      <div className="flex items-center gap-3.5">
        <div
          className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs shrink-0 ${
            isBlue
              ? "bg-blue-50 text-blue-600 border-blue-100/80"
              : "bg-rose-50 text-rose-600 border-rose-100/80"
          }`}
        >
          <Icon size={22} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl sm:text-2xl font-black font-outfit text-slate-900">{title}</h3>
            <span
              className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                isBlue ? "bg-blue-100/80 text-blue-800" : "bg-rose-100/80 text-rose-800"
              }`}
            >
              {badge}
            </span>
          </div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {name && idPassport && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-bold self-start sm:self-auto">
          <CheckCircle2 size={14} className="text-emerald-600" />
          <span className="truncate max-w-[180px]">{name}</span>
        </div>
      )}
    </div>
  );
}
