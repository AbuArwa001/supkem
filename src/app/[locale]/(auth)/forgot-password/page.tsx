"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/routing";
import api from "@/lib/api";
import { useTranslations } from "next-intl";
import { AuthLogoHeader } from "../_components/AuthLogoHeader";
import { ForgotPasswordHero } from "./_components/ForgotPasswordHero";

export default function ForgotPasswordPage() {
  const t = useTranslations("Auth.forgotPassword");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      const res = await api.post("/users/users/request_password_reset/", { email });
      setMessage(res.data.detail || "If an account exists with this email, a reset link will be sent.");
    } catch (err: any) {
      setError(err.response?.data?.detail || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-inter">
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-md w-full mx-auto py-12 flex flex-col items-center text-center">
          <AuthLogoHeader size="md" />

          <div className="space-y-2 mb-10 w-full">
            <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">{t("heading")}</h1>
            <p className="text-foreground/60 text-lg">{t("subheading")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 w-full text-left">
            {error && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100">{error}</motion.div>}
            {message && <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="p-4 bg-green-50 text-green-600 rounded-2xl text-sm font-medium border border-green-100">{message}</motion.div>}

            {!message && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-black text-primary/40 uppercase tracking-[0.2em] ml-1">{t("emailLabel")}</label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/20 group-focus-within:text-primary transition-colors" size={20} />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none font-medium" placeholder="name@organization.org" />
                  </div>
                </div>
                <button type="submit" disabled={loading} className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-lg hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100 transition-all cursor-pointer">
                  {loading ? <Loader2 className="animate-spin" /> : <>{t("sendReset")} <ArrowRight size={20} /></>}
                </button>
              </>
            )}

            <div className="text-center pt-6">
              <Link href="/login" className="inline-flex items-center gap-2 text-primary font-bold hover:underline group">
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                {t("backToLogin")}
              </Link>
            </div>
          </form>
        </motion.div>
      </div>

      <ForgotPasswordHero />
    </div>
  );
}
