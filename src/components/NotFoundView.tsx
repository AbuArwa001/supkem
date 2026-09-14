"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Home,
  ArrowLeft,
  ArrowRight,
  Search,
  ShieldCheck,
  Briefcase,
  UserCheck,
  Headphones,
  Copy,
  Check,
  ExternalLink,
  Compass,
  AlertCircle,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface NotFoundViewProps {
  forcedLocale?: "en" | "ar";
  isStandalone?: boolean;
}

const DICTIONARY = {
  en: {
    badge: "Error 404 • Resource Not Found",
    title: "Lost in the Digital Ummah?",
    description:
      "The page, document, or service link you are looking for has been moved, updated, or is no longer accessible on the national portal.",
    searchPlaceholder: "Search services, verification, news...",
    pressEnter: "Press Enter to jump",
    returnHome: "Return Home",
    goBack: "Go Back",
    quickNavigation: "Suggested Destinations",
    requestedUrl: "Requested URL",
    copyUrl: "Copy URL",
    urlCopied: "URL copied to clipboard",
    reportIssue: "Report Broken Link",
    noMatches: "No destination directly matches your search.",
    destinations: [
      {
        id: "verify",
        title: "Credential Verification",
        description: "Verify official certificates and letters in real-time",
        href: "/verify",
        icon: ShieldCheck,
        badge: "New Public Portal",
        accent: "emerald",
        keywords: ["verify", "certificate", "hash", "qr", "letter", "authenticity", "check"],
      },
      {
        id: "services",
        title: "Services Directory",
        description: "Institutional accreditation, Halal, Hajj/Umrah, & Marriages",
        href: "/services",
        icon: Briefcase,
        badge: "Core Catalog",
        accent: "gold",
        keywords: ["services", "halal", "hajj", "umrah", "marriage", "accreditation", "school", "mosque"],
      },
      {
        id: "portal",
        title: "Member & Citizen Portal",
        description: "Access ongoing applications, submit documents, & view profile",
        href: "/portal",
        icon: UserCheck,
        badge: "Dashboard",
        accent: "blue",
        keywords: ["portal", "login", "application", "dashboard", "account", "profile"],
      },
      {
        id: "contact",
        title: "Secretariat & Support",
        description: "Contact national headquarters or regional county offices",
        href: "/contact",
        icon: Headphones,
        badge: "Helpdesk",
        accent: "slate",
        keywords: ["contact", "support", "help", "email", "phone", "headquarters", "office"],
      },
    ],
  },
  ar: {
    badge: "خطأ 404 • الصفحة غير موجودة",
    title: "هل ضللت الطريق في الأمة الرقمية؟",
    description:
      "الصفحة أو الوثيقة أو رابط الخدمة الذي تبحث عنه قد تم نقله أو تحديثه أو لم يعد متوفراً عبر البوابة الوطنية.",
    searchPlaceholder: "ابحث في الخدمات، التحقق، الأخبار...",
    pressEnter: "اضغط Enter للانتقال",
    returnHome: "العودة للرئيسية",
    goBack: "الرجوع للخلف",
    quickNavigation: "وجهات مقترحة",
    requestedUrl: "الرابط المطلوب",
    copyUrl: "نسخ الرابط",
    urlCopied: "تم نسخ الرابط إلى الحافظة",
    reportIssue: "إبلاغ عن رابط معطل",
    noMatches: "لم يتم العثور على وجهة مطابقة لبحثك.",
    destinations: [
      {
        id: "verify",
        title: "التحقق من الوثائق",
        description: "التحقق المباشر من صحة شهادات وخطابات سوبكيم الرسمية",
        href: "/verify",
        icon: ShieldCheck,
        badge: "بوابة عامة",
        accent: "emerald",
        keywords: ["تحقق", "شهادة", "رمز", "باركود", "خطاب", "أصالة", "فحص"],
      },
      {
        id: "services",
        title: "دليل الخدمات",
        description: "الاعتماد المؤسسي، شهادات الحلال، الحج والعمرة، وتوثيق الزواج",
        href: "/services",
        icon: Briefcase,
        badge: "الدليل الشامل",
        accent: "gold",
        keywords: ["خدمات", "حلال", "حج", "عمرة", "زواج", "اعتماد", "مدرسة", "مسجد"],
      },
      {
        id: "portal",
        title: "بوابة الأعضاء والمواطنين",
        description: "متابعة الطلبات، تقديم المستندات، وإدارة الملف التعريفي",
        href: "/portal",
        icon: UserCheck,
        badge: "لوحة التحكم",
        accent: "blue",
        keywords: ["بوابة", "دخول", "طلب", "لوحة", "حساب", "ملف"],
      },
      {
        id: "contact",
        title: "الأمانة العامة والدعم",
        description: "تواصل مع المقر الرئيسي لسوبكيم أو المكاتب الإقليمية بالمحافظات",
        href: "/contact",
        icon: Headphones,
        badge: "المساعدة",
        accent: "slate",
        keywords: ["اتصال", "دعم", "مساعدة", "بريد", "هاتف", "المقر", "مكتب"],
      },
    ],
  },
};

export default function NotFoundView({ forcedLocale, isStandalone = true }: NotFoundViewProps) {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState("");
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [detectedLocale, setDetectedLocale] = useState<"en" | "ar">(forcedLocale || "en");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const path = window.location.pathname;
      setCurrentPath(path);
      if (!forcedLocale) {
        if (path.startsWith("/ar")) {
          setDetectedLocale("ar");
        } else {
          setDetectedLocale("en");
        }
      }
    }
  }, [forcedLocale]);

  const locale = forcedLocale || detectedLocale;
  const isRtl = locale === "ar";
  const dict = DICTIONARY[locale] || DICTIONARY.en;

  const filteredDestinations = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return dict.destinations;
    return dict.destinations.filter((d) => {
      const titleMatch = d.title.toLowerCase().includes(q);
      const descMatch = d.description.toLowerCase().includes(q);
      const kwMatch = d.keywords.some((kw) => kw.toLowerCase().includes(q));
      return titleMatch || descMatch || kwMatch;
    });
  }, [searchQuery, dict.destinations]);

  const getHref = (path: string) => {
    if (path.startsWith("http") || path.startsWith("mailto:")) return path;
    const clean = path.startsWith("/") ? path : `/${path}`;
    return `/${locale}${clean === "/" ? "" : clean}`;
  };

  const handleCopyUrl = async () => {
    if (typeof window !== "undefined") {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        toast.success(dict.urlCopied);
        setTimeout(() => setCopied(false), 2500);
      } catch {
        toast.error("Failed to copy URL");
      }
    }
  };

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      window.history.back();
    } else {
      router.push(getHref("/"));
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredDestinations.length > 0) {
        router.push(getHref(filteredDestinations[0].href));
      } else if (searchQuery.trim()) {
        router.push(getHref(`/services?search=${encodeURIComponent(searchQuery.trim())}`));
      }
    }
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#06140E] text-slate-100 flex flex-col justify-between relative overflow-hidden font-inter selection:bg-[#C9A050]/30 selection:text-white"
    >
      {/* Background Animated Gradient Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-[650px] h-[650px] rounded-full bg-emerald-600/30 blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full bg-amber-500/20 blur-[150px]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#0B4A2D]/20 rounded-full blur-[160px]" />

        {/* Subtle Islamic Lattice Background Geometry */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.03] text-emerald-300"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
        >
          <defs>
            <pattern id="islamic-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 80 40 L 40 80 L 0 40 Z M 0 0 L 40 40 L 0 80 M 80 0 L 40 40 L 80 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
              <circle cx="40" cy="40" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#islamic-grid)" />
        </svg>
      </div>

      {/* Top Header Bar (Only in standalone mode) */}
      {isStandalone && (
        <header className="relative z-10 w-full px-6 py-6 border-b border-white/5 bg-black/20 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <Link href={getHref("/")} className="flex items-center gap-3 group transition-transform hover:scale-[1.02]">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-amber-500/10 border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-lg shadow-emerald-950/50">
                <Image src="/logo.svg" alt="SUPKEM Logo" width={28} height={28} className="object-contain" priority />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold text-white tracking-wide font-outfit">SUPKEM</span>
                <span className="text-[10px] text-emerald-400/80 uppercase tracking-wider font-semibold">
                  {isRtl ? "المجلس الأعلى لمسلمي كينيا" : "Supreme Council of Kenya Muslims"}
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleGoBack}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                <span>{dict.goBack}</span>
              </button>
              <Link
                href={getHref("/")}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-600/30 hover:text-white transition-all shadow-sm"
              >
                <Home size={14} />
                <span>{dict.returnHome}</span>
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main
        className={cn(
          "relative z-10 max-w-5xl w-full mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center",
          isStandalone ? "py-12" : "py-16 sm:py-24"
        )}
      >
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-950/60 mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
          </span>
          <span className="text-xs font-bold tracking-wider uppercase">{dict.badge}</span>
        </motion.div>

        {/* 404 Visual Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative my-2 select-none"
        >
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-amber-500/15 to-emerald-500/10 blur-3xl rounded-full" />

          <div className="relative inline-flex items-center justify-center">
            <h1 className="text-[130px] sm:text-[180px] md:text-[220px] font-black font-outfit tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white/90 via-emerald-100/30 to-white/5 drop-shadow-2xl">
              404
            </h1>

            {/* Floating Compass Emblem */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                animate={{
                  y: [0, -12, 0],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-3xl bg-gradient-to-br from-emerald-900/70 via-[#0B4A2D]/80 to-slate-950/90 border border-emerald-400/30 backdrop-blur-2xl shadow-[0_15px_50px_rgba(11,74,45,0.6)] flex items-center justify-center relative group p-4 pointer-events-auto"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-amber-500/20 via-transparent to-emerald-400/20 opacity-60" />
                <div className="relative flex flex-col items-center justify-center text-center">
                  <Compass
                    size={56}
                    className="text-[#C9A050] drop-shadow-[0_0_15px_rgba(201,160,80,0.5)] group-hover:scale-110 transition-transform duration-500"
                    strokeWidth={1.5}
                  />
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-300/80 mt-2 font-outfit">
                    SUPKEM
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Text Copy */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl mx-auto space-y-4 mb-8"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-outfit text-white tracking-tight">
            {dict.title.includes("?") ? (
              <>
                {dict.title.split("?")[0]}?
              </>
            ) : (
              dict.title
            )}
          </h2>
          <p className="text-base sm:text-lg text-slate-300/80 font-normal leading-relaxed">
            {dict.description}
          </p>
        </motion.div>

        {/* Interactive Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-xl mb-10"
        >
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/30 via-[#C9A050]/40 to-emerald-500/30 rounded-2xl blur-sm opacity-50 group-hover:opacity-100 transition duration-500" />
            <div className="relative flex items-center bg-slate-950/80 backdrop-blur-xl border border-white/15 rounded-2xl px-4 py-3 shadow-2xl">
              <Search className="w-5 h-5 text-emerald-400 shrink-0 mr-3 rtl:mr-0 rtl:ml-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder={dict.searchPlaceholder}
                className="w-full bg-transparent text-white placeholder:text-slate-500 text-sm sm:text-base outline-none focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={16} />
                </button>
              )}
              <div className="hidden sm:flex items-center gap-1.5 pl-3 rtl:pl-0 rtl:pr-3 border-l rtl:border-l-0 rtl:border-r border-white/10 text-[11px] text-slate-400 font-mono shrink-0">
                <span>↵</span>
                <span className="text-[10px] uppercase">{dict.pressEnter}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Suggested Destinations Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full max-w-4xl"
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400/90 font-outfit">
              {dict.quickNavigation}
            </span>
            {searchQuery && (
              <span className="text-xs text-slate-400">
                {filteredDestinations.length} destination{filteredDestinations.length === 1 ? "" : "s"}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredDestinations.map((dest) => {
                const Icon = dest.icon;
                return (
                  <motion.div
                    key={dest.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={getHref(dest.href)}
                      className="group flex flex-col justify-between h-full p-4 rounded-2xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-950/30 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-950/40 text-left rtl:text-right"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#C9A050] group-hover:text-emerald-300 group-hover:bg-emerald-500/20 transition-colors">
                            <Icon size={20} />
                          </div>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-emerald-300 uppercase tracking-wider">
                            {dest.badge}
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors font-outfit mb-1">
                          {dest.title}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">{dest.description}</p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-emerald-400/70 group-hover:text-emerald-300 transition-colors">
                        <span className="font-semibold text-[11px]">{dict.returnHome.split(" ")[0]} →</span>
                        <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {filteredDestinations.length === 0 && (
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-3">
              <AlertCircle size={28} className="mx-auto text-amber-400 opacity-70" />
              <p className="text-sm text-slate-400">{dict.noMatches}</p>
              <Link
                href={getHref(`/services?search=${encodeURIComponent(searchQuery)}`)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600/30 border border-emerald-500/40 text-emerald-200 text-xs font-bold hover:bg-emerald-600/50 transition-colors"
              >
                <Search size={14} /> Search catalog for &ldquo;{searchQuery}&rdquo;
              </Link>
            </div>
          )}
        </motion.div>

        {/* Primary Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href={getHref("/")}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#0B4A2D] via-[#106A42] to-[#0B4A2D] border border-emerald-400/40 text-white font-bold text-sm shadow-xl shadow-emerald-950/60 hover:shadow-emerald-700/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2.5 font-outfit group"
          >
            <Home size={18} className="text-amber-300 group-hover:rotate-6 transition-transform" />
            <span>{dict.returnHome}</span>
          </Link>

          <Link
            href={getHref("/verify")}
            className="px-7 py-3.5 rounded-xl bg-white/5 border border-emerald-500/30 hover:bg-emerald-950/40 hover:border-emerald-400/50 text-emerald-300 font-semibold text-sm transition-all flex items-center gap-2.5 hover:scale-105"
          >
            <ShieldCheck size={18} className="text-emerald-400" />
            <span>{dict.destinations[0].title}</span>
          </Link>

          <button
            onClick={handleGoBack}
            className="px-6 py-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white font-medium text-sm transition-all cursor-pointer flex items-center gap-2"
          >
            {isRtl ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
            <span>{dict.goBack}</span>
          </button>
        </motion.div>

        {/* Technical Diagnostics Pill */}
        {currentPath && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-3 px-4 py-2 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-400 max-w-xl"
          >
            <span className="text-slate-500">{dict.requestedUrl}:</span>
            <code className="font-mono text-emerald-300 text-[11px] bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20 max-w-[260px] sm:max-w-[340px] truncate">
              {currentPath}
            </code>
            <button
              onClick={handleCopyUrl}
              className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors cursor-pointer ml-1"
            >
              {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
              <span>{copied ? dict.urlCopied : dict.copyUrl}</span>
            </button>
            <span className="text-slate-600">•</span>
            <a
              href={`mailto:support@supkem.org?subject=${encodeURIComponent("Broken Link Report: " + currentPath)}&body=${encodeURIComponent("I encountered a 404 error at: " + currentPath + "\n\nPlease investigate.")}`}
              className="text-[11px] text-amber-400/80 hover:text-amber-300 transition-colors"
            >
              {dict.reportIssue}
            </a>
          </motion.div>
        )}
      </main>

      {/* Footer Branding Bar (Only in standalone mode) */}
      {isStandalone && (
        <footer className="relative z-10 w-full px-6 py-6 border-t border-white/5 bg-black/30 backdrop-blur-md">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left rtl:sm:text-right">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Supreme Council of Kenya Muslims (SUPKEM)</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-500">Official National Portal</span>
            </div>

            <div className="flex items-center gap-5 text-xs text-slate-400">
              <Link href={getHref("/services")} className="hover:text-emerald-300 transition-colors">
                {isRtl ? "الخدمات" : "Services"}
              </Link>
              <Link href={getHref("/verify")} className="hover:text-emerald-300 transition-colors">
                {isRtl ? "التحقق" : "Verification"}
              </Link>
              <Link href={getHref("/news")} className="hover:text-emerald-300 transition-colors">
                {isRtl ? "الأخبار" : "News"}
              </Link>
              <Link href={getHref("/contact")} className="hover:text-emerald-300 transition-colors">
                {isRtl ? "اتصل بنا" : "Contact"}
              </Link>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
