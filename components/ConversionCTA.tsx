"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, Mail, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { toast } from "react-toastify";
import { RegistrationToast } from "@/components/toasts/RegistrationToast";



type View = "frontier" | "waitlist" | "observer";

export function ConversionCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<View>("frontier");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Handle Waitlist Submission
  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      return;
    }
    submitData();
  };

  const submitData = async () => {
    try {
      setIsLoading(true);
      setStatus("idle");

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
      if (!res.ok) throw new Error(data.error || "Failed to register");

      toast(<RegistrationToast />, { containerId: "top-right" });
      setStatus("success");
      setEmail("");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
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
      // Still show success to user even if tracking fails
      toast.success("Thanks for your interest! We'll keep building.");
      setStatus("success");
    }
  };

  // Back Navigation Logic
  const handleBack = () => {
    setStatus("idle");
    if (view === "waitlist") setView("frontier");
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
    <section className="relative w-full py-24 px-4 overflow-hidden" id="cta">
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
                <div className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-200 text-xs font-medium">
                  First 100 get Pro free for 1 year
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  Limited spots left
                </div>
              </motion.div>

              {/* Headings */}
              <h2 className="text-3xl font-semibold text-white mb-2 tracking-tight">
                {view === "frontier" && "Become a Frontier Member"}
                {view === "waitlist" && "Join the waitlist"}
                {view === "observer" && "No worries"}
              </h2>
              <p className="text-white/50 text-[15px] leading-relaxed max-w-sm">
                {view === "frontier" && "Pay $1 to join early. Refund if we don’t ship."}
                {view === "waitlist" && "Get early access when we launch. One email, no spam."}
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
                    {/* FRONTIER VIEW */}
                    {view === "frontier" && (
                      <>
                        <Button
                          size="lg"
                          onClick={() => setShowPaymentModal(true)}
                          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold border-none h-12 shadow-[0_0_20px_-5px_rgba(6,182,212,0.5)]"
                        >
                          Pay & Join
                        </Button>
                        <button
                          onClick={() => {
                            setView("waitlist");
                            setStatus("idle");
                          }}
                          className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-white/4 border border-white/10 text-white/60 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all font-medium text-xs"
                        >
                          <span>I can&apos;t pay, join waitlist</span>
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    {/* WAITLIST VIEW */}
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
                                if (status === "error") setStatus("idle");
                              }}
                              placeholder="Enter your email"
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
                              Enter a valid email.
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
                          className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold border-none h-12 shadow-[0_0_15px_-5px_rgba(6,182,212,0.4)] mt-1" // Primary style
                        >
                          Join waitlist
                        </Button>
                        <button
                          type="button"
                          onClick={() => {
                            setView("observer");
                            setStatus("idle");
                          }}
                          className="w-full h-10 flex items-center justify-center gap-2 rounded-lg bg-white/4 border border-white/10 text-white/60 hover:text-white hover:bg-white/8 hover:border-white/20 transition-all font-medium text-xs mt-1"
                        >
                          <span>I&apos;d rather not share email</span>
                          <ArrowDownRight className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    )}

                    {/* OBSERVER VIEW */}
                    {view === "observer" && (
                      <>
                        <Button
                          variant="secondary"
                          onClick={handleInterested}
                          className="w-full h-12 bg-white/10 hover:bg-white/15 text-white border-white/10"
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

function PaymentModalContent({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
  const [step, setStep] = useState<"select" | "gpay" | "paypal">("select");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-cyan-500/10 to-transparent pointer-events-none" />

      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-full transition-all z-10"
      >
        ✕
      </button>

      {step === "select" ? (
        <>
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-1">Choose Payment Method</h3>
            <p className="text-sm text-white/50">One-time payment of $1 for lifetime access.</p>
          </div>

          <div className="flex flex-col gap-3 mb-8">
            <button
              onClick={() => setStep("gpay")}
              className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
            >
              <span className="font-semibold text-white">GPay</span>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
            </button>
            <button
              onClick={() => setStep("paypal")}
              className="w-full p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-between group"
            >
              <span className="font-semibold text-white">PayPal</span>
              <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-white/70 transition-colors" />
            </button>
          </div>

          <div className="text-center pt-4 border-t border-white/5">
            <p className="text-xs text-white/40">
              If we don&apos;t ship, you get a refund.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-6">
            <button onClick={() => setStep("select")} className="text-white/50 hover:text-white text-sm flex items-center gap-1 transition-colors">
              ← Back
            </button>
          </div>

          <h3 className="text-xl font-semibold text-white mb-2 text-center">
            {step === "gpay" ? "Scan GPay QR" : "Scan PayPal QR"}
          </h3>
          <p className="text-sm text-white/50 mb-6 text-center">Complete payment to finalize registration.</p>

          <div className="w-full aspect-square bg-white text-black p-4 rounded-xl mb-6 mx-auto max-w-[280px] shadow-lg flex items-center justify-center">
            {/* Real QR would go here, using placeholder for demo */}
            <div className="relative w-full h-full opacity-90">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=OpikaPreorder"
                alt="Payment QR Code"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <Button
            onClick={onComplete}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-12"
          >
            I&apos;ve Completed Payment
          </Button>

          <p className="text-[10px] text-center text-white/30 mt-4">
            Transaction ID verification may be required.
          </p>
        </>
      )}
    </motion.div>
  );
}

