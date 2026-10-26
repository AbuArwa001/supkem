"use client";

import { User, Heart, CheckCircle2 } from "lucide-react";

interface CoupleTabNavProps {
  activeTab: "groom" | "bride";
  setActiveTab: (tab: "groom" | "bride") => void;
  groomErrorsCount: number;
  brideErrorsCount: number;
  groomFilled: number;
  brideFilled: number;
  husbandName?: string;
  wifeName?: string;
}

function NavItem({
  active, onClick, icon: Icon, title, errorsCount, subtitle, filled, isGroom,
}: {
  active: boolean; onClick: () => void; icon: any; title: string;
  errorsCount: number; subtitle?: string; filled: number; isGroom: boolean;
}) {
  const iconBg = active ? (isGroom ? "bg-blue-500/20 text-blue-300" : "bg-rose-500/20 text-rose-300") : (isGroom ? "bg-blue-100 text-blue-700" : "bg-rose-100 text-rose-700");
  return (
    <button
      type="button" onClick={onClick}
      className={`flex-1 relative flex items-center justify-between p-3.5 sm:px-5 rounded-xl transition-all font-outfit cursor-pointer ${
        active ? "bg-slate-900 text-white shadow-md shadow-slate-900/15" : "bg-slate-50/80 hover:bg-slate-100 text-slate-700"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}><Icon size={18} /></div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-sm font-black tracking-tight">{title}</span>
            {errorsCount > 0 && <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white animate-pulse">{errorsCount} issues</span>}
          </div>
          <p className={`text-[11px] font-medium ${active ? "text-slate-300" : "text-slate-500"}`}>{subtitle || "Personal & ID"}</p>
        </div>
      </div>
      <div className="shrink-0 text-right hidden sm:block">
        {filled === 6 ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-400"><CheckCircle2 size={13} /> Complete</span>
        ) : (
          <span className={`text-[10px] font-bold ${active ? "text-slate-400" : "text-slate-500"}`}>{filled}/6 filled</span>
        )}
      </div>
    </button>
  );
}

export function CoupleTabNav({
  activeTab, setActiveTab, groomErrorsCount, brideErrorsCount, groomFilled, brideFilled, husbandName, wifeName,
}: CoupleTabNavProps) {
  return (
    <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row gap-2">
      <NavItem
        active={activeTab === "groom"} onClick={() => setActiveTab("groom")} icon={User}
        title="1. Groom's Details" errorsCount={groomErrorsCount} subtitle={husbandName} filled={groomFilled} isGroom
      />
      <NavItem
        active={activeTab === "bride"} onClick={() => setActiveTab("bride")} icon={Heart}
        title="2. Bride's Details" errorsCount={brideErrorsCount} subtitle={wifeName} filled={brideFilled} isGroom={false}
      />
    </div>
  );
}
