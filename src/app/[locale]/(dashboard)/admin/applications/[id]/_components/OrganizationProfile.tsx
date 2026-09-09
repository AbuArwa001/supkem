import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export default function OrganizationProfile({ app }: { app: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 md:p-10 rounded-[32px] bg-white border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-8"
    >
      <div className="flex items-center gap-4 text-slate-900">
        <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center shrink-0 text-slate-700">
          <Building2 size={26} />
        </div>
        <h3 className="text-2xl font-black font-outfit">Organization Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Full Name
          </p>
          <p className="text-lg font-bold text-slate-900">
            {app.organization_name || "N/A"}
          </p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Type
          </p>
          <p className="text-lg font-bold text-secondary">Registered Entity</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Region
          </p>
          <p className="text-lg font-bold text-slate-900">Nairobi Metropolitan</p>
        </div>
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Council
          </p>
          <p className="text-lg font-bold text-slate-900">Nairobi City Office</p>
        </div>
      </div>
    </motion.div>
  );
}
