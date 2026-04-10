import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  Download,
  MoreVertical,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { Certificate } from "@/app/[locale]/(dashboard)/admin/certificates/_types";

export default function CertificateCard({
  cert,
  index,
}: {
  cert: Certificate;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      className="p-8 rounded-[20px] bg-white border-2 border-border hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all group relative overflow-hidden"
    >
      {/* Premium Background Accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/[0.03] -translate-y-12 translate-x-12 rounded-full group-hover:bg-primary/5 transition-colors" />

      <div className="flex items-center justify-between mb-8">
        <div className="w-14 h-14 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center border border-secondary/20 group-hover:bg-secondary group-hover:text-white transition-all">
          <Award size={28} />
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2.5 bg-primary/[0.02] border border-border rounded-xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
            <Download size={16} />
          </button>
          <button className="p-2.5 bg-primary/[0.02] border border-border rounded-xl text-foreground/40 hover:text-primary hover:border-primary/20 transition-all">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary mb-1">
            Active Certificate
          </p>
          <h4 className="text-xl font-bold font-outfit text-primary group-hover:underline cursor-pointer tracking-tight leading-tight">
            {cert.application_detail?.service_name ||
              cert.service_name ||
              "Digital Certificate"}
          </h4>
          <p className="text-xs font-bold text-foreground/40 mt-1 uppercase tracking-widest">
            {cert.organization_name}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/50">
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">
              Issued Date
            </p>
            <p className="text-xs font-bold text-primary flex items-center gap-1">
              <Calendar size={12} />{" "}
              {new Date(cert.issued_at).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">
              Serial Number
            </p>
            <p className="text-xs font-bold text-secondary flex items-center gap-1 font-mono tracking-tighter">
              <Award size={12} /> {cert.serial_number}
            </p>
          </div>
        </div>

        <Link
          href={`/admin/certificates/${cert.id}`}
          className="w-full py-4 bg-primary/[0.03] text-primary rounded-2xl font-bold text-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2 group-hover:shadow-lg"
        >
          View Registry Details <ChevronRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
}
