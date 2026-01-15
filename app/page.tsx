import { SpaceBackground } from "@/components/SpaceBackground";
import { Container } from "@/components/layout/Container";
import { Card } from "@/components/ui/Card";
import { GlowBorder } from "@/components/ui/GlowBorder";
import { Navbar } from "@/components/Navbar";
import { HeroTop } from "@/components/HeroTop";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full flex flex-col overflow-hidden">
      <SpaceBackground />
      <Navbar />

      <div className="flex-1 flex flex-col">
        <HeroTop />

        {/* Central Widget Preview (Existing) */}
        <section className="relative w-full pb-20 px-4">
          <Container className="flex flex-col items-center">
            <GlowBorder className="w-full max-w-[92vw] md:max-w-sm mx-auto shadow-2xl z-10">
              <Card className="p-8 h-[360px] flex flex-col items-center justify-center space-y-6 border-white/5 bg-black/60 backdrop-blur-xl">
                <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-glow-cyan/20 to-glow-blue/20 flex items-center justify-center border border-white/10">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-glow-cyan to-glow-blue shadow-[0_0_20px_rgba(37,244,200,0.5)]" />
                </div>
                <div className="space-y-3 w-full flex flex-col items-center">
                  <div className="h-5 w-32 bg-white/10 rounded-md" />
                  <div className="h-3 w-48 bg-white/5 rounded-md" />
                </div>
                {/* Fake inputs */}
                <div className="w-full space-y-2 mt-4">
                  <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5" />
                  <div className="h-10 w-full bg-white/5 rounded-lg border border-white/5" />
                </div>
              </Card>
            </GlowBorder>

            {/* Bottom Trust Row */}
            <div className="mt-12 flex items-center gap-6 opacity-30">
              <div className="h-2 w-16 bg-white rounded-full" />
              <div className="h-2 w-16 bg-white rounded-full" />
              <div className="h-2 w-16 bg-white rounded-full" />
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}
