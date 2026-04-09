"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { User, Mail, Phone, Lock, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { RegisterFormData, FieldErrors } from "./types";
import { useTranslations } from "next-intl";

interface RegisterFormProps {
  formData: RegisterFormData;
  setFormData: (data: RegisterFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  fieldErrors?: FieldErrors;
}

export function RegisterForm({ formData, setFormData, onSubmit, loading, error, fieldErrors = {} }: RegisterFormProps) {
  const t = useTranslations("Auth.register");

  return (
    <form onSubmit={onSubmit} className="p-10 lg:p-16 rounded-[20px] bg-white border border-border shadow-2xl space-y-8 relative">
      {error && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
          className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm font-medium border border-red-100 flex items-center gap-2">
          <AlertCircle size={18} />
          {error}
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">{t("firstName")}</label>
          <div className="relative group">
            <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.first_name ? 'text-red-400' : 'text-primary/30 group-focus-within:text-primary'}`} size={20} />
            <input required value={formData.first_name}
              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
              className={`w-full bg-primary/[0.02] border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${fieldErrors.first_name ? 'border-red-300' : 'border-border'}`}
              placeholder="Abdullah" />
          </div>
          {fieldErrors.first_name && <p className="text-xs text-red-500 font-medium ml-1 flex items-center gap-1 mt-1">{fieldErrors.first_name}</p>}
        </div>

        {/* Middle Name */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">{t("middleName")}</label>
          <div className="relative group">
            <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.middle_name ? 'text-red-400' : 'text-primary/30 group-focus-within:text-primary'}`} size={20} />
            <input value={formData.middle_name}
              onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })}
              className={`w-full bg-primary/[0.02] border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${fieldErrors.middle_name ? 'border-red-300' : 'border-border'}`}
              placeholder="Mohammed" />
          </div>
          {fieldErrors.middle_name && <p className="text-xs text-red-500 font-medium ml-1 flex items-center gap-1 mt-1">{fieldErrors.middle_name}</p>}
        </div>

        {/* Last Name */}
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">{t("lastName")}</label>
          <div className="relative group">
            <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.last_name ? 'text-red-400' : 'text-primary/30 group-focus-within:text-primary'}`} size={20} />
            <input required value={formData.last_name}
              onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
              className={`w-full bg-primary/[0.02] border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${fieldErrors.last_name ? 'border-red-300' : 'border-border'}`}
              placeholder="Hassan" />
          </div>
          {fieldErrors.last_name && <p className="text-xs text-red-500 font-medium ml-1 flex items-center gap-1 mt-1">{fieldErrors.last_name}</p>}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">{t("email")}</label>
          <div className="relative group">
            <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.email ? 'text-red-400' : 'text-primary/30 group-focus-within:text-primary'}`} size={20} />
            <input type="text" required value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={`w-full bg-primary/[0.02] border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${fieldErrors.email ? 'border-red-300' : 'border-border'}`}
              placeholder="abdullah@example.com" />
          </div>
          {fieldErrors.email && <p className="text-xs text-red-500 font-medium ml-1 flex items-center gap-1 mt-1">{fieldErrors.email}</p>}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">{t("phone")}</label>
          <div className="relative group">
            <Phone className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.phone_number ? 'text-red-400' : 'text-primary/30 group-focus-within:text-primary'}`} size={20} />
            <input required value={formData.phone_number}
              onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              className={`w-full bg-primary/[0.02] border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${fieldErrors.phone_number ? 'border-red-300' : 'border-border'}`}
              placeholder="+254 7XX XXX XXX" />
          </div>
          {fieldErrors.phone_number && <p className="text-xs text-red-500 font-medium ml-1 flex items-center gap-1 mt-1">{fieldErrors.phone_number}</p>}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">{t("createPassword")}</label>
          <div className="relative group">
            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.password ? 'text-red-400' : 'text-primary/30 group-focus-within:text-primary'}`} size={20} />
            <PasswordInput required value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className={`w-full bg-primary/[0.02] border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${fieldErrors.password ? 'border-red-300' : 'border-border'}`}
              placeholder="••••••••" />
          </div>
          {fieldErrors.password && <p className="text-xs text-red-500 font-medium ml-1 flex items-center gap-1 mt-1">{fieldErrors.password}</p>}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary/60 uppercase tracking-widest ml-1">{t("confirmPassword")}</label>
          <div className="relative group">
            <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${fieldErrors.confirm_password ? 'text-red-400' : 'text-primary/30 group-focus-within:text-primary'}`} size={20} />
            <PasswordInput required value={formData.confirm_password || ""}
              onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
              className={`w-full bg-primary/[0.02] border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none ${fieldErrors.confirm_password ? 'border-red-300' : 'border-border'}`}
              placeholder="••••••••" />
          </div>
          {fieldErrors.confirm_password && <p className="text-xs text-red-500 font-medium ml-1 flex items-center gap-1 mt-1">{fieldErrors.confirm_password}</p>}
        </div>
      </div>

      <div className="pt-6">
        <button type="submit" disabled={loading}
          className="w-full py-5 bg-primary text-white rounded-[24px] font-bold text-xl hover-lift premium-gradient shadow-xl shadow-primary/20 flex items-center justify-center gap-3 disabled:opacity-50">
          {loading ? <Loader2 className="animate-spin" /> : <>{t("completeEnrollment")} <ArrowRight size={22} /></>}
        </button>
      </div>

      <div className="text-center pt-6 text-foreground/40 text-sm font-medium">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/login" className="text-primary font-bold hover:underline">{t("loginHere")}</Link>
      </div>
    </form>
  );
}
