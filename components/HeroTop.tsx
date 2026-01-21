"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { CheckCircle, Play } from "lucide-react";
import { PaymentModalContent } from "@/components/PaymentModal";
import { toast } from "react-toastify";
import { RegistrationToast } from "@/components/toasts/RegistrationToast";

export function HeroTop() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

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

  const scrollToDemo = () => {
    // Tell the widget to do a pop animation
    window.dispatchEvent(new CustomEvent("settleup:play-demo"));

    const el = document.getElementById("demo");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleJoin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);

      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          type: "waitlist",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.error === "Email already exists") {
          toast.info("You are already on the list!");
        } else {
          toast.error("Please enter a valid email.");
        }
        return;
      }

      toast(<RegistrationToast />, { containerId: "top-right" });
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      ref={ref}
      className="relative min-h-[80vh] md:min-h-[90vh] flex flex-col justify-center items-center pt-24 pb-16 z-10 snap-start snap-always"
    >
      {/* Payment Modal Overlay */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <PaymentModalContent onClose={() => setShowPaymentModal(false)} onComplete={() => {
            setShowPaymentModal(false);
            toast.success("Welcome to the Frontier!");
          }} />
        </div>
      )}

      <Container className="flex flex-col items-center flex-1 justify-center">
        {/* Desktop Wrapper for Split Layout */}
        <div className="relative w-full max-w-5xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:pr-[420px]"
          >
            {/* Headline */}
            <div className="space-y-4 w-full flex flex-col items-center lg:items-start">
              <motion.h1
                variants={itemVariants}
                className="text-[34px] leading-[1.1] md:text-[54px] lg:text-[64px] font-bold tracking-tight text-white"
              >
                Make custom bets with friends.
              </motion.h1>

              {/* Micro Row */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 text-xs md:text-sm text-white/50 font-medium tracking-wide uppercase"
              >
                <span>Set Custom Bet</span>
                <span className="text-white/20">•</span>
                <span>Pick Side</span>
                <span className="text-white/20">•</span>
                <span>Lock Funds</span>
                <span className="text-white/20">•</span>
                <span>Settle Instant</span>
              </motion.div>
            </div>

            {/* Subhead */}
            <motion.p
              variants={itemVariants}
              className="text-base md:text-lg text-white/70 max-w-[640px] lg:max-w-none leading-relaxed"
            >
              SettleUp is a simple app where two friends bet on something, both put money in
              before the bet starts, and the winner gets paid automatically when it ends.
            </motion.p>

            {/* CTA Row - Reduced Margins */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col items-center lg:items-start space-y-3 w-full mt-4 md:mt-6"
            >
              <form
                onSubmit={handleJoin}
                className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center lg:justify-start"
              >
                <div className="relative w-full sm:w-auto">
                  <input
                    id="email-input"
                    type="email"
                    placeholder="Enter your email"
                    className="h-12 w-full sm:w-[320px] rounded-xl border border-white/10 bg-white/[0.04] px-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all shadow-inner"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email-input" className="sr-only">
                    Email address
                  </label>
                </div>
                <Button
                  type="submit"
                  size="md"
                  isLoading={isLoading}
                  className="h-12 rounded-xl px-6 w-full sm:w-auto shadow-lg shadow-white/5"
                >
                  Get Early Access
                </Button>
              </form>

              <div className="flex items-center gap-4 pt-1">
                <p className="text-xs text-white/40">No spam. Early access only.</p>
                <span className="text-white/20 hidden sm:inline">•</span>
                <button
                  onClick={() => setShowPaymentModal(true)}
                  className="text-sm font-medium text-amber-300 hover:text-amber-100 transition-all drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] hover:drop-shadow-[0_0_12px_rgba(245,158,11,0.8)] pb-0.5 border-b border-transparent hover:border-amber-300/30"
                >
                  $1 to reserve a priority spot. Refundable anytime.
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Example Cards Wrapper */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full max-w-[400px] mx-auto mt-10 lg:mt-0 lg:absolute lg:right-0 lg:top-[2%] lg:-translate-y-1/2 z-20 space-y-4"
          >
            {/* 1. Live Example Card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 md:p-6 text-left relative overflow-hidden group hover:border-white/20 transition-colors">
              {/* Glossy sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

              <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-xs font-bold tracking-widest text-white/40 uppercase">
                  Live Example
                </p>
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-medium">Active</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Matchup */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white">J</span>
                    <span className="text-sm text-white font-medium">John</span>
                  </div>
                  <span className="text-xs text-white/30 font-bold">VS</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-white font-medium">Mike</span>
                    <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white">M</span>
                  </div>
                </div>

                {/* Bet Details */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Pick</span>
                    <div className="flex gap-3 text-white/80">
                      <span>Lakers (J)</span>
                      <span className="text-white/20">|</span>
                      <span>Celtics (M)</span>
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-white/50">Pool</span>
                    <span className="text-white font-mono">$10.00 <span className="text-white/30">($5 each)</span></span>
                  </div>
                </div>

                {/* Result */}
                <div className="pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">Lakers win</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1 pl-6">
                    John gets $10 instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Separate Play Demo Card */}
            <div className="rounded-xl border border-white/10 bg-white/[0.04] backdrop-blur-md p-4 text-center">
              <Button
                type="button"
                size="md"
                onClick={scrollToDemo}
                className="w-full h-11 rounded-lg bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/25 transition shadow-lg flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                Play Interactive Demo
              </Button>
            </div>


          </motion.div>
        </div>
      </Container>
    </section>
  );
}
