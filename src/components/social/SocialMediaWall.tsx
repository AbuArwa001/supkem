"use client";

import React, { useState, useMemo, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SocialPlatform,
  SocialPost,
  SocialMediaWallProps,
  SocialWallConfig,
  WidgetProvider,
} from "./types";
import { OFFICIAL_CHANNELS } from "./socialData";
import { SocialPostCard } from "./SocialPostCard";
import { SocialMediaLightbox } from "./SocialMediaLightbox";
import { PlatformIcon } from "./SocialPlatformIcons";
import { SocialMediaSettings } from "@/lib/socialSettings";
import {
  Sparkles,
  RefreshCw,
  Search,
  LayoutGrid,
  SlidersHorizontal,
  ExternalLink,
  ChevronRight,
  Radio,
  Share2,
} from "lucide-react";

export function SocialMediaWall({
  className = "",
  variant = "full",
  initialPlatform = "all",
  title = "Live Social Media Wall",
  subtitle = "Official real-time updates, announcements, photos, and video briefings aggregated directly from SUPKEM's verified channels.",
  limit = 12,
  showFilters = true,
  showStats = true,
  config,
}: SocialMediaWallProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>(initialPlatform);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLightboxPost, setActiveLightboxPost] = useState<SocialPost | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [dynamicSettings, setDynamicSettings] = useState<SocialMediaSettings | null>(null);
  const [isPending, startTransition] = useTransition();

  // Immediate fetch of social settings on mount for fast resolution
  React.useEffect(() => {
    fetch("/api/social-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) {
          setDynamicSettings(data.settings);
        }
      })
      .catch(() => {});
  }, []);

  // Dynamic live fetch from /api/social-feed
  const fetchDynamicPosts = React.useCallback(async (platform?: string, search?: string) => {
    try {
      const params = new URLSearchParams();
      if (platform && platform !== "all") params.set("platform", platform);
      if (search) params.set("search", search);

      const res = await fetch(`/api/social-feed?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.settings) {
          setDynamicSettings(data.settings);
        }
        if (Array.isArray(data?.posts)) {
          setPosts(data.posts);
        } else {
          setPosts([]);
        }
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("Failed to load dynamic social feed:", err);
      setPosts([]);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  // Fetch dynamic posts on mount
  React.useEffect(() => {
    fetchDynamicPosts(selectedPlatform, searchQuery);
  }, [fetchDynamicPosts, selectedPlatform]);



  // Filter posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Exclude posts from channels that have been disabled in settings
      if (dynamicSettings?.channels) {
        const ch = dynamicSettings.channels.find((c) => c.id === post.platform);
        if (ch && ch.enabled === false) return false;
      }
      // Exclude YouTube video stream posts if YouTube API is turned off
      if (
        post.platform === "youtube" &&
        dynamicSettings?.youtubeApi &&
        dynamicSettings.youtubeApi.enabled === false
      ) {
        return false;
      }

      const matchesPlatform =
        selectedPlatform === "all" || post.platform === selectedPlatform;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query);

      return matchesPlatform && matchesSearch;
    });
  }, [posts, selectedPlatform, searchQuery, dynamicSettings]);

  // Dynamic feed refresh
  const handleRefreshFeed = async () => {
    setIsRefreshing(true);
    await fetchDynamicPosts(selectedPlatform, searchQuery);
    setIsRefreshing(false);
  };

  const platformsList = useMemo(() => {
    const base: { id: SocialPlatform; label: string; icon?: React.ReactNode }[] = [
      { id: "all", label: "All Feeds" },
      {
        id: "x",
        label: "X (Twitter)",
        icon: <PlatformIcon platform="x" className="w-3.5 h-3.5" />,
      },
      {
        id: "facebook",
        label: "Facebook",
        icon: <PlatformIcon platform="facebook" className="w-3.5 h-3.5" />,
      },
      {
        id: "instagram",
        label: "Instagram",
        icon: <PlatformIcon platform="instagram" className="w-3.5 h-3.5" />,
      },
      {
        id: "tiktok",
        label: "TikTok",
        icon: <PlatformIcon platform="tiktok" className="w-3.5 h-3.5" />,
      },
      {
        id: "youtube",
        label: "YouTube",
        icon: <PlatformIcon platform="youtube" className="w-3.5 h-3.5" />,
      },
    ];

    if (!dynamicSettings) return base;

    return base.filter((p) => {
      if (p.id === "all") return true;
      if (p.id === "youtube") {
        if (dynamicSettings.youtubeApi?.enabled) return true;
        const ch = dynamicSettings.channels?.find((c) => c.id === "youtube");
        return Boolean(ch && ch.enabled !== false);
      }
      if (p.id === "x") {
        if (dynamicSettings.twitterApi?.enabled) return true;
        const ch = dynamicSettings.channels?.find((c) => c.id === "x");
        return Boolean(ch && ch.enabled !== false);
      }
      if (p.id === "facebook" || p.id === "instagram") {
        if (dynamicSettings.metaApi?.enabled) return true;
        const ch = dynamicSettings.channels?.find((c) => c.id === p.id);
        return Boolean(ch && ch.enabled !== false);
      }
      const ch = dynamicSettings.channels?.find((c) => c.id === p.id);
      return Boolean(ch && ch.enabled !== false);
    });
  }, [dynamicSettings]);

  // Dynamically visible header direct follow channels
  const activeHeaderChannels = useMemo(() => {
    const defaultList = [
      { id: "x", name: "X", url: OFFICIAL_CHANNELS.x.url, hoverClass: "hover:bg-slate-900 hover:text-white text-slate-700" },
      { id: "facebook", name: "Facebook", url: OFFICIAL_CHANNELS.facebook.url, hoverClass: "text-[#1877F2] hover:bg-[#1877F2] hover:text-white" },
      { id: "instagram", name: "Instagram", url: OFFICIAL_CHANNELS.instagram.url, hoverClass: "text-[#E1306C] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white" },
      { id: "youtube", name: "YouTube", url: OFFICIAL_CHANNELS.youtube.url, hoverClass: "text-red-600 hover:bg-red-600 hover:text-white" },
      { id: "tiktok", name: "TikTok", url: OFFICIAL_CHANNELS.tiktok.url, hoverClass: "text-slate-900 hover:bg-black hover:text-white" },
    ];

    if (!dynamicSettings?.channels) return defaultList;

    const processedList = defaultList
      .filter((item) => {
        const ch = dynamicSettings.channels.find((c) => c.id === item.id);
        return Boolean(ch && ch.enabled !== false);
      })
      .map((item) => {
        const ch = dynamicSettings.channels.find((c) => c.id === item.id);
        return ch?.url ? { ...item, url: ch.url } : item;
      });

    const defaultIds = defaultList.map(d => d.id);
    const customChannels = dynamicSettings.channels
      .filter((ch) => !defaultIds.includes(ch.id) && ch.enabled !== false)
      .map((ch) => ({
        id: ch.id,
        name: ch.name,
        url: ch.url,
        hoverClass: ch.bgClass || "hover:bg-slate-800 hover:text-white text-slate-700",
      }));

    return [...processedList, ...customChannels];
  }, [dynamicSettings]);

  const primaryCtaChannel = useMemo(() => {
    return activeHeaderChannels[0] || null;
  }, [activeHeaderChannels]);

  // If initial fetch finished and there are no live posts from the API, do not render the section
  if (!isInitialLoading && posts.length === 0) {
    return null;
  }

  return (
    <section className={`relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden ${className}`}>
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-4 border-b border-slate-200/80">
          <div className="space-y-4 max-w-3xl">
            {/* Live Indicator Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 shadow-sm">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
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

          {/* Action Hub (Follow & Refresh) */}
          <div className="flex flex-wrap items-center gap-3">

            <button
              onClick={handleRefreshFeed}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm active:scale-95 disabled:opacity-50"
              title="Refresh live stream"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 text-emerald-600 ${isRefreshing ? "animate-spin" : ""
                  }`}
              />
              <span>{isRefreshing ? "Refreshing..." : "Sync Feed"}</span>
            </button>

            {/* Official Channel Direct Links */}
            {activeHeaderChannels.length > 0 && (
              <div className="flex items-center gap-1.5 p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
                {activeHeaderChannels.map((item) => (
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


            {/* Filter Tabs & Search Bar */}
            {showFilters && (
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Platform tabs */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80 overflow-x-auto w-full md:w-auto scrollbar-none">
                  {platformsList.map((item) => {
                    const count =
                      item.id === "all"
                        ? posts.length
                        : posts.filter((p) => p.platform === item.id).length;

                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedPlatform(item.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap ${selectedPlatform === item.id
                            ? "bg-white text-slate-900 shadow-md border border-slate-200/60"
                            : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                          }`}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedPlatform === item.id
                              ? "bg-emerald-100 text-emerald-800"
                              : "bg-slate-200/70 text-slate-600"
                            }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Live Search Input */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search posts or #hashtags..."
                    className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 shadow-sm transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Social Post Masonry/Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                {filteredPosts.slice(0, limit).map((post, idx) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05, duration: 0.3 }}
                  >
                    <SocialPostCard
                      post={post}
                      onOpenLightbox={(selected) => setActiveLightboxPost(selected)}
                    />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center rounded-3xl bg-slate-50 border border-dashed border-slate-200 p-8 space-y-3">
                <Radio className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">
                  No posts found matching your filter
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your search query or switching to another social platform channel.
                </p>
                <button
                  onClick={() => {
                    setSelectedPlatform("all");
                    setSearchQuery("");
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors shadow-sm"
                >
                  Reset Filters
                </button>
              </div>
            )}

        {/* Bottom Banner / Community Invite */}
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
      </div>

      {/* Lightbox / Post Modal */}
      <SocialMediaLightbox
        post={activeLightboxPost}
        onClose={() => setActiveLightboxPost(null)}
      />
    </section>
  );
}
