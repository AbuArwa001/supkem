"use client";

import { motion } from "framer-motion";
import { SocialMediaWallProps } from "./types";
import { SocialPostCard } from "./SocialPostCard";
import { SocialMediaLightbox } from "./SocialMediaLightbox";
import { useSocialMediaWall } from "./useSocialMediaWall";
import { SocialMediaWallHeader } from "./SocialMediaWallHeader";
import { SocialMediaWallFilters } from "./SocialMediaWallFilters";
import { SocialMediaWallBanner } from "./SocialMediaWallBanner";
import { SocialMediaWallEmptyState } from "./SocialMediaWallEmptyState";

export function SocialMediaWall({
  className = "",
  initialPlatform = "all",
  title = "Live Social Media Wall",
  subtitle = "Official real-time updates, announcements, photos, and video briefings aggregated directly from SUPKEM's verified channels.",
  limit = 12,
  showFilters = true,
}: SocialMediaWallProps) {
  const {
    selectedPlatform, setSelectedPlatform, searchQuery, setSearchQuery,
    activeLightboxPost, setActiveLightboxPost, isRefreshing, posts,
    isInitialLoading, filteredPosts, handleRefreshFeed,
    activeHeaderChannels, primaryCtaChannel,
  } = useSocialMediaWall(initialPlatform);

  if (!isInitialLoading && posts.length === 0) return null;

  return (
    <section className={`relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden ${className}`}>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto space-y-12">
        <SocialMediaWallHeader
          title={title}
          subtitle={subtitle}
          isRefreshing={isRefreshing}
          onRefresh={handleRefreshFeed}
          channels={activeHeaderChannels}
        />

        {showFilters && (
          <SocialMediaWallFilters
            selectedPlatform={selectedPlatform}
            onSelectPlatform={setSelectedPlatform}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            posts={posts}
          />
        )}

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filteredPosts.slice(0, limit).map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
              >
                <SocialPostCard post={post} onOpenLightbox={setActiveLightboxPost} />
              </motion.div>
            ))}
          </div>
        ) : (
          <SocialMediaWallEmptyState onReset={() => { setSelectedPlatform("all"); setSearchQuery(""); }} />
        )}

        <SocialMediaWallBanner primaryCtaChannel={primaryCtaChannel} />
      </div>

      <SocialMediaLightbox
        post={activeLightboxPost}
        onClose={() => setActiveLightboxPost(null)}
      />
    </section>
  );
}
