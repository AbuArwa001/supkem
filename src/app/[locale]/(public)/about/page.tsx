import { ApproachesSection } from "@/app/(public)/about/_components/ApproachesSection";
import { GallerySection } from "@/app/(public)/about/_components/GallerySection";
import { HeroSection } from "@/app/(public)/about/_components/HeroSection";
import { HistorySection } from "@/app/(public)/about/_components/HistorySection";
import { LeadershipSection } from "@/app/(public)/about/_components/LeadershipSection";
import { MeetOurLeaders } from "@/app/(public)/about/_components/MeetOurLeaders";

export default function AboutPage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <HistorySection />
      <LeadershipSection />
      <MeetOurLeaders />
      <ApproachesSection />
      <GallerySection />
    </div>
  );
}
