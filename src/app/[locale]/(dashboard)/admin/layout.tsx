"use client";

import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Menu } from "lucide-react";
import { KnockNotifications } from "@/components/KnockNotifications";
import { LanguageToggle } from "@/components/LanguageToggle";
import { DashboardSearch } from "@/components/DashboardSearch";

import { useTranslations } from "next-intl";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("Dashboard.admin.overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProtectedRoute
      requiredRole={["Admin", "Super Admin", "IT Officer", "Finance Officer"]}
    >
      <div className="flex min-h-screen bg-primary/[0.02]">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-x-hidden min-h-screen">
          <header className="flex lg:hidden items-center justify-between p-6 bg-[#0A1A14] text-white sticky top-0 z-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-white/10">
                <img src="/logo.svg" alt="SUPKEM Logo" className="w-5 h-5" />
              </div>
              <span className="font-outfit font-black tracking-tight tracking-widest text-xs uppercase">
                {t("adminHeading")}
              </span>
            </div>
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <KnockNotifications />
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 hover:bg-white/5 rounded-xl transition-colors"
              >
                <Menu size={24} />
              </button>
            </div>
          </header>

          <header className="hidden lg:flex items-center justify-between px-10 py-6 border-b border-border/10 bg-white/50 backdrop-blur-md sticky top-0 z-40">
            <DashboardSearch />
            <div className="flex items-center gap-4">
              <LanguageToggle />
              <KnockNotifications />
            </div>
          </header>

          <div className="p-4 md:p-10">
            <div className="max-w-7xl mx-auto uppercase tracking-widest text-[10px] font-black text-foreground/20 mb-2">
              {t("adminSubheading")}
            </div>
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
