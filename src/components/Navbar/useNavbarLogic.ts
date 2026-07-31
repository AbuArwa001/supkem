import { useState, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import Cookies from "js-cookie";
import { NavbarLogicReturn } from "./types";

export const useNavbarLogic = (): NavbarLogicReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showArabicComingSoon, setShowArabicComingSoon] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const t = useTranslations("Navbar");
  const isArabicEnabled = process.env.NEXT_PUBLIC_ENABLE_ARABIC_API === "true";

  const handleARClick = () => {
    if (isArabicEnabled) {
      router.replace({ pathname }, { locale: "ar" });
    } else {
      setShowArabicComingSoon(true);
    }
  };

  const handleENClick = () => {
    if (isArabicEnabled) {
      router.replace({ pathname }, { locale: "en" });
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    setIsLoggedIn(!!Cookies.get("access_token"));
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("services"), href: "/services" },
    { name: t("news"), href: "/news" },
    { name: t("contact"), href: "/contact" },
  ];

  return {
    isOpen,
    setIsOpen,
    scrolled,
    isLoggedIn,
    showArabicComingSoon,
    setShowArabicComingSoon,
    pathname,
    locale,
    handleARClick,
    handleENClick,
    navLinks,
    t,
  };
};
