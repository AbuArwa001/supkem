"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  Loader2,
  FileText,
  Award,
  Mail,
  Building2,
  Layers,
  Users,
  Compass,
  ArrowRight,
  CornerDownLeft,
  CheckCircle2,
  Clock,
  ExternalLink,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  type: "application" | "certificate" | "letter" | "organization" | "service" | "user" | "navigation";
  url: string;
  status?: string;
  serial_number?: string;
  display_id?: string;
}

interface GroupedResults {
  applications: SearchResultItem[];
  certificates: SearchResultItem[];
  letters: SearchResultItem[];
  organizations: SearchResultItem[];
  services: SearchResultItem[];
  users: SearchResultItem[];
}

export function DashboardSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [results, setResults] = useState<GroupedResults>({
    applications: [],
    certificates: [],
    letters: [],
    organizations: [],
    services: [],
    users: [],
  });

  const tc = useTranslations("Dashboard.common");
  const router = useRouter();
  const pathname = usePathname();
  const isPortal = pathname?.includes("/portal");

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Quick navigation recommendations based on current workspace
  const quickLinks: SearchResultItem[] = useMemo(() => {
    if (isPortal) {
      return [
        { id: "nav-portal-dash", title: "Portal Dashboard", subtitle: "My overview & quick actions", type: "navigation", url: "/portal" },
        { id: "nav-portal-apps", title: "My Applications", subtitle: "Track submitted & active applications", type: "navigation", url: "/portal/applications" },
        { id: "nav-portal-new", title: "Apply for a Service", subtitle: "Start new certificate, visa or letter request", type: "navigation", url: "/portal/applications/new" },
        { id: "nav-portal-certs", title: "My Certificates", subtitle: "View & download official certificates", type: "navigation", url: "/portal/certificates" },
        { id: "nav-portal-letters", title: "My Official Letters", subtitle: "View recommendation & support letters", type: "navigation", url: "/portal/letters" },
        { id: "nav-portal-inst", title: "Mosques & Institutions", subtitle: "Directory of registered bodies", type: "navigation", url: "/portal/institutions" },
      ];
    }
    return [
      { id: "nav-admin-dash", title: "Executive Overview", subtitle: "Command center & pipeline metrics", type: "navigation", url: "/admin" },
      { id: "nav-admin-apps", title: "Applications Registry", subtitle: "Review, approve & issue documents", type: "navigation", url: "/admin/applications" },
      { id: "nav-admin-certs", title: "Certificates Registry", subtitle: "Active, indefinite & expiring certificates", type: "navigation", url: "/admin/certificates" },
      { id: "nav-admin-letters", title: "Official Letters", subtitle: "Issued letters & recommendation registry", type: "navigation", url: "/admin/letters" },
      { id: "nav-admin-finance", title: "Finance & Payments", subtitle: "M-Pesa transaction ledger & revenue telemetry", type: "navigation", url: "/admin/finance" },
      { id: "nav-admin-users", title: "User Directory", subtitle: "Staff, normal users & RBAC control", type: "navigation", url: "/admin/users" },
      { id: "nav-admin-orgs", title: "Organizations & Mosques", subtitle: "Institutional database & approvals", type: "navigation", url: "/admin/organizations" },
      { id: "nav-admin-services", title: "Services Catalog", subtitle: "Configure fees, durations & requirements", type: "navigation", url: "/admin/services" },
    ];
  }, [isPortal]);

  // Global Keyboard Shortcut: Cmd+K / Ctrl+K or '/'
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced API Search
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setResults({
        applications: [],
        certificates: [],
        letters: [],
        organizations: [],
        services: [],
        users: [],
      });
      setLoading(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await api.get(`/search/?q=${encodeURIComponent(trimmed)}`);
        if (res.data?.results) {
          setResults(res.data.results);
        }
      } catch (err) {
        console.error("Global search request failed:", err);
      } finally {
        setLoading(false);
      }
    }, 280);

    return () => clearTimeout(timer);
  }, [query]);

  // Filter items by selected category tab
  const displayedItems = useMemo(() => {
    if (query.trim().length < 2) {
      return quickLinks;
    }

    const allItems: SearchResultItem[] = [];
    if (activeCategory === "all" || activeCategory === "applications") {
      allItems.push(...results.applications);
    }
    if (activeCategory === "all" || activeCategory === "certificates") {
      allItems.push(...results.certificates);
    }
    if (activeCategory === "all" || activeCategory === "letters") {
      allItems.push(...results.letters);
    }
    if (activeCategory === "all" || activeCategory === "organizations") {
      allItems.push(...results.organizations);
    }
    if (activeCategory === "all" || activeCategory === "services") {
      allItems.push(...results.services);
    }
    if (activeCategory === "all" || activeCategory === "users") {
      allItems.push(...results.users);
    }
    return allItems;
  }, [query, activeCategory, results, quickLinks]);

  // Handle keyboard navigation inside search palette
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev < displayedItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : displayedItems.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = displayedItems[highlightedIndex];
      if (selected) {
        handleSelectItem(selected);
      }
    }
  };

  const handleSelectItem = (item: SearchResultItem) => {
    setIsOpen(false);
    setQuery("");
    router.push(item.url);
  };

  const totalHits =
    results.applications.length +
    results.certificates.length +
    results.letters.length +
    results.organizations.length +
    results.services.length +
    results.users.length;

  const getItemIcon = (type: SearchResultItem["type"]) => {
    switch (type) {
      case "application":
        return <FileText className="w-4 h-4 text-amber-600" />;
      case "certificate":
        return <Award className="w-4 h-4 text-emerald-600" />;
      case "letter":
        return <Mail className="w-4 h-4 text-blue-600" />;
      case "organization":
        return <Building2 className="w-4 h-4 text-teal-600" />;
      case "service":
        return <Layers className="w-4 h-4 text-purple-600" />;
      case "user":
        return <Users className="w-4 h-4 text-indigo-600" />;
      case "navigation":
      default:
        return <Compass className="w-4 h-4 text-emerald-700" />;
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* Input container */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-700 transition-colors">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-emerald-700" />
          ) : (
            <Search className="h-4 w-4" />
          )}
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder={tc("search") || "Search platform..."}
          className="block w-full pl-10 pr-20 py-2.5 border border-slate-200/80 rounded-full leading-5 bg-white/95 text-slate-900 placeholder-slate-400 text-xs font-semibold focus:outline-none focus:ring-4 focus:ring-emerald-700/15 focus:border-emerald-700 focus:bg-white transition-all shadow-sm"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(0);
          }}
          onKeyDown={handleInputKeyDown}
        />

        {/* Shortcut Badge / Clear Button */}
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center gap-1.5 pointer-events-none">
          {query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults({ applications: [], certificates: [], letters: [], organizations: [], services: [], users: [] });
                inputRef.current?.focus();
              }}
              className="pointer-events-auto p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden lg:inline-flex items-center gap-0.5 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-slate-100/90 border border-slate-200 rounded-md">
              <span className="text-[11px]">⌘</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* Interactive Dropdown Palette */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-2 bg-white/98 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden z-50 flex flex-col max-h-[500px]"
          >
            {/* Category Filter Pills (When query is active) */}
            {query.trim().length >= 2 && totalHits > 0 && (
              <div className="px-3.5 pt-3 pb-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold scrollbar-none">
                {[
                  { key: "all", label: `All (${totalHits})` },
                  ...(results.applications.length > 0 ? [{ key: "applications", label: `Apps (${results.applications.length})` }] : []),
                  ...(results.certificates.length > 0 ? [{ key: "certificates", label: `Certs (${results.certificates.length})` }] : []),
                  ...(results.letters.length > 0 ? [{ key: "letters", label: `Letters (${results.letters.length})` }] : []),
                  ...(results.organizations.length > 0 ? [{ key: "organizations", label: `Orgs (${results.organizations.length})` }] : []),
                  ...(results.services.length > 0 ? [{ key: "services", label: `Services (${results.services.length})` }] : []),
                  ...(results.users.length > 0 ? [{ key: "users", label: `Users (${results.users.length})` }] : []),
                ].map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => {
                      setActiveCategory(tab.key);
                      setHighlightedIndex(0);
                    }}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-all ${
                      activeCategory === tab.key
                        ? "bg-emerald-800 text-white shadow-xs"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Results / Navigation List */}
            <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-50">
              {query.trim().length < 2 && (
                <div className="px-3 pt-2 pb-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 flex items-center gap-1.5">
                  <Compass size={12} className="text-emerald-700" />
                  <span>Platform Quick Navigation</span>
                </div>
              )}

              {displayedItems.length > 0 ? (
                displayedItems.map((item, index) => {
                  const isHighlighted = highlightedIndex === index;
                  return (
                    <div
                      key={`${item.type}-${item.id}`}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onClick={() => handleSelectItem(item)}
                      className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                        isHighlighted
                          ? "bg-emerald-50/80 border border-emerald-200/60 shadow-2xs"
                          : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-2xs ${
                            isHighlighted ? "bg-white" : "bg-slate-100"
                          }`}
                        >
                          {getItemIcon(item.type)}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-xs font-bold text-slate-900 truncate">
                              {item.title}
                            </p>
                            {item.status && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                                  item.status === "Approved"
                                    ? "bg-emerald-100 text-emerald-800"
                                    : item.status === "Submitted"
                                    ? "bg-blue-100 text-blue-800"
                                    : "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {item.status}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 text-slate-400">
                        {isHighlighted && (
                          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-lg border border-emerald-200/60 shadow-2xs">
                            Select <CornerDownLeft size={10} />
                          </span>
                        )}
                        <ArrowRight size={14} className={isHighlighted ? "text-emerald-700" : "text-slate-300"} />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-8 px-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                    <Search size={20} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">
                    No results found for &ldquo;{query}&rdquo;
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                    Try searching by certificate serial number, applicant name, service name, or mosque.
                  </p>
                </div>
              )}
            </div>

            {/* Footer Shortcut Bar */}
            <div className="px-4 py-2.5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-[10px] font-semibold text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">↑</kbd>
                  <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">↵</kbd>
                  to open
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1 py-0.5 bg-white border border-slate-200 rounded text-[9px]">esc</kbd>
                to close
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
