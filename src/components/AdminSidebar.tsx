"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  FileText,
  Award,
  Users,
  Settings,
  LogOut,
  ChevronRight,
  User,
  Video,
  ShieldCheck,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

const AdminSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose?: () => void;
}) => {
  const t = useTranslations("Dashboard.admin.nav");
  const tp = useTranslations("Dashboard.portal.nav");
  const locale = useLocale();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { name: t("overview"), href: "/admin", icon: LayoutDashboard },
    { name: t("organizations"), href: "/admin/organizations", icon: Building2 },
    { name: t("applications"), href: "/admin/applications", icon: FileText },
    { name: t("certificates"), href: "/admin/certificates", icon: Award },
    { name: t("newsCms"), href: "/admin/news", icon: FileText },
    { name: t("newsPapers"), href: "/admin/news-papers", icon: FileText },
    { name: t("leadership"), href: "/admin/leadership", icon: Users },
    { name: t("videoBriefings"), href: "/admin/videos", icon: Video },
    { name: t("services"), href: "/admin/services", icon: Settings },
    { name: t("users"), href: "/admin/users", icon: Users },
    { name: t("settings"), href: "/admin/settings", icon: Settings },
  ];

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 300,
        }}
        className={cn(
          "h-screen sticky top-0 bg-[#0A1A14] border-r ltr:border-r rtl:border-l border-white/5 flex flex-col z-[60] text-slate-300 overflow-x-hidden",
          "fixed lg:sticky",
          isOpen ? "translate-x-0" : "ltr:-translate-x-full rtl:translate-x-full lg:translate-x-0",
        )}
      >
        {/* Retract Toggle Button (Desktop) */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden lg:flex absolute ltr:-right-3 rtl:-left-3 top-20 w-6 h-6 bg-primary rounded-full items-center justify-center border border-white/10 text-white z-[70] transition-transform hover:scale-110"
        >
          <ChevronRight
            size={14}
            className={cn(
              "transition-transform duration-300",
              !isCollapsed && "ltr:rotate-180 rtl:rotate-0",
              !isCollapsed && locale === 'ar' && "rotate-180",
            )}
          />
        </button>

        {/* Mobile Close Button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-6 ltr:right-6 rtl:left-6 p-2 text-white/40 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        {/* Logo Area */}
        <Link
          href="/"
          className={cn(
            "p-8 pb-6 flex items-center gap-4 cursor-pointer overflow-hidden",
            isCollapsed && "p-4 justify-center",
          )}
        >
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 shadow-lg group">
            <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/40 transition-colors" />
            <Image
              src="/logo.svg"
              alt="Logo"
              width={28}
              height={28}
              className="relative z-10"
            />
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <p className="font-outfit font-black text-white text-xl tracking-tight leading-none">
                SUPKEM
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-400/80 mt-1">
                {t("administrator")}
              </p>
            </motion.div>
          )}
        </Link>

        {/* Navigation */}
        <nav
          className={cn(
            "flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar flex flex-col",
            isCollapsed && "items-center px-2",
          )}
        >
          {!isCollapsed && (
            <div className="px-4 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {t("mainMenu")}
              </p>
            </div>
          )}
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center justify-between px-4 py-3.5 rounded-2xl font-medium transition-all group relative overflow-hidden shrink-0",
                  isActive
                    ? "text-white shadow-lg"
                    : "text-white/50 hover:bg-white/5 hover:text-white",
                  isCollapsed ? "p-0 justify-center h-12 w-12" : "w-full",
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 opacity-90" />
                )}
                <div
                  className={cn(
                    "flex items-center gap-4 relative z-10 shrink-0",
                    isCollapsed
                      ? "justify-center w-full"
                      : "w-full justify-start",
                  )}
                >
                  <item.icon
                    size={20}
                    className={cn(
                      "transition-colors shrink-0",
                      isActive
                        ? "text-amber-400"
                        : "opacity-60 group-hover:opacity-100 group-hover:text-amber-400/70",
                    )}
                  />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  )}
                </div>
                {isActive && !isCollapsed && (
                  <ChevronRight
                    size={16}
                    className="relative z-10 text-white/50"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Area */}
        <div
          className={cn(
            "p-6 border-t border-white/5 bg-white/[0.02]",
            isCollapsed && "p-4",
          )}
        >
          <div
            className={cn(
              "flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 shadow-inner mb-4 overflow-hidden",
              isCollapsed &&
                "p-0 h-10 w-10 mx-auto justify-center rounded-full",
            )}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-black shrink-0 shadow-md">
              <ShieldCheck size={20} />
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="overflow-hidden"
              >
                <p className="font-bold text-white truncate text-sm leading-tight">
                  {user?.full_name || tp("member")}
                </p>
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest truncate mt-0.5">
                  {user?.role?.role_name || t("administrator")}
                </p>
              </motion.div>
            )}
          </div>

          <button
            onClick={logout}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-red-400/80 hover:bg-red-500/10 hover:text-red-400 transition-all group",
              isCollapsed && "justify-center px-0 h-12 w-12 mx-auto",
            )}
          >
            <LogOut
              size={18}
              className="group-hover:-translate-x-1 transition-transform shrink-0"
            />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-sm"
              >
                {tp("signOut")}
              </motion.span>
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;
