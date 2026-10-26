import React from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import { PasswordInput } from "@/components/ui/password-input";
import { useTranslations } from "next-intl";

interface LoginFormCardProps {
  email: string;
  setEmail: (v: string) => void;
  password: string;
  setPassword: (v: string) => void;
  error: string;
  success: string;
  isRedirecting: boolean;
  loading: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function LoginFormCard({
  email, setEmail, password, setPassword, error, success,
  isRedirecting, loading, onSubmit,
}: LoginFormCardProps) {
  const t = useTranslations("Auth.login");

  return (
    <form onSubmit={onSubmit} className="space-y-6 w-full text-left">
      {error && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">
          {error}
        </motion.div>
      )}
      {success && !isRedirecting && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl text-sm font-medium border border-emerald-100">
          {success}
        </motion.div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-1">{t("emailLabel")}</label>
        <div className="relative group">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
          <input
            type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
            placeholder="name@organization.org"
          />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between ml-1">
          <label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em]">{t("passwordLabel")}</label>
          <Link href="/forgot-password" title={t("forgotPassword")} className="text-xs font-bold text-primary/60 hover:text-primary transition-colors">
            {t("forgotPassword")}
          </Link>
        </div>
        <div className="relative group">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
          <PasswordInput
            required value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium"
            placeholder="••••••••"
          />
        </div>
      </div>

      <button
        type="submit" disabled={loading}
        className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer"
      >
        {loading ? <Loader2 className="animate-spin" /> : <>{t("signIn")} <ArrowRight size={20} /></>}
      </button>

      <div className="text-center pt-6 text-foreground/40 text-sm font-medium">
        {t("noAccount")}{" "}
        <Link href="/register" className="text-primary font-bold hover:underline">{t("applyMembership")}</Link>
      </div>
    </form>
  );
}
