"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  User,
  Mail,
  Lock,
  Phone,
  ArrowRight,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import api from "@/lib/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/users/users/", formData);
      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch (err: any) {
      console.error("Registration failed", err);
      setError(
        err.response?.data?.detail ||
        "Registration failed. Please check your details and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
          <h2 className="text-3xl font-bold font-outfit text-primary">
            Application Received!
          </h2>
          <p className="text-foreground/60 leading-relaxed font-medium">
            Your account has been created. Please log in to complete your
            organization registration and application.
          </p>
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

  return (
    <div className="min-h-screen py-20 px-6 bg-primary/[0.02] relative overflow-hidden flex items-center justify-center">
      {/* Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl space-y-10"
      >
        <div className="text-center space-y-10">
          <div className="flex flex-col items-center space-y-4">
            <Link
              href="/"
              className="group transition-transform hover:scale-110 duration-500"
            >
              <div className="relative w-32 h-32 mb-2">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors animate-pulse" />
                <Image
                  src="/logo.svg"
                  alt="SUPKEM Logo"
                  fill
                  className="relative z-10 drop-shadow-2xl object-contain"
                />
              </div>
            </Link>
            <div className="space-y-1">
              <h2 className="text-3xl font-black font-outfit text-primary tracking-tighter uppercase">
                SUPKEM
              </h2>
              <div className="h-1 w-12 bg-secondary rounded-full mx-auto" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-bold font-outfit text-primary tracking-tight">
              Join the Council
            </h1>
            <p className="text-foreground/60 text-lg font-medium max-w-lg mx-auto leading-relaxed">
              Create your account to start organization registration and access
              official Muslim services in Kenya.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="p-10 lg:p-16 rounded-[20px] bg-white border border-border shadow-2xl space-y-8 relative"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100"
            >
              {error}
            </motion.div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">
                First Name
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  required
                  value={formData.first_name}
                  onChange={(e) =>
                    setFormData({ ...formData, first_name: e.target.value })
                  }
                  className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="Abdullah"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">
                Middle Name (Optional)
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  value={formData.middle_name}
                  onChange={(e) =>
                    setFormData({ ...formData, middle_name: e.target.value })
                  }
                  className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="Mohammed"
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">
                Last Name / Surname
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  required
                  value={formData.last_name}
                  onChange={(e) =>
                    setFormData({ ...formData, last_name: e.target.value })
                  }
                  className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="Hassan"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="abdullah@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">
                Phone Number
              </label>
              <div className="relative group">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="+254 7XX XXX XXX"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">
                Create Password
              </label>
              <div className="relative group">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/30 group-focus-within:text-primary transition-colors"
                  size={20}
                />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-xl hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  Complete Enrollment <ArrowRight size={22} />
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-6 text-foreground/40 text-sm font-medium">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              Log in here
            </Link>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
