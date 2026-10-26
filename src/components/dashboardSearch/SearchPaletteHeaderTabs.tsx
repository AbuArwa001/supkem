import { GroupedResults } from "./dashboardSearchTypes";

interface SearchPaletteHeaderTabsProps {
  results: GroupedResults;
  activeCategory: string;
  onSelectCategory: (key: string) => void;
}

export function SearchPaletteHeaderTabs({
  results,
  activeCategory,
  onSelectCategory,
}: SearchPaletteHeaderTabsProps) {
  const totalHits =
    results.applications.length +
    results.certificates.length +
    results.letters.length +
    results.organizations.length +
    results.services.length +
    results.users.length;

  if (totalHits === 0) return null;

  const tabs = [
    { key: "all", label: `All (${totalHits})` },
    ...(results.applications.length > 0 ? [{ key: "applications", label: `Apps (${results.applications.length})` }] : []),
    ...(results.certificates.length > 0 ? [{ key: "certificates", label: `Certs (${results.certificates.length})` }] : []),
    ...(results.letters.length > 0 ? [{ key: "letters", label: `Letters (${results.letters.length})` }] : []),
    ...(results.organizations.length > 0 ? [{ key: "organizations", label: `Orgs (${results.organizations.length})` }] : []),
    ...(results.services.length > 0 ? [{ key: "services", label: `Services (${results.services.length})` }] : []),
    ...(results.users.length > 0 ? [{ key: "users", label: `Users (${results.users.length})` }] : []),
  ];

  return (
    <div className="px-3.5 pt-3 pb-2 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] font-bold scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          type="button"
          onClick={() => onSelectCategory(tab.key)}
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
  );
}
