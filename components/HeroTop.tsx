"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { Twitter } from "lucide-react";

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
      className="relative min-h-[95vh] flex flex-col justify-center items-center pt-20 pb-16 z-10 snap-start snap-always"
    >
      <Container className="flex flex-col items-center text-center flex-1 justify-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl w-full flex flex-col items-center space-y-8 md:space-y-10"
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
            className="flex flex-col items-center space-y-6 pt-4 w-full"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
              <Button
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
                onClick={scrollToSection}
              >
                Register
              </Button>
              <Button
                variant="secondary"
                size="md"
                className="w-full sm:w-auto min-w-[140px]"
                onClick={scrollToSection}
              >
                Notify Me
              </Button>
              <Button
                variant="ghost"
                size="md"
                className="gap-2 w-full sm:w-auto text-muted hover:text-white"
              >
                <Twitter className="h-4 w-4" />
                <span>Follow us on X</span>
              </Button>
            </div>

            <span className="text-xs text-white/30 font-medium">
              Rules lock when your friend joins.
            </span>
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 left-0 right-0 mx-auto w-full flex flex-col items-center gap-3 cursor-pointer z-20"
        onClick={() => {
          const next = document.getElementById("widget-section");
          next?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        <motion.span
          className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Scroll to experience
        </motion.span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-cyan-400/50 to-white/0"
          animate={{ scaleY: [0.8, 1.2, 0.8], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
