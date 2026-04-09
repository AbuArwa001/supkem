import { ApproachesSection } from "@/app/[locale]/(public)/about/_components/ApproachesSection";
import { GallerySection } from "@/app/[locale]/(public)/about/_components/GallerySection";
import { HeroSection } from "@/app/[locale]/(public)/about/_components/HeroSection";
import { HistorySection } from "@/app/[locale]/(public)/about/_components/HistorySection";
import { LeadershipSection } from "@/app/[locale]/(public)/about/_components/LeadershipSection";
import { MeetOurLeaders } from "@/app/[locale]/(public)/about/_components/MeetOurLeaders";

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
