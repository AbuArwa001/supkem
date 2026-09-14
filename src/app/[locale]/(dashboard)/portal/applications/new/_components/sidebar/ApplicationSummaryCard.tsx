import { motion } from "framer-motion";
import { Service } from "../types";
import { useLocale } from "next-intl";
import { ArrowRight, Sparkles } from "lucide-react";

interface ApplicationSummaryCardProps {
  service: Service;
  step?: number;
  onNext?: () => void;
}

export function ApplicationSummaryCard({ service, step, onNext }: ApplicationSummaryCardProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const serviceName = isAr ? (service.name_ar || service.name) : (service.name || service.name_en);
  const feeLabel =
    service.fee > 0 ? `KES ${Number(service.fee).toLocaleString()}` : isAr ? "مجاني" : "FREE";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-6 p-8 rounded-[20px] bg-slate-900 text-white shadow-2xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      <h4 className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-4">
        {isAr ? "ملخص الطلب" : "Application Summary"}
      </h4>
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-white/10 pb-4">
          <div>
            <p className="text-xs text-white/40 mb-1 font-bold">{isAr ? "الخدمة" : "Service"}</p>
            <p className="font-black font-outfit text-lg">{serviceName}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/40 mb-1 font-bold">{isAr ? "الرسوم" : "Fee"}</p>
            <p className="font-black text-amber-400">{feeLabel}</p>
          </div>
        </div>
        <div className="flex justify-between items-center pt-1">
          <div>
            <p className="text-xs text-white/40 mb-0.5 font-bold">{isAr ? "الوثيقة المقدمة" : "Document Offered"}</p>
            <p className="font-bold text-sm text-emerald-400">
              {service.document_type === "Letter"
                ? (isAr ? "خطاب رسمي / تزكية" : "Official Letter")
                : service.document_type === "None"
                ? (isAr ? "بدون وثيقة" : "No Document")
                : (isAr ? "شهادة رسمية" : "Official Certificate")}
            </p>
          </div>
        </div>

        {step === 1 && onNext && (
          <button
            type="button"
            onClick={onNext}
            className="w-full mt-5 py-3 px-4 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-95 text-white font-black font-outfit text-sm shadow-lg shadow-primary/30 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>{isAr ? "المتابعة للخطوة التالية" : "Continue to Next Step"}</span>
            <ArrowRight size={16} className="rtl:rotate-180" />
          </button>
        )}
      </div>
    </motion.div>
  );
}

