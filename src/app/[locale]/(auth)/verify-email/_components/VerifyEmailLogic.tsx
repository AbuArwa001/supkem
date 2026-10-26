"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter, Link } from "@/i18n/routing";
import api from "@/lib/api";
import { useTranslations } from "next-intl";

export function VerifyEmailLogic() {
  const t = useTranslations("Auth.verifyEmail");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");
    const uid = searchParams.get("uid");

    if (!token || !uid) {
      setError("Invalid verification link.");
      setLoading(false);
      return;
    }

    const verifyEmail = async () => {
      try {
        await api.post("/users/users/verify_email/", { uid, token });
        setSuccess(true);
        setTimeout(() => { router.push("/login?verified=true"); }, 3000);
      } catch (err: any) {
        setError(err.response?.data?.detail || "Verification failed. The link may have expired or is invalid.");
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  if (loading) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 size={40} className="text-primary animate-spin" />
        </div>
        <h1 className="text-3xl font-bold text-primary font-outfit">{t("heading")}...</h1>
        <p className="text-foreground/60">{t("desc")}</p>
      </motion.div>
    );
  }

  if (success) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-primary font-outfit">Email Verified!</h1>
        <p className="text-foreground/60">Your email has been successfully verified. Redirecting you to login...</p>
        <div className="pt-4"><Loader2 className="animate-spin text-primary mx-auto" /></div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6 flex flex-col items-center">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
        <AlertCircle size={40} className="text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-primary font-outfit">Verification Failed</h1>
      <p className="text-foreground/60">{error}</p>
      <Link href="/login" className="mt-6 py-4 bg-primary text-white rounded-[24px] font-bold text-sm hover-lift transition-all inline-block shadow-xl shadow-primary/20 block w-full max-w-xs">
        {t("backToLogin")}
      </Link>
    </motion.div>
  );
}
