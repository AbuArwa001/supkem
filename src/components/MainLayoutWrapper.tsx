"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { cn } from "@/lib/utils";

interface MainLayoutWrapperProps {
  children: React.ReactNode;
}

const MainLayoutWrapper = ({ children }: MainLayoutWrapperProps) => {
  const pathname = usePathname();

  // Normalize pathname to handle localized routes like /en/login or /ar/portal
  const normalizedPath = pathname.replace(/^\/(en|ar)/, "") || "/";

  // Define routes that should NOT show the global Navbar and Footer
  const isDashboard =
    normalizedPath.startsWith("/admin") || normalizedPath.startsWith("/portal");
  const isAuth =
    normalizedPath.startsWith("/login") ||
    normalizedPath.startsWith("/register") ||
    normalizedPath.startsWith("/forgot-password") ||
    normalizedPath.startsWith("/reset-password") ||
    normalizedPath.startsWith("/verify-email");

  // We don't want the default padding/margin for dashboard routes as they have their own sidebars
  const showGlobalNav = !isDashboard && !isAuth;

  return (
    <>
      {showGlobalNav && <Navbar />}
      <main className={cn("min-h-screen", showGlobalNav ? "pt-20" : "")}>
        {children}
      </main>
      {showGlobalNav && <Footer />}
    </>
  );
};

export default MainLayoutWrapper;
