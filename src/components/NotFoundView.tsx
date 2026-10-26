"use client";

import { cn } from "@/lib/utils";
import { NotFoundLatticeBackground } from "./notFound/NotFoundLatticeBackground";
import { NotFoundHeader } from "./notFound/NotFoundHeader";
import { NotFoundEmblem } from "./notFound/NotFoundEmblem";
import { NotFoundSearch } from "./notFound/NotFoundSearch";
import { NotFoundDestinationsGrid } from "./notFound/NotFoundDestinationsGrid";
import { NotFoundActions } from "./notFound/NotFoundActions";
import { NotFoundFooter } from "./notFound/NotFoundFooter";
import { useNotFoundLogic } from "./notFound/useNotFoundLogic";

interface NotFoundViewProps {
  forcedLocale?: "en" | "ar";
  isStandalone?: boolean;
}

export default function NotFoundView({ forcedLocale, isStandalone = true }: NotFoundViewProps) {
  const {
    currentPath, copied, searchQuery, setSearchQuery, isRtl, dict,
    filteredDestinations, getHref, handleCopyUrl, handleGoBack, handleSearchKeyDown,
  } = useNotFoundLogic(forcedLocale);

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-screen bg-[#06140E] text-slate-100 flex flex-col justify-between relative overflow-hidden font-inter selection:bg-[#C9A050]/30 selection:text-white"
    >
      <NotFoundLatticeBackground />
      {isStandalone && <NotFoundHeader isRtl={isRtl} dict={dict} onGoBack={handleGoBack} getHref={getHref} />}

      <main className={cn("relative z-10 max-w-5xl w-full mx-auto px-6 flex-1 flex flex-col items-center justify-center text-center", isStandalone ? "py-12" : "py-16 sm:py-24")}>
        <NotFoundEmblem badge={dict.badge} title={dict.title} description={dict.description} />
        <NotFoundSearch searchQuery={searchQuery} onSearchChange={setSearchQuery} onKeyDown={handleSearchKeyDown} placeholder={dict.searchPlaceholder} pressEnterText={dict.pressEnter} />
        <NotFoundDestinationsGrid destinations={filteredDestinations} quickNavigationLabel={dict.quickNavigation} noMatchesText={dict.noMatches} returnHomeLabel={dict.returnHome} searchQuery={searchQuery} getHref={getHref} />
        <NotFoundActions dict={dict} isRtl={isRtl} currentPath={currentPath} copied={copied} onGoBack={handleGoBack} onCopyUrl={handleCopyUrl} getHref={getHref} />
      </main>

      {isStandalone && <NotFoundFooter isRtl={isRtl} getHref={getHref} />}
    </div>
  );
}
