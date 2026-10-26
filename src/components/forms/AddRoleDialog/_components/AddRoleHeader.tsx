import { ShieldPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AddRoleHeader() {
  return (
    <div className="p-7 pb-5 border-b border-slate-100 flex items-start justify-between bg-gradient-to-r from-emerald-50/50 via-teal-50/20 to-white">
      <div className="flex items-center gap-4">
        <div className="bg-primary/10 p-3.5 rounded-2xl text-primary ring-1 ring-primary/20">
          <ShieldPlus size={26} />
        </div>
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-xl font-black text-slate-900 font-outfit uppercase tracking-tight">
              Create New Authority Role
            </h2>
            <Badge className="bg-emerald-100/80 text-emerald-800 border-none font-bold text-[10px] uppercase tracking-wider px-2.5">
              RBAC
            </Badge>
          </div>
          <p className="text-slate-500 font-medium text-xs mt-0.5">
            Define an administrative role profile and configure operational module permissions.
          </p>
        </div>
      </div>
    </div>
  );
}
