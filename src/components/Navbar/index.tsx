"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useNavbarLogic } from "./useNavbarLogic";
import { DesktopLinks } from "./_components/DesktopLinks";
import { AuthButtons } from "./_components/AuthButtons";
import { LanguageToggle } from "./_components/LanguageToggle";
import { MobileMenuButton } from "./_components/MobileMenuButton";
import { MobileMenu } from "./_components/MobileMenu";
import { ArabicComingSoonModal } from "./_components/ArabicComingSoonModal";

const Navbar = () => {
  const logic = useNavbarLogic();
  const { scrolled } = logic;

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-3 px-4 sm:px-6",
          scrolled
            ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.05)]"
            : "bg-transparent",
        )}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center rounded-2xl transition-all duration-500">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-white/80 to-white/40 border border-white/60 flex items-center justify-center overflow-hidden shrink-0 shadow-sm group-hover:shadow-md group-hover:-translate-y-0.5 transition-all">
              <Image
                src="/logo.svg"
                alt="SUPKEM Logo"
                width={24}
                height={24}
                className="relative z-10 group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <span
              className={cn(
                "text-xl font-black tracking-tight transition-colors duration-300 font-outfit",
                scrolled ? "text-slate-900" : "text-slate-900 drop-shadow-sm",
              )}
            >
              SUPKEM
            </span>
          </Link>

          <DesktopLinks logic={logic} />

          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle logic={logic} />
            <AuthButtons logic={logic} />
          </div>

          <MobileMenuButton logic={logic} />
        </div>

        <MobileMenu logic={logic} />
      </nav>

      <ArabicComingSoonModal logic={logic} />
    </>
  );
};

export default Navbar;
