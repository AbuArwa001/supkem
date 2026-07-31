import { useState, useEffect } from "react";
import { usePathname, useRouter } from "@/i18n/routing";
import { useLocale } from "next-intl";

export function useLanguageToggleLogic() {
  const [showArabicComingSoon, setShowArabicComingSoon] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();
  const isArabicEnabled = process.env.NEXT_PUBLIC_ENABLE_ARABIC_API === "true";

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const closeComingSoon = () => setShowArabicComingSoon(false);

  return {
    showArabicComingSoon,
    mounted,
    locale,
    handleARClick,
    handleENClick,
    closeComingSoon,
  };
}
