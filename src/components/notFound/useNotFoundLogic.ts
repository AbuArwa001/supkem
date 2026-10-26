import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { DICTIONARY } from "./notFoundDictionary";

export function useNotFoundLogic(forcedLocale?: "en" | "ar") {
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
        setDetectedLocale(path.startsWith("/ar") ? "ar" : "en");
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
      return (
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.keywords.some((kw) => kw.toLowerCase().includes(q))
      );
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

  return {
    currentPath, copied, searchQuery, setSearchQuery, isRtl, dict,
    filteredDestinations, getHref, handleCopyUrl, handleGoBack, handleSearchKeyDown,
  };
}
