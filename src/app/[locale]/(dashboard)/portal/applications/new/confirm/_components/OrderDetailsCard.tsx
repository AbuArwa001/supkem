// External libraries
import { FileText, Clock, ShieldCheck } from "lucide-react";

interface OrderDetailsCardProps {
  serviceName: string;
  displayRef: string;
  appData: { submitted_at?: string; status?: string } | null;
  user: { first_name?: string; last_name?: string; email?: string; phone_number?: string } | null;
}

export function OrderDetailsCard({ serviceName, displayRef, appData, user }: OrderDetailsCardProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white/10 backdrop-blur-xl rounded-[16px] shadow-2xl border border-white/20 overflow-hidden p-8 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-outfit text-white leading-tight">Order Details</h3>
            <p className="text-xs uppercase tracking-widest font-bold text-white/40 mt-1">Application Checkout</p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Service Requested</p>
          <div className="bg-white/5 border border-white/10 rounded-2xl px-6 py-5">
            <p className="text-xl font-black text-white leading-snug">{serviceName}</p>
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Reference Number</p>
          <div className="bg-white/5 border border-dashed border-white/20 rounded-2xl px-6 py-4 flex items-center justify-between">
            <p className="font-mono text-lg font-bold text-emerald-300 tracking-wider">{displayRef}</p>
            <Clock className="w-5 h-5 text-white/40" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Date Created</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <p className="font-bold text-white text-sm">
                {appData?.submitted_at ? new Date(appData.submitted_at).toLocaleDateString("en-GB") : "Today"}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Status</p>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30 px-2.5 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                {appData?.status || "Pending Payment"}
              </span>
            </div>
          </div>
        </div>

        {user && (
          <div className="space-y-1">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white/40 ml-1">Applicant Profile</p>
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-300 rounded-full flex items-center justify-center font-black text-xl border border-emerald-400/30 shrink-0">
                {user.first_name?.[0]}{user.last_name?.[0]}
              </div>
              <div>
                <p className="font-bold text-white text-lg leading-tight">{user.first_name} {user.last_name}</p>
                <p className="text-sm font-medium text-white/50 mt-0.5">{user.email}</p>
                <p className="text-sm font-medium text-white/50">{user.phone_number}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 justify-center text-white/40 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-4">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <span className="text-xs font-black tracking-[0.1em] uppercase">256-Bit SSL Encrypted Checkout</span>
      </div>
    </div>
  );
}
