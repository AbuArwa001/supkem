"use client";

import { Search, Compass } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { useDashboardSearch } from "./dashboardSearch/useDashboardSearch";
import { SearchInputBar } from "./dashboardSearch/SearchInputBar";
import { SearchPaletteHeaderTabs } from "./dashboardSearch/SearchPaletteHeaderTabs";
import { SearchResultRow } from "./dashboardSearch/SearchResultRow";
import { SearchPaletteFooter } from "./dashboardSearch/SearchPaletteFooter";

export function DashboardSearch() {
  const {
    query, setQuery, isOpen, setIsOpen, loading, activeCategory, setActiveCategory,
    highlightedIndex, setHighlightedIndex, results, containerRef, inputRef,
    displayedItems, handleSelectItem,
  } = useDashboardSearch();

  const tc = useTranslations("Dashboard.common");

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <SearchInputBar
        inputRef={inputRef}
        query={query}
        loading={loading}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setIsOpen(true);
          setHighlightedIndex(0);
        }}
        onClear={() => { setQuery(""); inputRef.current?.focus(); }}
        placeholder={tc("search")}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute left-0 right-0 top-full mt-2 bg-white/98 backdrop-blur-xl border border-slate-100 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] overflow-hidden z-50 flex flex-col max-h-[500px]"
          >
            {query.trim().length >= 2 && (
              <SearchPaletteHeaderTabs results={results} activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
            )}

            <div className="overflow-y-auto p-2 space-y-1 divide-y divide-slate-50">
              {query.trim().length < 2 && (
                <div className="px-3 pt-2 pb-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 flex items-center gap-1.5">
                  <Compass size={12} className="text-emerald-700" />
                  <span>Platform Quick Navigation</span>
                </div>
              )}

              {displayedItems.length > 0 ? (
                displayedItems.map((item, index) => (
                  <SearchResultRow
                    key={`${item.type}-${item.id}`}
                    item={item}
                    isHighlighted={highlightedIndex === index}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onClick={() => handleSelectItem(item)}
                  />
                ))
              ) : (
                <div className="py-8 px-4 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
                    <Search size={20} />
                  </div>
                  <h4 className="text-xs font-bold text-slate-800">No results found for &ldquo;{query}&rdquo;</h4>
                  <p className="text-[11px] text-slate-500 mt-1 max-w-xs mx-auto">
                    Try searching by certificate serial number, applicant name, service name, or mosque.
                  </p>
                </div>
              )}
            </div>

            <SearchPaletteFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
