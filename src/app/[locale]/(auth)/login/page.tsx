"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { getHomePath } from "@/lib/permissions";
import { AuthRedirectOverlay } from "../_components/AuthRedirectOverlay";
import { AuthLogoHeader } from "../_components/AuthLogoHeader";
import { LoginFormCard } from "./_components/LoginFormCard";
import { LoginBrandingHero } from "./_components/LoginBrandingHero";

export default function LoginPage() {
  const t = useTranslations("Auth.login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { login, loading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await login(email, password);
    if (res.success) {
      setSuccess(t("successMsg"));
      setIsRedirecting(true);
      setTimeout(() => {
        router.push(getHomePath(res.user));
      }, 2000);
    } else {
      setError(res.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex bg-white font-inter">
      <AuthRedirectOverlay
        isVisible={loading || isRedirecting}
        message={isRedirecting ? success : t("authenticating")}
      />

      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-md w-full mx-auto py-12 flex flex-col items-center text-center"
        >
          <AuthLogoHeader size="lg" />

          <div className="space-y-2 mb-10 w-full">
            <h1 className="text-4xl font-bold font-outfit text-primary tracking-tight">{t("heading")}</h1>
            <p className="text-foreground/60 text-lg">{t("subheading")}</p>
          </div>

          <LoginFormCard
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            success={success}
            isRedirecting={isRedirecting}
            loading={loading}
            onSubmit={handleSubmit}
          />
        </motion.div>
      </div>

      <LoginBrandingHero />
    </div>
  );
}
