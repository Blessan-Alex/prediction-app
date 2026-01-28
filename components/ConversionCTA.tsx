"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowLeft, Mail, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { toast } from "react-toastify";
import { RegistrationToast } from "@/components/toasts/RegistrationToast";
import { PaymentModalContent } from "@/components/PaymentModal";

// ... existing imports

type View = "frontier" | "waitlist" | "observer";

export function ConversionCTA() {

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("Enter a valid email.");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<View>("waitlist");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Handle Waitlist Submission
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage("Enter a valid email.");
      setStatus("error");
      return;
    }
    submitData();
  };

  const submitData = async () => {
    try {
      setIsLoading(true);
      setStatus("idle");
      setErrorMessage("Enter a valid email."); // Default reset

      // Simulate API call
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
          setErrorMessage("You are already on the list");
        } else {
          setErrorMessage("Enter a valid email.");
        }
        throw new Error(data.error || "Failed to register");
      }

      toast(<RegistrationToast />, { containerId: "top-right" });
      setStatus("success");
      setShowPaymentModal(true);
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle "Just Interested" Click
  const handleInterested = async () => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "interested_click" }),
      });
      toast.success("Thanks for your interest! We'll keep building.");
      setStatus("success");
    } catch (err) {
      console.error("Failed to track interest:", err);
      toast.success("Thanks for your interest! We'll keep building.");
      setStatus("success");
    }
  };

  // Back Navigation Logic
  const handleBack = () => {
    setStatus("idle");
    if (view === "frontier") setView("waitlist");
    if (view === "observer") setView("waitlist");
  };

  // Progress line width/position based on view
  const getProgressStyles = () => {
    switch (view) {
      case "frontier": return { width: "33.33%", x: "0%" };
      case "waitlist": return { width: "33.33%", x: "100%" };
      case "observer": return { width: "33.33%", x: "200%" };
    }
  };

  return (
    <section className="relative w-full py-24 md:py-32 px-4 overflow-hidden" id="cta">
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <PaymentModalContent onClose={() => setShowPaymentModal(false)} onComplete={() => {
            setShowPaymentModal(false);
            toast.success("Welcome to the Frontier!");
          }} />
        </div>
      )}

      <Container className="max-w-3xl mx-auto relative z-10 flex justify-center">

        {/* Local Vignette */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 40%, rgba(59,130,246,0.18) 0%, rgba(0,0,0,0) 55%)"
          }}
        />

        {/* Glass Panel Container */}
        <div className="w-full max-w-[560px] relative bg-[#0c101b]/55 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_30px_120px_rgba(0,0,0,0.65)] ring-1 ring-cyan-500/10 overflow-hidden">

          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-white/5 z-20">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
              initial={false}
              animate={getProgressStyles()}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Header Zone with Gradient */}
          <div className="relative pt-6 md:pt-8 px-6 md:px-8 pb-6 border-b border-white/10">
            <div className="absolute inset-0 bg-cyan-500/[0.03] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:items-start items-center text-center md:text-left">
              {/* Back Button */}
              {view !== "frontier" && (
                <div className="w-full flex md:justify-start justify-center mb-4">
                  <button
                    onClick={handleBack}
                    aria-label="Back"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/60 hover:text-white hover:bg-white/8 transition-all"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back
                  </button>
                </div>
              )}

              {/* Scarcity / Urgency Header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-2 mb-4 flex-wrap md:justify-start justify-center"
              >
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs font-medium uppercase tracking-wide">
                  First 100 get Pro free
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Limited spots left
                </div>
              </motion.div>

              {/* Headings - Typography Update: text-2xl md:text-3xl lg:text-4xl */}
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-white mb-3 tracking-tight">
                {view === "waitlist" && "Get in early"}
                {view === "frontier" && "Frontier Member"}
                {view === "observer" && "No worries"}
              </h2>
              {/* Body Text - Typography Update: text-sm md:text-base leading-7 */}
              <p className="text-white/60 text-sm md:text-base leading-7 max-w-sm">
                {view === "waitlist" && "We are letting in the first 100 people before the public launch. If you join now, you get the Pro version free for one year."}
                {view === "frontier" && "If we build it, you get $10 in credits. If we don't, you get a $2 refund."}
                {view === "observer" && "No signup needed. You can still follow along."}
              </p>
            </div>
          </div>

          {/* Main CTA Body Content */}
          <div className="p-6 md:p-8 bg-black/20">
            <div className="w-full transition-all duration-300">
              <AnimatePresence mode="wait">
                <motion.div
                  key={view}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col md:items-start items-center w-full"
                >
                  <div className="w-full max-w-md flex flex-col gap-3">
                    {/* WAITLIST VIEW (DEFAULT) */}
                    {view === "waitlist" && (
                      <form onSubmit={handleWaitlistSubmit} className="w-full flex flex-col gap-3">
                        <div className="relative group">
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-cyan-400 transition-colors" />
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => {
                                setEmail(e.target.value);
                                if (status === "error") {
                                  setStatus("idle");
                                  setErrorMessage("Enter a valid email.");
                                }
                              }}
                              placeholder="Enter your email"
                              // Typography: text-base
                              className={cn(
                                "w-full h-12 bg-white/5 border rounded-lg pl-10 pr-4 text-white text-base placeholder:text-white/40 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50 shadow-inner shadow-black/30",
                                status === "error"
                                  ? "border-red-500/50 focus:border-red-500"
                                  : "border-white/15 focus:border-cyan-500/50"
                              )}
                            />
                          </div>
                          {status === "error" && (
                            <div className="mt-2 text-[11px] text-red-400 flex items-center gap-1.5 opacity-90" aria-live="polite">
                              <AlertCircle className="w-3 h-3" />
                              {errorMessage}
                            </div>
                          )}
                          {status === "success" && (
                            <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1.5 opacity-90" aria-live="polite">
                              <CheckCircle2 className="w-3 h-3" />
                              You’re on the list.
                            </div>
                          )}
                        </div>

                        <Button
                          type="submit"
                          size="lg"
                          isLoading={isLoading}
                          // Typography: text-sm md:text-base
                          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold border-none h-12 text-sm md:text-base shadow-[0_0_15px_-5px_rgba(6,182,212,0.4)] mt-1"
                        >
                          Get Early Access
                        </Button>

                        {/* Secondary CTA: Frontier Upsell - GOLDEN PREMIUM STYLE */}

                      </form>
                    )}

                    {/* FRONTIER VIEW (SECONDARY) */}
                    {view === "frontier" && (
                      <>
                        <Button
                          size="lg"
                          onClick={() => setShowPaymentModal(true)}
                          className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-black font-bold border-none h-12 text-sm md:text-base shadow-[0_0_25px_-5px_rgba(245,158,11,0.6)]"
                        >
                          Pay 1 dollar
                        </Button>
                        <button
                          onClick={() => {
                            setView("observer"); // CHANGED: Goes to Observer (step 3)
                            setStatus("idle");
                          }}
                          className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-white/4 border border-white/10 text-white/50 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all font-medium text-xs text-center leading-tight"
                        >
                          <span>I cannot pay right now. Nor do I want to give my email.</span>
                          <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
                        </button>
                      </>
                    )}

                    {/* OBSERVER VIEW */}
                    {view === "observer" && (
                      <>
                        <Button
                          variant="secondary"
                          onClick={handleInterested}
                          className="w-full h-12 bg-white/10 hover:bg-white/15 text-white border-white/10 text-sm md:text-base"
                        >
                          I&apos;ll just watch for now
                        </Button>
                        <p className="text-white/30 text-xs text-center md:text-left mt-2">
                          No email. No commitment.
                        </p>
                      </>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


