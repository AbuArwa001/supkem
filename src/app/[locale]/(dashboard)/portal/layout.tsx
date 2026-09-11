"use client";

import { useState } from "react";
import PortalSidebar from "@/components/PortalSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Menu } from "lucide-react";
import { KnockNotifications } from "@/components/KnockNotifications";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DashboardSearch } from "@/components/DashboardSearch";
import { UserNavDropdown } from "@/components/UserNavDropdown";

import { useTranslations } from "next-intl";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Dashboard.portal.nav");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-primary/[0.02] print:block print:min-h-0 print:bg-white">
        <PortalSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-x-hidden min-h-screen print:min-h-0 print:overflow-visible">
          {/* Mobile Header */}
          <header className="lg:hidden flex items-center justify-between p-6 bg-[#0A1A14] text-white sticky top-0 z-50 border-b-2 border-secondary/20 shadow-xl shadow-black/10 no-print print:hidden">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 backdrop-blur-sm">
                <img src="/logo.svg" alt="SUPKEM Logo" className="w-5 h-5 brightness-0 invert" />
              </div>
              <span className="font-outfit font-black tracking-widest text-xs uppercase text-white/90">
                {t("portalHeading")}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/10 p-1.5 rounded-full border border-white/10">
                <KnockNotifications basePath="/portal/applications" />
              </div>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors border border-transparent hover:border-white/20"
              >
                <Menu size={24} />
              </button>
            </div>
          </header>

          <header className="hidden lg:flex items-center justify-between px-10 py-5 bg-[#0A1A14] text-white border-b-2 border-secondary/20 shadow-xl shadow-black/5 sticky top-0 z-40 bg-[url('/noise.png')] bg-blend-overlay no-print print:hidden">
            <DashboardSearch />
            <div className="flex items-center gap-6">
              <LanguageToggle />
              <div className="flex items-center gap-5">
                <div className="relative pt-1 bg-white/10 p-1.5 rounded-full border border-white/10 hover:bg-white/20 transition-colors">
                  <KnockNotifications basePath="/portal/applications" />
                </div>
                <UserNavDropdown />
              </div>
            </div>
          </header>

          <div className="p-4 md:p-10 print:p-0">
            <div className="max-w-7xl mx-auto uppercase tracking-widest text-[10px] font-black text-foreground/20 mb-2 no-print print:hidden">
              {t("portalSubheading")}
            </div>
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
