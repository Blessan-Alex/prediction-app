"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { ChevronDown } from "lucide-react";

export function HeroTop() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const scrollToSection = () => {
    const element = document.getElementById("cta");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] md:min-h-[95vh] flex flex-col justify-center items-center pt-20 pb-16 z-10 snap-start snap-always"
    >
      <Container className="flex flex-col items-center text-center flex-1 justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl w-full flex flex-col items-center space-y-6 md:space-y-8"
        >
          {/* Headline */}
          <div className="space-y-2 md:space-y-4">
            <motion.h1
              variants={itemVariants}
              className="text-[34px] leading-[1.1] md:text-[54px] lg:text-[64px] font-bold tracking-tight text-white"
            >
              <span className="block text-white/90">Pick a side.</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/70">
                Lock it in. Settle clean.
              </span>
            </motion.h1>
          </div>

          {/* Subhead */}
          <motion.p
            variants={itemVariants}
            className="text-base md:text-lg text-muted max-w-[520px] leading-relaxed"
          >
            Two friends choose opposite sides, put coins in, and close it
            fairly. If it can’t be decided, coins return to both.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center space-y-6 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <Button
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
                onClick={scrollToSection}
              >
                Register
              </Button>
            </div>


          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}

    </section>
  );
}
