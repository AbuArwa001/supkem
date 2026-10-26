import { RefreshCw } from "lucide-react";
import { PlatformIcon } from "./SocialPlatformIcons";
import { SocialPlatform } from "./types";

interface SocialMediaWallHeaderProps {
  title: string;
  subtitle: string;
  isRefreshing: boolean;
  onRefresh: () => void;
  channels: { id: string; name: string; url: string; hoverClass: string }[];
}

export function SocialMediaWallHeader({
  title,
  subtitle,
  isRefreshing,
  onRefresh,
  channels,
}: SocialMediaWallHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-slate-200/80">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Live Community Stream
          </span>
          <span className="text-slate-300">|</span>
          <span className="text-xs text-slate-500 font-medium">Auto-Synced</span>
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight font-outfit">
          {title}
        </h2>

        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {subtitle}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95 disabled:opacity-50"
          title="Refresh live stream"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshing ? "animate-spin" : ""}`} />
          <span>{isRefreshing ? "Refreshing..." : "Sync Feed"}</span>
        </button>

        {channels.length > 0 && (
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
            {channels.map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-xl transition-all hover:scale-110 ${item.hoverClass}`}
                title={`Follow on ${item.name}`}
              >
                <PlatformIcon platform={item.id as SocialPlatform} className="w-3.5 h-3.5" />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
