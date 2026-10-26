import { OFFICIAL_CHANNELS } from "@/components/social/socialData";
import { SocialPost } from "@/components/social/types";

export function buildDynamicChannels(currentSettings: any) {
  const dynamicChannels: Record<string, any> = { ...OFFICIAL_CHANNELS };
  currentSettings.channels.forEach((ch: any) => {
    if (ch.enabled) {
      dynamicChannels[ch.id] = {
        name: ch.name,
        handle: ch.handle,
        url: ch.url,
        color: ch.color || "#000000",
        bgClass: ch.bgClass || "bg-slate-900 text-white",
        badgeClass: ch.badgeClass || "bg-slate-900 text-white border-slate-700",
      };
    } else {
      delete dynamicChannels[ch.id];
    }
  });
  return dynamicChannels;
}

export function filterAndSortPosts(
  posts: SocialPost[],
  settings: any,
  platform?: string | null,
  search?: string | null,
  limit: number = 25
): SocialPost[] {
  const activePlatforms = new Set<string>();
  if (Array.isArray(settings.channels)) {
    settings.channels.forEach((ch: any) => {
      if (ch.enabled !== false) activePlatforms.add(ch.id.toLowerCase());
    });
  }
  if (settings.youtubeApi?.enabled) activePlatforms.add("youtube");
  if (settings.metaApi?.enabled) { activePlatforms.add("facebook"); activePlatforms.add("instagram"); }
  if (settings.twitterApi?.enabled) activePlatforms.add("x");

  let filtered = posts.filter((p) => activePlatforms.has(p.platform.toLowerCase()));

  if (platform && platform !== "all") {
    filtered = filtered.filter((p) => p.platform === platform);
  }

  if (search) {
    filtered = filtered.filter((p) =>
      p.content.toLowerCase().includes(search) ||
      p.tags.some((tag) => tag.toLowerCase().includes(search)) ||
      p.author.name.toLowerCase().includes(search)
    );
  }

  const seenIds = new Set<string>();
  const unique = filtered.filter((p) => {
    if (seenIds.has(p.id)) return false;
    seenIds.add(p.id);
    return true;
  });

  unique.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  return limit > 0 ? unique.slice(0, limit) : unique;
}
