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

  // Define routes that should NOT show the global Navbar and Footer
  const isDashboard =
    pathname.startsWith("/admin") || pathname.startsWith("/portal");
  const isAuth =
    pathname.startsWith("/login") ||
    pathname.startsWith("/register") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password") ||
    pathname.startsWith("/verify-email");

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
