import React from "react";
import { motion } from "framer-motion";
import { Card, CardTitle } from "@/components/ui/card";
import { Server, Shield, Users, Cpu, ChevronRight } from "lucide-react";

interface AuditStatsViewProps {
  stats: any;
}

export function AuditStatsView({ stats }: AuditStatsViewProps) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-none shadow-premium rounded-[2rem] bg-indigo-600 text-white p-8 relative overflow-hidden group">
          <div className="absolute right-[-10%] bottom-[-10%] opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Server className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <p className="text-indigo-100 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">DB Engine</p>
            <h3 className="text-2xl font-black mb-1 truncate">{stats?.database_engine || "SQLite 3"}</h3>
            <p className="text-indigo-100/60 text-xs font-medium">{stats?.database_tables_count ? `${stats.database_tables_count} tables registered` : "Core Persistence Tier"}</p>
          </div>
        </Card>

        <Card className="border-none shadow-premium rounded-[2rem] bg-emerald-600 text-white p-8 relative overflow-hidden group">
          <div className="absolute right-[-10%] bottom-[-10%] opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Shield className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <p className="text-emerald-100 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Cycle Events</p>
            <h3 className="text-3xl font-black mb-1">{stats?.recent_activity_count || 0}</h3>
            <p className="text-emerald-100/60 text-xs font-medium">Logged in last 24h</p>
          </div>
        </Card>

        <Card className="border-none shadow-premium rounded-[2rem] bg-amber-500 text-white p-8 relative overflow-hidden group">
          <div className="absolute right-[-10%] bottom-[-10%] opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Users className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <p className="text-amber-50 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">Access Grid</p>
            <h3 className="text-3xl font-black mb-1">{stats?.user_stats?.total || 0}</h3>
            <p className="text-amber-50/60 text-xs font-medium">{stats?.user_stats?.active || 0} accounts active</p>
          </div>
        </Card>

        <Card className="border-none shadow-premium rounded-[2rem] bg-primary text-white p-8 relative overflow-hidden group">
          <div className="absolute right-[-10%] bottom-[-10%] opacity-20 group-hover:scale-110 transition-transform duration-500">
            <Cpu className="h-32 w-32" />
          </div>
          <div className="relative z-10">
            <p className="text-white/80 font-bold uppercase tracking-[0.2em] text-[10px] mb-2">System Status</p>
            <h3 className="text-2xl font-black mb-1 truncate">{stats?.database_status?.toUpperCase() || "OPTIMAL"}</h3>
            <p className="text-white/60 text-xs font-medium">Telemetry latency: nominal</p>
          </div>
        </Card>
      </div>

      <Card className="border-none shadow-premium rounded-[2.5rem] bg-white p-10">
        <CardTitle className="text-2xl font-bold font-outfit mb-8 flex items-center">
          Object Distribution
          <ChevronRight className="h-5 w-5 mx-2 text-slate-300" />
          <span className="text-foreground/40 italic">Resource Counts</span>
        </CardTitle>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {stats?.model_counts && Object.entries(stats.model_counts).map(([name, count]: [string, any]) => (
            <div key={name} className="p-6 bg-slate-50/50 rounded-3xl group hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/5">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{name}</p>
              <p className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left font-outfit">{count}</p>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
