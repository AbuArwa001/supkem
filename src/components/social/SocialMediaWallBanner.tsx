import { Sparkles, ExternalLink } from "lucide-react";

interface SocialMediaWallBannerProps {
  primaryCtaChannel: { name: string; url: string } | null;
}

export function SocialMediaWallBanner({ primaryCtaChannel }: SocialMediaWallBannerProps) {
  return (
    <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
      <div className="space-y-1.5 text-center md:text-left">
        <h4 className="text-xl font-black font-outfit text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          Stay Connected With SUPKEM Worldwide
        </h4>
        <p className="text-sm text-emerald-100/80 max-w-xl leading-relaxed">
          Join over 100,000+ community members receiving official advisories, educational scholarships, and national updates across Kenya.
        </p>
      </div>

      {primaryCtaChannel && (
        <div className="flex items-center gap-3">
          <a
            href={primaryCtaChannel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-2xl bg-white text-emerald-950 font-bold text-xs hover:bg-emerald-50 transition-all hover:scale-105 shadow-lg flex items-center gap-2"
          >
            <span>Follow on {primaryCtaChannel.name}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}
    </div>
  );
}
