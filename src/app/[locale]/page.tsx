import { Hero } from "./_components/Hero";
import { Partners } from "./_components/Partners";
import { ProgramAreas } from "./_components/ProgramAreas";
import { Services } from "./_components/Services";
import { HomeGallery } from "./_components/HomeGallery";
import { CTA } from "./_components/CTA";

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
