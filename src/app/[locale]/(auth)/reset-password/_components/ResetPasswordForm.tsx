"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Lock, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import api from "@/lib/api";
import { PasswordInput } from "@/components/ui/password-input";
import { useTranslations } from "next-intl";
import { AuthLogoHeader } from "../../_components/AuthLogoHeader";
import { ResetPasswordSuccess } from "./ResetPasswordSuccess";

export function ResetPasswordForm() {
  const t = useTranslations("Auth.resetPassword");
  const searchParams = useSearchParams();
  const router = useRouter();
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const tParam = searchParams.get("token");
    const uParam = searchParams.get("uid");
    if (tParam && uParam) {
      setToken(tParam);
      setUid(uParam);
    } else {
      setError("Invalid or missing reset link parameters.");
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) { setError("Passwords do not match."); return; }
    setLoading(true);
    setError("");
    try {
      await api.post("/users/users/reset_password/", { uid, token, new_password: password, confirm_password: confirmPassword });
      setSuccess(true);
      setTimeout(() => { router.push("/login"); }, 3000);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  if (success) return <ResetPasswordSuccess />;

  return (
    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-md w-full mx-auto py-12 flex flex-col items-center text-center">
      <AuthLogoHeader size="md" />
      <div className="space-y-2 mb-8 w-full text-center">
        <h1 className="text-3xl font-bold font-outfit text-primary tracking-tight">{t("heading")}</h1>
        <p className="text-foreground/60">{t("subheading")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 w-full text-left">
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 flex items-center gap-3">
            <AlertCircle size={18} className="shrink-0" /><span>{error}</span>
          </motion.div>
        )}

        <div className="space-y-2">
          <label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-1">{t("newPassword")}</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
            <PasswordInput required min={8} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium" placeholder="••••••••" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-1">{t("confirmPassword")}</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
            <PasswordInput required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium" placeholder="••••••••" />
          </div>
        </div>

        <button type="submit" disabled={loading || !token} className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 transition-all mt-4 cursor-pointer">
          {loading ? <Loader2 className="animate-spin" /> : <>{t("resetButton")} <CheckCircle2 size={20} /></>}
        </button>
      </form>
    </motion.div>
  );
}
