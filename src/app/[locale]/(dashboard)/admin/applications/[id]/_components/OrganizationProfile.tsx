import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export default function OrganizationProfile({ app }: { app: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-10 rounded-[20px] bg-white border border-border shadow-sm space-y-8"
    >
      <div className="flex items-center gap-4 text-primary">
        <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center shrink-0">
          <Building2 size={24} />
        </div>
        <h3 className="text-2xl font-bold font-outfit">Organization Profile</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-1">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
            Full Name
          </p>
          <p className="text-lg font-bold text-primary">
            {app.organization_name || "N/A"}
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
            Type
          </p>
          <p className="text-lg font-bold text-secondary">Registered Entity</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
            Region
          </p>
          <p className="text-lg font-bold text-primary">Nairobi Metropolitan</p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">
            Council
          </p>
          <p className="text-lg font-bold text-primary">Nairobi City Office</p>
        </div>
      </div>
    </motion.div>
  );
}
