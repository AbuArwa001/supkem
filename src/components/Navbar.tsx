"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X, LayoutDashboard, ChevronRight, Globe, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showArabicComingSoon, setShowArabicComingSoon] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        setIsLoggedIn(!!Cookies.get("access_token"));
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "News", href: "/news" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 px-4 sm:px-6",
                scrolled ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)]" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center rounded-2xl transition-all duration-500">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-white/80 to-white/40 border border-white/60 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all">
                        <Image src="/logo.svg" alt="SUPKEM Logo" width={24} height={24} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className={cn(
                        "text-xl font-black tracking-tight transition-colors duration-300 font-outfit",
                        scrolled ? "text-slate-900" : "text-slate-900 drop-shadow-sm"
                    )}>
                        SUPKEM
                    </span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1.5 p-1.5 rounded-full border transition-all duration-300"
                    style={{
                        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(12px)",
                        borderColor: scrolled ? "rgba(226, 232, 240, 0.8)" : "rgba(226, 232, 240, 0.6)"
                    }}
                >
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "px-5 py-2 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105",
                                    isActive
                                        ? "bg-slate-900 text-white shadow-md"
                                        : scrolled
                                            ? "text-slate-700 hover:text-slate-900 hover:bg-slate-900/5"
                                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-900/5"
                                )}
                            >
                                {link.name}
                            </Link>
                        )
                    })}
                </div>

                <div className="hidden md:flex items-center gap-4">
                    {/* Language Toggle */}
                    <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-full border border-slate-200">
                      <button 
                        className="px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 rounded-full shadow-sm"
                      >
                        EN
                      </button>
                      <button 
                        onClick={() => setShowArabicComingSoon(true)}
                        className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors"
                      >
                        AR
                      </button>
                    </div>

                    {isLoggedIn ? (
                        <Link
                            href="/admin"
                            className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all hover:scale-105 hover:shadow-lg hover:shadow-slate-900/20"
                        >
                            <LayoutDashboard size={16} />
                            Dashboard
                        </Link>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/login"
                                className={cn(
                                    "text-sm font-bold transition-all duration-300 px-4 py-2.5 rounded-full hover:bg-black/5",
                                    scrolled ? "text-slate-600 hover:text-slate-900" : "text-slate-700 hover:text-slate-900 hover:bg-slate-900/5"
                                )}
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className={cn(
                                    "px-7 py-2.5 rounded-full text-sm font-bold transition-all duration-500 hover:scale-105 shadow-md flex items-center gap-2 group",
                                    scrolled
                                        ? "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/20"
                                        : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-slate-900/20"
                                )}
                            >
                                Apply Now <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn(
                        "md:hidden p-2.5 rounded-full backdrop-blur-md border transition-all duration-300",
                        scrolled ? "bg-white/50 border-slate-200 text-slate-800" : "bg-white/80 border-slate-200 text-slate-900"
                    )}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-4 right-4 mt-2 bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl p-6 md:hidden flex flex-col gap-2 border border-slate-200/60 overflow-hidden"
                    >
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "text-lg font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-between group",
                                        isActive
                                            ? "bg-slate-900 text-white shadow-md"
                                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                    <ChevronRight size={16} className={cn(
                                        "transition-all group-hover:translate-x-1",
                                        isActive ? "text-white" : "text-slate-300 group-hover:text-slate-900"
                                    )} />
                                </Link>
                            )
                        })}

                        <div className="h-px bg-slate-100 my-4" />

                        <div className="flex flex-col gap-3">
                            <div className="flex items-center justify-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Language</p>
                                <div className="flex items-center gap-1 p-1 bg-white rounded-full border border-slate-200">
                                  <button className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white rounded-full">EN</button>
                                  <button 
                                    onClick={() => {
                                      setIsOpen(false);
                                      setShowArabicComingSoon(true);
                                    }}
                                    className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400"
                                  >
                                    AR
                                  </button>
                                </div>
                            </div>

                            <Link
                                href="/login"
                                className="text-center py-4 bg-slate-50 text-slate-700 rounded-2xl font-bold hover:bg-slate-100 transition-colors border border-slate-200"
                            >
                                Member Login
                            </Link>
                            <Link
                                href="/register"
                                className="text-center py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 flex items-center justify-center gap-2"
                            >
                                Apply Now <ChevronRight size={16} />
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>

        {/* Arabic Coming Soon Modal */}
        <AnimatePresence>
          {showArabicComingSoon && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setShowArabicComingSoon(false)}
                    className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                  />
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-white rounded-[32px] overflow-hidden shadow-2xl border border-white"
                  >
                    <div className="p-10 text-center space-y-6">
                      <div className="w-20 h-20 bg-emerald-50 rounded-[24px] flex items-center justify-center mx-auto mb-4 border border-emerald-100 rotate-6 group-hover:rotate-0 transition-transform duration-500">
                        <Languages size={40} className="text-[#0b4a2d]" />
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black font-outfit text-slate-900 tracking-tight">
                          Arabic Version <br/>Coming Soon
                        </h3>
                        <p className="text-slate-500 font-medium leading-relaxed">
                          We are currently engineering a full bilingual experience to better serve the global Muslim community. This feature will be launched as part of our upcoming Digital Transformation phase.
                        </p>
                        <p className="text-[#0b4a2d] font-bold leading-relaxed text-lg" dir="rtl">
                          نحن نعمل حالياً على تطوير تجربة كاملة ثنائية اللغة لخدمة المجتمع الإسلامي العالمي بشكل أفضل. سيتم إطلاق هذه الميزة كجزء من مرحلة التحول الرقمي القادمة.
                        </p>
                      </div>

                      <button 
                        onClick={() => setShowArabicComingSoon(false)}
                        className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 transition-all active:scale-95"
                      >
                        JazakAllah Khairan
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
