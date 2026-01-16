import { SpaceBackground } from "@/components/SpaceBackground";
import { Container } from "@/components/layout/Container";
import { Navbar } from "@/components/Navbar";
import { HeroTop } from "@/components/HeroTop";
import ProblemSolution from "@/components/ProblemSolution";
import { ConversionCTA } from "@/components/ConversionCTA";
import { FAQ } from "@/components/FAQ";
import { Footer } from "@/components/Footer";
import { HeroVideoSection } from "@/components/HeroVideoSection";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <SpaceBackground />
      <Navbar />

      <div className="flex-1 flex flex-col">
        <HeroTop />

        {/* Central Widget Explainer */}
        <section id="widget-section" className="relative w-full pb-4 px-4 min-h-screen flex flex-col justify-center snap-start snap-always -mt-52 md:-mt-32 z-20">
          <Container className="flex flex-col items-center">
            <HeroVideoSection />

            {/* Bottom Trust Row Removed */}
          </Container>
        </section>

        <ProblemSolution />
        <FAQ />
        <ConversionCTA />
        <Footer />
      </div>
    </main>
  );
}
