import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, ShieldAlert, Users, CheckCircle2, Lock, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { Role, formatPermission } from "./accessControlTypes";

interface RoleCardProps {
  role: Role;
  onClick: () => void;
}

export function RoleCard({ role, onClick }: RoleCardProps) {
  return (
    <Card
      onClick={onClick}
      className="border-none shadow-premium bg-white rounded-[2.5rem] overflow-hidden hover:shadow-premium-hover transition-all duration-500 group flex flex-col h-full border border-transparent hover:border-slate-100 cursor-pointer"
    >
      <CardHeader className="p-8 pb-4">
        <div className="flex items-start justify-between">
          <div className={`p-4 rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
            role.is_system_role ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
          }`}>
            {role.is_system_role ? <ShieldCheck size={30} /> : <ShieldAlert size={30} />}
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <Badge className={`border-none font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider text-[8px] ${
              role.is_system_role ? "bg-slate-100 text-slate-600" : "bg-emerald-100 text-emerald-800"
            }`}>
              {role.is_system_role ? "CORE SYSTEM" : "CUSTOM ROLE"}
            </Badge>
            <div className="flex items-center gap-1.5">
              <Badge className="bg-slate-100 text-slate-500 border-none font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-[8px]">
                {role.permissions.length} POLICIES
              </Badge>
              <Badge className="bg-slate-100 text-slate-500 border-none font-black px-2 py-0.5 rounded-full uppercase tracking-widest text-[8px] flex items-center gap-1">
                <Users size={9} />
                {role.users_count ?? 0}
              </Badge>
            </div>
          </div>
        </div>
        <CardTitle className="text-2xl font-black tracking-tight text-slate-900 mt-5 font-outfit uppercase">
          {role.role_name}
        </CardTitle>
        <p className="text-slate-400 font-bold text-xs uppercase tracking-tight mt-1">
          {role.is_system_role ? "System-Defined Authority Profile" : "Custom Delegated Authority Profile"}
        </p>
      </CardHeader>
      <CardContent className="p-8 pt-4 flex-1 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 max-h-[160px] overflow-y-auto pr-2 no-scrollbar">
            {role.permissions.length > 0 ? (
              role.permissions.slice(0, 10).map((perm) => {
                const { action, module, color } = formatPermission(perm.codename);
                return (
                  <div key={perm.id} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[9px] font-black uppercase tracking-wider ${color}`}>
                    <CheckCircle2 size={12} />
                    <span>{action} {module}</span>
                  </div>
                );
              })
            ) : (
              <p className="text-slate-400 italic text-xs font-medium">No permissions granted yet.</p>
            )}
            {role.permissions.length > 10 && (
              <div className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-400 text-[9px] font-black uppercase tracking-wider">
                + {role.permissions.length - 10} MORE
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between text-slate-400">
          <span className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
            <Lock size={12} />
            {role.updated_at ? format(new Date(role.updated_at), "MMM dd") : "STABLE"}
          </span>
          <span className="text-[11px] font-black text-indigo-600 uppercase tracking-wider flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Manage
            <ChevronRight className="h-4 w-4" />
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
