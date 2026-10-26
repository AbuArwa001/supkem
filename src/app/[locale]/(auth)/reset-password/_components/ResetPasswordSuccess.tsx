import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";

export function ResetPasswordSuccess() {
  const t = useTranslations("Auth.resetPassword");

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 size={40} className="text-green-600" />
      </div>
      <h1 className="text-3xl font-bold text-primary font-outfit">{t("successHeading")}</h1>
      <p className="text-foreground/60">{t("successDesc")}</p>
      <div className="pt-4">
        <Loader2 className="animate-spin text-primary mx-auto" />
      </div>
    </motion.div>
  );
}
