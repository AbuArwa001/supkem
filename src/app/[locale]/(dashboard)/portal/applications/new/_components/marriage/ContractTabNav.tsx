"use client";

import { Gift, Users, CheckCircle2 } from "lucide-react";

interface ContractTabNavProps {
  activeTab: "financials" | "witnesses";
  setActiveTab: (tab: "financials" | "witnesses") => void;
  financialErrorsCount: number;
  witnessErrorsCount: number;
  financialFilled: number;
  witnessFilled: number;
  agreedMahr?: string;
  placeOfMarriage?: string;
}

function ContractNavItem({
  active, onClick, icon: Icon, title, errorsCount, subtitle, filled, targetTotal, isAmber,
}: {
  active: boolean; onClick: () => void; icon: any; title: string;
  errorsCount: number; subtitle?: string; filled: number; targetTotal: number; isAmber: boolean;
}) {
  const iconBg = active ? (isAmber ? "bg-amber-500/20 text-amber-300" : "bg-emerald-500/20 text-emerald-300") : (isAmber ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700");
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
          <p className={`text-[11px] font-medium ${active ? "text-slate-300" : "text-slate-500"}`}>{subtitle || "Contract Details"}</p>
        </div>
      </div>
      <div className="shrink-0 text-right hidden sm:block">
        {filled === targetTotal ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-400"><CheckCircle2 size={13} /> Complete</span>
        ) : (
          <span className={`text-[10px] font-bold ${active ? "text-slate-400" : "text-slate-500"}`}>{filled}/{targetTotal} filled</span>
        )}
      </div>
    </button>
  );
}

export function ContractTabNav({
  activeTab, setActiveTab, financialErrorsCount, witnessErrorsCount, financialFilled, witnessFilled, agreedMahr, placeOfMarriage,
}: ContractTabNavProps) {
  return (
    <div className="bg-white p-2 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col sm:flex-row gap-2">
      <ContractNavItem
        active={activeTab === "financials"} onClick={() => setActiveTab("financials")} icon={Gift}
        title="1. Mahr & Waliyy" errorsCount={financialErrorsCount} subtitle={agreedMahr} filled={financialFilled} targetTotal={4} isAmber
      />
      <ContractNavItem
        active={activeTab === "witnesses"} onClick={() => setActiveTab("witnesses")} icon={Users}
        title="2. Venue & Witnesses" errorsCount={witnessErrorsCount} subtitle={placeOfMarriage} filled={witnessFilled} targetTotal={7} isAmber={false}
      />
    </div>
  );
}
