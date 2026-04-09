"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function RegisterSuccess() {
  const t = useTranslations("Auth.register");

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary/[0.02] px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full p-12 rounded-[20px] bg-white border border-border shadow-2xl text-center space-y-6"
      >
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-bold font-outfit text-primary">{t("successHeading")}</h2>
        <p className="text-foreground/60 leading-relaxed font-medium">{t("successDesc")}</p>
        <div className="pt-4">
          <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3 }}
              className="h-full bg-primary"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
