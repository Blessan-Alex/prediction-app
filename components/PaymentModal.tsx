"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function PaymentModalContent({ onClose, onComplete }: { onClose: () => void; onComplete: () => void }) {
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

            <h3 className="text-xl font-semibold text-white mb-2 text-center mt-4">
                Complete Payment
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

            <Button
                onClick={() => {
                    window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=admin%40opika.co&item_name=Payment&amount=1&currency_code=USD", "_blank");
                    onComplete();
                }}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold h-12"
            >
                Proceed to PayPal
            </Button>

            <p className="text-[10px] text-center text-white/30 mt-4">
                Transaction ID verification may be required.
            </p>
        </motion.div>
    );
}
