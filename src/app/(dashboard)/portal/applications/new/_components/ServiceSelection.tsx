import { motion } from "framer-motion";
import { Layout, FilePlus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Service } from "@/app/(dashboard)/portal/applications/new/_types";

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  hasError: boolean;
  onSelect: (service: Service) => void;
}

function ServiceCard({ service, selected, hasError, onSelect }: ServiceCardProps) {
  return (
    <label
      className={cn(
        "p-6 rounded-[16px] border-2 cursor-pointer transition-all flex flex-col gap-4 group relative overflow-hidden",
        selected ? "border-primary bg-primary/[0.03] shadow-2xl shadow-primary/10" :
        hasError ? "border-rose-200 bg-rose-50/20 shadow-inner" : "border-slate-100 hover:border-primary/20 bg-white"
      )}
    >
      <input type="radio" name="service" value={service.id} className="hidden" onChange={() => onSelect(service)} />
      <div className="flex items-center justify-between">
        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-all bg-slate-50", selected ? "bg-primary text-white shadow-lg shadow-primary/30 rotate-6" : "text-slate-400 group-hover:text-primary group-hover:bg-primary/5")}>
          <FilePlus size={24} />
        </div>
        <span className="p-2 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black px-4 shadow-sm border border-emerald-100">
          {service.fee > 0 ? `KES ${Number(service.fee).toLocaleString()}` : "FREE"}
        </span>
      </div>
      <div>
        <p className={cn("font-black text-xl transition-colors", selected ? "text-primary" : "text-slate-700")}>{service.name}</p>
        <p className="text-slate-400 text-sm mt-2 font-medium line-clamp-2 leading-relaxed">{service.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] font-black uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-lg">{service.category}</span>
        <span className={cn("text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border", service.target_audience === "Individual" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-purple-50 text-purple-600 border-purple-100")}>
          {service.target_audience}
        </span>
      </div>
    </label>
  );
}

export function ServiceSelection({ services, selectedServiceId, errors, onSelect }: { services: Service[], selectedServiceId: string, errors: Record<string, string>, onSelect: (service: Service) => void }) {
  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
      <div className="flex items-center gap-3 text-primary">
        <div className="w-12 h-12 rounded-[22px] bg-primary/10 flex items-center justify-center border border-primary/10"><Layout size={24} /></div>
        <div>
          <h3 className="text-2xl font-black font-outfit">Select Service</h3>
          <p className="text-xs text-foreground/30 font-bold uppercase tracking-widest">What would you like to apply for?</p>
          {errors.service && <p className="text-rose-500 text-xs font-bold mt-2 animate-pulse">{errors.service}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} selected={selectedServiceId === service.id} hasError={!!errors.service} onSelect={onSelect} />
        ))}
      </div>
    </motion.div>
  );
}
