import { Hero } from "@/app/_components/Hero";
import { Partners } from "@/app/_components/Partners";
import { ProgramAreas } from "@/app/_components/ProgramAreas";
import { Services } from "@/app/_components/Services";
import { HomeGallery } from "@/app/_components/HomeGallery";
import { CTA } from "@/app/_components/CTA";

/**
 * High-performance, SEO-optimized home page for SUPKEM.
 * Adheres to 200-line strict limit.
 */
export default function Home() {
  return (
    <main className="bg-white">
      <Hero />
      <Partners />
      <ProgramAreas />
      <Services />
      <HomeGallery />
      <CTA />
    </main>
  );
}
