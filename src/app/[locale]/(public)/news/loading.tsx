import { NewsHeroSkeleton } from "./_components/NewsHeroSkeleton";
import { NewsPaperSkeleton } from "./_components/NewsPaperSkeleton";
import { VideoBriefingsSkeleton } from "./_components/VideoBriefingsSkeleton";
import { FeaturedNewsSkeleton } from "./_components/FeaturedNewsSkeleton";

export default function NewsLoading() {
  return (
    <div className="space-y-24 pb-24">
      <NewsHeroSkeleton />
      <NewsPaperSkeleton />
      <VideoBriefingsSkeleton />
      <FeaturedNewsSkeleton />
    </div>
  );
}
