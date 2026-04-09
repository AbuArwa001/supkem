"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface CertificateBannerProps {
  certificationId: string;
}

export const CertificateBanner = ({ certificationId }: CertificateBannerProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 }}
      className="mt-8 p-8 bg-emerald-50 border border-emerald-100 rounded-[16px] flex flex-col md:flex-row items-center justify-between gap-6"
    >
      <div>
        <h3 className="text-xl font-black font-outfit text-emerald-800 tracking-tight">
          Certificate Ready
        </h3>
        <p className="text-sm font-medium text-emerald-600/80 mt-1">
          This application has been approved and a certificate generated.
        </p>
      </div>
      <Link
        href={`/portal/certificates/${certificationId}`}
        className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm text-center uppercase tracking-widest hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
      >
        View Official Certificate
      </Link>
    </motion.div>
  );
};
