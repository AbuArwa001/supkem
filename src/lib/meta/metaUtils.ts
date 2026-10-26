export const META_GRAPH_VERSION = "v19.0";
export const META_BASE_URL = `https://graph.facebook.com/${META_GRAPH_VERSION}`;

/**
 * Format relative time string (e.g. "2h ago", "Yesterday", "3d ago")
 */
export function formatRelativeTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSec < 60) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return "Recently";
  }
}

/**
 * Extract hashtags from text
 */
export function extractHashtags(text?: string): string[] {
  if (!text) return ["SUPKEM", "Community"];
  const matches = text.match(/#[a-zA-Z0-9_]+/g);
  if (!matches || matches.length === 0) {
    return ["SUPKEM", "Official"];
  }
  return matches.map((tag) => tag.replace("#", "")).slice(0, 4);
}
