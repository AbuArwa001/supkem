"use client";

import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/routing";
import {
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  Loader2,
  AlertCircle,
  MapPin,
  ChevronDown,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { PasswordInput } from "@/components/ui/password-input";
import { RegisterFormData, FieldErrors } from "./types";
import { useTranslations } from "next-intl";
import { scrollToFirstError } from "@/app/[locale]/(dashboard)/portal/applications/new/_utils/formScrollUtils";

const KENYA_COUNTIES = [
  "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
  "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru",
  "Tharaka-Nithi", "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua",
  "Nyeri", "Kirinyaga", "Murang'a", "Kiambu", "Turkana", "West Pokot",
  "Samburu", "Trans-Nzoia", "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo",
  "Laikipia", "Nakuru", "Narok", "Kajiado", "Kericho", "Bomet",
  "Kakamega", "Vihiga", "Bungoma", "Busia", "Siaya", "Kisumu",
  "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];

interface RegisterFormProps {
  formData: RegisterFormData;
  setFormData: (data: RegisterFormData) => void;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string;
  fieldErrors?: FieldErrors;
  onFieldChange?: (field: keyof RegisterFormData, value: string) => void;
}

export function RegisterForm({
  formData,
  setFormData,
  onSubmit,
  loading,
  error,
  fieldErrors = {},
  onFieldChange,
}: RegisterFormProps) {
  const t = useTranslations("Auth.register");

  const handleChange = (field: keyof RegisterFormData, value: string) => {
    if (onFieldChange) {
      onFieldChange(field, value);
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  // Password strength calculation
  const passwordStrength = useMemo(() => {
    const pwd = formData.password || "";
    if (!pwd) return { score: 0, label: "", color: "bg-slate-200" };
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 1;

    if (score <= 1) return { score: 25, label: "Weak", color: "bg-rose-500", textColor: "text-rose-500" };
    if (score === 2) return { score: 50, label: "Fair", color: "bg-amber-500", textColor: "text-amber-500" };
    if (score === 3) return { score: 75, label: "Good", color: "bg-blue-500", textColor: "text-blue-500" };
    return { score: 100, label: "Strong", color: "bg-emerald-500", textColor: "text-emerald-500" };
  }, [formData.password]);

  const passwordsMatch = useMemo(() => {
    if (!formData.confirm_password) return null;
    return formData.password === formData.confirm_password;
  }, [formData.password, formData.confirm_password]);

  const activeErrors = Object.entries(fieldErrors).filter(([_, v]) => !!v);

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="p-8 sm:p-12 lg:p-14 rounded-[32px] bg-white/95 backdrop-blur-md border border-slate-200/90 shadow-2xl shadow-slate-300/40 space-y-10 relative"
    >
      {/* Top Floating / Summary Error Banner */}
      {(error || activeErrors.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 sm:p-5 bg-gradient-to-r from-rose-50 via-red-50 to-rose-50 text-rose-800 rounded-2xl text-sm font-semibold border border-rose-200/90 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs">
              <AlertCircle size={18} />
            </div>
            <div>
              <p className="font-bold text-rose-900 font-outfit">
                {error || `Please review ${activeErrors.length} required field${activeErrors.length === 1 ? "" : "s"}`}
              </p>
              {activeErrors.length > 0 && (
                <p className="text-xs text-rose-700/80 mt-0.5">
                  {activeErrors[0][1]}
                </p>
              )}
            </div>
          </div>
          {activeErrors.length > 0 && (
            <button
              type="button"
              onClick={() => scrollToFirstError(fieldErrors)}
              className="px-3.5 py-1.5 bg-white hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 shadow-xs shrink-0 self-end sm:self-auto cursor-pointer"
            >
              Fix first issue
            </button>
          )}
        </motion.div>
      )}

      {/* SECTION 1: Personal Identity */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
            <User size={18} />
          </div>
          <div>
            <h3 className="text-base font-black font-outfit text-slate-800 uppercase tracking-wider">
              1. Personal Identity
            </h3>
            <p className="text-xs text-slate-400 font-medium">As stated on your National ID or Passport</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div
            data-error-field="first_name"
            id="field-first_name"
            className="space-y-2"
          >
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                {t("firstName")} <span className="text-rose-500 font-bold">*</span>
              </label>
            </div>
            <div className="relative group">
              <User
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  fieldErrors.first_name
                    ? "text-rose-400"
                    : "text-slate-400 group-focus-within:text-primary"
                }`}
                size={18}
              />
              <input
                required
                name="first_name"
                value={formData.first_name}
                onChange={(e) => handleChange("first_name", e.target.value)}
                className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
                  fieldErrors.first_name ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                }`}
                placeholder="e.g. Abdullah"
              />
            </div>
            <AnimatePresence>
              {fieldErrors.first_name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                >
                  <AlertCircle size={13} /> {fieldErrors.first_name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Middle Name */}
          <div
            data-error-field="middle_name"
            id="field-middle_name"
            className="space-y-2"
          >
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-black text-slate-600 uppercase tracking-wider">
                {t("middleName")}
              </label>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-md">
                Optional
              </span>
            </div>
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors"
                size={18}
              />
              <input
                name="middle_name"
                value={formData.middle_name}
                onChange={(e) => handleChange("middle_name", e.target.value)}
                className="w-full bg-slate-50/70 border border-slate-200/90 rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs"
                placeholder="e.g. Mohammed"
              />
            </div>
          </div>

          {/* Last Name */}
          <div
            data-error-field="last_name"
            id="field-last_name"
            className="space-y-2 md:col-span-2"
          >
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                {t("lastName")} <span className="text-rose-500 font-bold">*</span>
              </label>
            </div>
            <div className="relative group">
              <User
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  fieldErrors.last_name
                    ? "text-rose-400"
                    : "text-slate-400 group-focus-within:text-primary"
                }`}
                size={18}
              />
              <input
                required
                name="last_name"
                value={formData.last_name}
                onChange={(e) => handleChange("last_name", e.target.value)}
                className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
                  fieldErrors.last_name ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                }`}
                placeholder="e.g. Hassan"
              />
            </div>
            <AnimatePresence>
              {fieldErrors.last_name && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                >
                  <AlertCircle size={13} /> {fieldErrors.last_name}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SECTION 2: Contact & Location */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
            <Mail size={18} />
          </div>
          <div>
            <h3 className="text-base font-black font-outfit text-slate-800 uppercase tracking-wider">
              2. Contact &amp; County Information
            </h3>
            <p className="text-xs text-slate-400 font-medium">For official communications and accreditation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Email */}
          <div
            data-error-field="email"
            id="field-email"
            className="space-y-2"
          >
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                {t("email")} <span className="text-rose-500 font-bold">*</span>
              </label>
            </div>
            <div className="relative group">
              <Mail
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  fieldErrors.email
                    ? "text-rose-400"
                    : "text-slate-400 group-focus-within:text-primary"
                }`}
                size={18}
              />
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
                  fieldErrors.email ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                }`}
                placeholder="abdullah@example.com"
              />
            </div>
            <AnimatePresence>
              {fieldErrors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                >
                  <AlertCircle size={13} /> {fieldErrors.email}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Phone */}
          <div
            data-error-field="phone_number"
            id="field-phone_number"
            className="space-y-2"
          >
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                {t("phone")} <span className="text-rose-500 font-bold">*</span>
              </label>
            </div>
            <div className="relative group">
              <Phone
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  fieldErrors.phone_number
                    ? "text-rose-400"
                    : "text-slate-400 group-focus-within:text-primary"
                }`}
                size={18}
              />
              <input
                required
                name="phone_number"
                value={formData.phone_number}
                onChange={(e) => handleChange("phone_number", e.target.value)}
                className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-4 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
                  fieldErrors.phone_number ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                }`}
                placeholder="+254 7XX XXX XXX"
              />
            </div>
            <AnimatePresence>
              {fieldErrors.phone_number && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                >
                  <AlertCircle size={13} /> {fieldErrors.phone_number}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Location (County) */}
          <div
            data-error-field="location"
            id="field-location"
            className="space-y-2 md:col-span-2"
          >
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                County / Region <span className="text-rose-500 font-bold">*</span>
              </label>
            </div>
            <div className="relative group">
              <MapPin
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  fieldErrors.location
                    ? "text-rose-400"
                    : "text-slate-400 group-focus-within:text-primary"
                }`}
                size={18}
              />
              <select
                required
                name="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none appearance-none cursor-pointer font-semibold text-slate-800 text-sm shadow-xs ${
                  fieldErrors.location ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                } ${!formData.location && "text-slate-400 font-normal"}`}
              >
                <option value="" disabled>Select your county in Kenya</option>
                {KENYA_COUNTIES.map((county) => (
                  <option key={county} value={county} className="text-slate-800 font-medium">
                    {county} County
                  </option>
                ))}
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={18}
              />
            </div>
            <AnimatePresence>
              {fieldErrors.location && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                >
                  <AlertCircle size={13} /> {fieldErrors.location}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SECTION 3: Account Security */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/15 shadow-xs">
            <Lock size={18} />
          </div>
          <div>
            <h3 className="text-base font-black font-outfit text-slate-800 uppercase tracking-wider">
              3. Account Security
            </h3>
            <p className="text-xs text-slate-400 font-medium">Create a strong password to protect your account</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Password */}
          <div
            data-error-field="password"
            id="field-password"
            className="space-y-2"
          >
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                {t("createPassword")} <span className="text-rose-500 font-bold">*</span>
              </label>
              {passwordStrength.label && (
                <span className={`text-[10px] font-black uppercase tracking-wider ${passwordStrength.textColor}`}>
                  {passwordStrength.label}
                </span>
              )}
            </div>
            <div className="relative group">
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  fieldErrors.password
                    ? "text-rose-400"
                    : "text-slate-400 group-focus-within:text-primary"
                }`}
                size={18}
              />
              <PasswordInput
                required
                name="password"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
                  fieldErrors.password ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                }`}
                placeholder="Minimum 8 characters"
              />
            </div>

            {/* Password strength meter bar */}
            {formData.password && (
              <div className="space-y-1 pt-1 ml-1">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${passwordStrength.score}%` }}
                  />
                </div>
              </div>
            )}

            <AnimatePresence>
              {fieldErrors.password && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                >
                  <AlertCircle size={13} /> {fieldErrors.password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Confirm Password */}
          <div
            data-error-field="confirm_password"
            id="field-confirm_password"
            className="space-y-2"
          >
            <div className="flex items-center justify-between ml-1">
              <label className="text-xs font-black text-slate-600 uppercase tracking-wider flex items-center gap-1">
                {t("confirmPassword")} <span className="text-rose-500 font-bold">*</span>
              </label>
              {passwordsMatch !== null && (
                <span
                  className={`text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
                    passwordsMatch ? "text-emerald-600" : "text-rose-500"
                  }`}
                >
                  {passwordsMatch ? (
                    <>
                      <CheckCircle2 size={12} /> Match
                    </>
                  ) : (
                    "Mismatch"
                  )}
                </span>
              )}
            </div>
            <div className="relative group">
              <Lock
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${
                  fieldErrors.confirm_password
                    ? "text-rose-400"
                    : "text-slate-400 group-focus-within:text-primary"
                }`}
                size={18}
              />
              <PasswordInput
                required
                name="confirm_password"
                value={formData.confirm_password || ""}
                onChange={(e) => handleChange("confirm_password", e.target.value)}
                className={`w-full bg-slate-50/70 border rounded-2xl py-4 pl-12 pr-10 focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none font-semibold text-slate-800 text-sm shadow-xs ${
                  fieldErrors.confirm_password ? "border-rose-400 bg-rose-50/20" : "border-slate-200/90"
                }`}
                placeholder="Re-enter your password"
              />
            </div>
            <AnimatePresence>
              {fieldErrors.confirm_password && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-rose-500 font-semibold ml-1 flex items-center gap-1"
                >
                  <AlertCircle size={13} /> {fieldErrors.confirm_password}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Submission CTA */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={loading}
          className="w-full py-5 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] hover:bg-right text-white rounded-[24px] font-black text-lg sm:text-xl shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 flex items-center justify-center gap-3 disabled:opacity-50 transition-all duration-500 hover:scale-[1.01] active:scale-[0.99] cursor-pointer font-outfit"
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={22} />
              <span>Creating your account...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={22} />
              <span>{t("completeEnrollment")}</span>
              <ArrowRight size={22} />
            </>
          )}
        </button>
      </div>

      <div className="text-center pt-2 text-slate-400 text-sm font-medium">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/login" className="text-primary font-black hover:underline ml-1">
          {t("loginHere")}
        </Link>
      </div>
    </form>
  );
}
