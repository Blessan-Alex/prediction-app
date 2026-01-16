"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { toast } from "react-toastify";
import { RegistrationToast } from "@/components/toasts/RegistrationToast";

export function ConversionCTA() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"waitlist" | "founder" | "interested">("founder");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Handle Waitlist & Founder Submissions
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      return;
    }

    if (activeTab === "founder") {
      setShowPaymentModal(true);
    } else {
      submitData();
    }
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
          type: activeTab, // "waitlist" or "founder"
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to register");

      toast(<RegistrationToast />, { containerId: "top-right" });
      setStatus("success");
      setEmail("");
      setShowPaymentModal(false);
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

  return (
    <section className="relative w-full py-24 px-4 overflow-hidden" id="cta">
      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <PaymentModalContent onClose={() => setShowPaymentModal(false)} onComplete={submitData} />
        </div>
      )}

      <Container className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center text-center">

          {/* Main CTA Content */}
          <div className="w-full flex flex-col items-center transition-all duration-300">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6 tracking-tight">
                {activeTab === "founder" ? "Become a Member." : "Join the journey."}
              </h2>
              <p className="text-white/50 text-[15px] mb-8 min-h-[48px] max-w-lg mx-auto">
                {activeTab === "founder" && "Support the build with $5. Get lifetime pro access + unique badge."}
                {activeTab === "waitlist" && "Get early access when we launch. No spam, just updates."}
                {activeTab === "interested" && "Not ready to commit? Just let us know you're watching."}
              </p>
            </motion.div>

            {/* Custom Tab Switcher */}
            <div className="w-full max-w-sm mb-8 p-1 bg-white/5 rounded-lg grid grid-cols-3 gap-1">
              {[
                { id: "founder", label: "Frontier" },
                { id: "waitlist", label: "Waitlist" },
                { id: "interested", label: "Observer" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as "waitlist" | "founder" | "interested");
                    setStatus("idle");
                  }}
                  className={cn(
                    "py-2 text-sm font-medium rounded-md transition-all relative", // Increased font size
                    activeTab === tab.id
                      ? "bg-white/10 text-white shadow-sm"
                      : "text-white/60 hover:text-white hover:bg-white/5", // Brightened text
                    tab.id === "founder" && activeTab === "founder" && "shadow-[0_0_15px_-3px_rgba(34,211,238,0.6)] text-cyan-50" // Glow effect for Frontier
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Dynamic Content based on Active Tab */}
            <div className="w-full max-w-sm min-h-[200px]">

              {/* WAITLIST & FOUNDER MODE */}
              {(activeTab === "waitlist" || activeTab === "founder") && (
                <form
                  onSubmit={handleFormSubmit}
                  className={cn(
                    "flex flex-col gap-3 transition-all"
                  )}
                >
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                      }}
                      placeholder="you@example.com"
                      className={cn(
                        "w-full h-12 bg-white/5 border rounded-lg px-4 text-white text-sm placeholder:text-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50",
                        status === "error"
                          ? "border-red-500/50 focus:border-red-500"
                          : "border-white/10 focus:border-cyan-500/50"
                      )}
                    />
                    {status === "error" && (
                      <div className="absolute -bottom-6 left-0 text-[11px] text-red-400 flex items-center gap-1.5 opacity-90">
                        <AlertCircle className="w-3 h-3" />
                        Enter a valid email.
                      </div>
                    )}
                    {status === "success" && (
                      <div className="absolute -bottom-6 left-0 text-[11px] text-emerald-400 flex items-center gap-1.5 opacity-90">
                        <CheckCircle2 className="w-3 h-3" />
                        {activeTab === "founder" ? "Redirecting to payment..." : "You’re on the list."}
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    isLoading={isLoading}
                    className={cn(
                      "w-full relative overflow-hidden group",
                      activeTab === "founder" && "bg-cyan-500 hover:bg-cyan-400 text-black font-semibold border-none"
                    )}
                  >
                    {activeTab === "founder" ? (
                      <span className="flex items-center gap-2 justify-center">
                        Pay $5 & Join
                      </span>
                    ) : (
                      "Join Waitlist"
                    )}
                    {activeTab === "founder" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                    )}
                  </Button>
                </form>
              )}

              {/* INTERESTED MODE */}
              {activeTab === "interested" && (
                <div className="flex flex-col gap-4 items-center animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <Button
                    variant="secondary"
                    onClick={handleInterested}
                    className="w-full"
                  >
                    I&apos;m just interested
                  </Button>
                </div>
              )}
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
      className="relative w-full max-w-sm bg-black/90 border border-white/10 rounded-2xl p-6 shadow-2xl backdrop-blur-xl"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-10"
      >
        ✕
      </button>

      {step === "select" ? (
        <>
          <h3 className="text-xl font-semibold text-white mb-2">Choose Payment Method</h3>
          <p className="text-sm text-white/50 mb-6">One-time payment of $5 for lifetime access.</p>

          <div className="flex flex-col gap-3 mb-6">
            <button
              onClick={() => setStep("gpay")}
              className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span className="font-semibold text-white">GPay</span>
            </button>
            <button
              onClick={() => setStep("paypal")}
              className="w-full py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 group"
            >
              <span className="font-semibold text-white">PayPal</span>
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-emerald-400/80">
              ✓ If we don’t ship, you get a full refund.
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <button onClick={() => setStep("select")} className="text-white/50 hover:text-white text-sm">← Back</button>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            {step === "gpay" ? "Scan GPay QR" : "Scan PayPal QR"}
          </h3>
          <p className="text-sm text-white/50 mb-6">Complete payment to finalize registration.</p>

          <div className="w-full aspect-square bg-white/5 rounded-xl border border-white/10 flex items-center justify-center mb-6 relative overflow-hidden">
            {/* Placeholder for distinct QRs */}
            <div className="absolute inset-0 bg-[url('https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=OpikaPreorder')] bg-cover opacity-50 blur-sm" />
            <span className="relative z-10 text-xs font-mono text-cyan-400 bg-black/50 px-3 py-1.5 rounded backdrop-blur-md border border-cyan-500/20">
              {step === "gpay" ? "GPay QR CODE" : "PayPal QR CODE"}
            </span>
          </div>

          <Button
            onClick={onComplete}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold"
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
