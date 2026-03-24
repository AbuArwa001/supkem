"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowRight, Loader2 } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { RegisterFormData } from "./types";

interface RegisterFormProps {
  formData: RegisterFormData;
  setFormData: (data: RegisterFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
}

export function RegisterForm({ formData, setFormData, onSubmit, loading, error }: RegisterFormProps) {
  return (
    <form
      onSubmit={onSubmit}
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
            <PasswordInput
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full bg-primary/[0.02] border border-border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
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
  );
}
