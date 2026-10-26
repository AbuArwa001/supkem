import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname } from "@/i18n/routing";
import api from "@/lib/api";
import { SearchResultItem, GroupedResults } from "./dashboardSearchTypes";
import { getQuickLinks } from "./quickLinks";

export function useDashboardSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [results, setResults] = useState<GroupedResults>({
    applications: [], certificates: [], letters: [], organizations: [], services: [], users: [],
  });

  const router = useRouter();
  const pathname = usePathname();
  const isPortal = pathname?.includes("/portal");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickLinks = useMemo(() => getQuickLinks(Boolean(isPortal)), [isPortal]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault(); inputRef.current?.focus(); setIsOpen(true);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault(); inputRef.current?.focus(); setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false); inputRef.current?.blur();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults({ applications: [], certificates: [], letters: [], organizations: [], services: [], users: [] });
      setLoading(false);
      return;
    }
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/search/?q=${encodeURIComponent(trimmed)}`);
        if (res.data?.results) setResults(res.data.results);
      } catch {
      } finally {
        setLoading(false);
      }
    }, 280);
    return () => clearTimeout(timer);
  }, [query]);

  const displayedItems = useMemo(() => {
    if (query.trim().length < 2) return quickLinks;
    const allItems: SearchResultItem[] = [];
    const keys: (keyof GroupedResults)[] = ["applications", "certificates", "letters", "organizations", "services", "users"];
    keys.forEach((k) => {
      if (activeCategory === "all" || activeCategory === k) allItems.push(...results[k]);
    });
    return allItems;
  }, [query, activeCategory, results, quickLinks]);

  const handleSelectItem = (item: SearchResultItem) => {
    setIsOpen(false); setQuery(""); router.push(item.url);
  };

  return {
    query, setQuery, isOpen, setIsOpen, loading, activeCategory, setActiveCategory,
    highlightedIndex, setHighlightedIndex, results, containerRef, inputRef,
    displayedItems, handleSelectItem,
  };
}
