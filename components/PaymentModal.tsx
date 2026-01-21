"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PaymentModalContent({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
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
                    <div className="text-sm text-center mb-6 space-y-1">
                        <p className="text-white/90 font-medium">
                            Secure your spot among the first 100.
                        </p>
                        <p className="text-white/70">
                            Includes <span className="text-cyan-300 font-semibold">1 Year Pro Free</span> & Priority Access.
                        </p>
                        <p className="text-white/50 text-xs mt-1">
                            Fully refundable if we don&apos;t launch.
                        </p>
                    </div>

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
