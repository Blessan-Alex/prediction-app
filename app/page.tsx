import { SpaceBackground } from "@/components/SpaceBackground";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/Navbar";
import { HeroTop } from "@/components/HeroTop";
import { MobilePreviewStrip } from "@/components/MobilePreviewStrip";

import { ConversionCTA } from "@/components/ConversionCTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { HeroVideoSection } from "@/components/HeroVideoSection";

import { ExplainerSection } from "@/components/ExplainerSection";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <SpaceBackground />
      <Navbar />

      <div className="flex-1 flex flex-col">
        <HeroTop />
        <MobilePreviewStrip />

        {/* Central Widget Explainer */}
        <section id="demo" className="relative w-full pb-28 px-4 min-h-screen flex flex-col justify-center snap-start snap-always -mt-10 md:-mt-16 pt-20 md:pt-24 z-20">
          <Container className="flex flex-col items-center">
            <HeroVideoSection />
          </Container>
        </section>

        <ExplainerSection />
        <FAQ />
        <ConversionCTA />
        <Footer />
      </div>
    </main>
  );
}
