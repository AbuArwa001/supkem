"use client";

import { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Loader2, CheckCircle2, AlertCircle, MailCheck } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";

function VerifyEmailLogic() {
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
        await api.post("/users/verify_email/", { uid, token });
        setSuccess(true);
        setTimeout(() => {
          router.push("/login?verified=true");
        }, 3000);
      } catch (err: any) {
        console.error("Verification error:", err);
        setError(
          err.response?.data?.detail ||
            "Verification failed. The link may have expired or is invalid.",
        );
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Loader2 size={40} className="text-primary animate-spin" />
        </div>
        <h1 className="text-3xl font-bold text-primary font-outfit">
          Verifying Email...
        </h1>
        <p className="text-foreground/60">
          Please hold on while we securely confirm your email address.
        </p>
      </motion.div>
    );
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-6"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} className="text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-primary font-outfit">
          Email Verified!
        </h1>
        <p className="text-foreground/60">
          Your email has been successfully verified. Redirecting you to login...
        </p>
        <div className="pt-4">
          <Loader2 className="animate-spin text-primary mx-auto" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 flex flex-col items-center"
    >
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-2">
        <AlertCircle size={40} className="text-red-500" />
      </div>
      <h1 className="text-3xl font-bold text-primary font-outfit">
        Verification Failed
      </h1>
      <p className="text-foreground/60">{error}</p>
      <Link
        href="/login"
        className="mt-6 py-4 bg-primary text-white rounded-[24px] font-bold text-sm hover-lift transition-all inline-block shadow-xl shadow-primary/20 block w-full max-w-xs"
      >
        Return to Login
      </Link>
    </motion.div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex bg-white font-inter">
      {/* Left Side: Logic/Result */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-32 relative z-10 items-center">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="flex flex-col items-center space-y-4 mb-12">
            <Link
              href="/"
              className="group transition-transform hover:scale-110 duration-500"
            >
              <div className="relative w-20 h-20 mb-2">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl" />
                <Image
                  src="/logo.svg"
                  alt="SUPKEM Logo"
                  fill
                  className="relative z-10 drop-shadow-2xl object-contain"
                />
              </div>
            </Link>
            <div className="space-y-1 text-center">
              <h2 className="text-xl font-black font-outfit text-primary tracking-tighter uppercase">
                SUPKEM
              </h2>
              <div className="h-1 w-8 bg-secondary rounded-full mx-auto" />
            </div>
          </div>

          <Suspense
            fallback={
              <div className="flex flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary" size={48} />
                <p className="text-primary font-bold animate-pulse">
                  Running Verification...
                </p>
              </div>
            }
          >
            <VerifyEmailLogic />
          </Suspense>
        </div>
      </div>

      {/* Right Side: Visual Section */}
      <div className="hidden lg:flex flex-1 relative bg-primary overflow-hidden items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10 p-20 text-center space-y-8 max-w-2xl text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-block p-10 rounded-[60px] bg-white/10 border border-white/20 backdrop-blur-3xl"
          >
            <MailCheck size={80} className="text-secondary" />
          </motion.div>
          <h2 className="text-5xl font-bold font-outfit leading-tight">
            Digital Identity
          </h2>
          <p className="text-xl text-white/70 leading-relaxed font-light">
            Email verification ensures communication integrity and protects our
            digital community.
          </p>
        </div>
      </div>
    </div>
  );
}
