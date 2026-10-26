import { useState, useEffect, useMemo, useCallback } from "react";
import { SocialPlatform, SocialPost } from "./types";
import { SocialMediaSettings } from "@/lib/socialSettings";
import { OFFICIAL_CHANNELS } from "./socialData";

export function useSocialMediaWall(initialPlatform: SocialPlatform) {
  const [selectedPlatform, setSelectedPlatform] = useState<SocialPlatform>(initialPlatform);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLightboxPost, setActiveLightboxPost] = useState<SocialPost | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [posts, setPosts] = useState<SocialPost[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [dynamicSettings, setDynamicSettings] = useState<SocialMediaSettings | null>(null);

  useEffect(() => {
    fetch("/api/social-settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.settings) setDynamicSettings(data.settings);
      })
      .catch(() => {});
  }, []);

  const fetchDynamicPosts = useCallback(async (platform?: string, search?: string) => {
    try {
      const params = new URLSearchParams();
      if (platform && platform !== "all") params.set("platform", platform);
      if (search) params.set("search", search);
      const res = await fetch(`/api/social-feed?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        if (data?.settings) setDynamicSettings(data.settings);
        setPosts(Array.isArray(data?.posts) ? data.posts : []);
      } else {
        setPosts([]);
      }
    } catch {
      setPosts([]);
    } finally {
      setIsInitialLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDynamicPosts(selectedPlatform, searchQuery);
  }, [fetchDynamicPosts, selectedPlatform]);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      if (dynamicSettings?.channels) {
        const ch = dynamicSettings.channels.find((c) => c.id === post.platform);
        if (ch && ch.enabled === false) return false;
      }
      if (post.platform === "youtube" && dynamicSettings?.youtubeApi && dynamicSettings.youtubeApi.enabled === false) {
        return false;
      }
      const matchesPlatform = selectedPlatform === "all" || post.platform === selectedPlatform;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        post.content.toLowerCase().includes(query) ||
        post.tags.some((t) => t.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query);
      return matchesPlatform && matchesSearch;
    });
  }, [posts, selectedPlatform, searchQuery, dynamicSettings]);

  const handleRefreshFeed = async () => {
    setIsRefreshing(true);
    await fetchDynamicPosts(selectedPlatform, searchQuery);
    setIsRefreshing(false);
  };

  const activeHeaderChannels = useMemo(() => {
    const defaultList = [
      { id: "x", name: "X", url: OFFICIAL_CHANNELS.x.url, hoverClass: "hover:bg-slate-900 hover:text-white text-slate-700" },
      { id: "facebook", name: "Facebook", url: OFFICIAL_CHANNELS.facebook.url, hoverClass: "text-[#1877F2] hover:bg-[#1877F2] hover:text-white" },
      { id: "instagram", name: "Instagram", url: OFFICIAL_CHANNELS.instagram.url, hoverClass: "text-[#E1306C] hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:text-white" },
      { id: "youtube", name: "YouTube", url: OFFICIAL_CHANNELS.youtube.url, hoverClass: "text-red-600 hover:bg-red-600 hover:text-white" },
      { id: "tiktok", name: "TikTok", url: OFFICIAL_CHANNELS.tiktok.url, hoverClass: "text-slate-900 hover:bg-black hover:text-white" },
    ];
    if (!dynamicSettings?.channels) return defaultList;
    return defaultList.filter((item) => {
      const ch = dynamicSettings.channels.find((c) => c.id === item.id);
      return Boolean(ch && ch.enabled !== false);
    }).map((item) => {
      const ch = dynamicSettings.channels.find((c) => c.id === item.id);
      return ch?.url ? { ...item, url: ch.url } : item;
    });
  }, [dynamicSettings]);

  return {
    selectedPlatform, setSelectedPlatform, searchQuery, setSearchQuery,
    activeLightboxPost, setActiveLightboxPost, isRefreshing, posts,
    isInitialLoading, dynamicSettings, filteredPosts, handleRefreshFeed,
    activeHeaderChannels, primaryCtaChannel: activeHeaderChannels[0] || null,
  };
}
