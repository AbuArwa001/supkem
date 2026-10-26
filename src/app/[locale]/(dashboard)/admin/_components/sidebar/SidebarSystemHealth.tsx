import React from "react";
import { Server } from "lucide-react";

export function SidebarSystemHealth() {
  return (
    <div className="p-6 rounded-[2rem] bg-linear-to-br from-slate-950 via-slate-900 to-emerald-950 text-white shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      <div className="flex items-center justify-between mb-4 relative z-10">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">
            System Health
          </span>
        </div>
        <Server size={16} className="text-slate-400" />
      </div>

      <div className="space-y-2 relative z-10">
        <p className="font-bold text-sm text-slate-100">All Services Operational</p>
        <p className="text-[11px] text-slate-400 font-medium">
          Core Database Connected • API Latency 24ms
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono relative z-10">
        <span>TLS 1.3 ENCRYPTED</span>
        <span>UPTIME 99.98%</span>
      </div>
    </div>
  );
}
