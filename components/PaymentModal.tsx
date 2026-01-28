"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check, Mail } from "lucide-react";

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

            <h3 className="text-xl font-semibold text-white mb-2 text-center mt-2">
                You got early access!
            </h3>
            <p className="text-center text-white/60 mb-6 text-sm px-4">
                Now if you pay $1 you can be a <span className="text-amber-400 font-bold">Frontier Member</span>.
            </p>

            <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-emerald-500/10 rounded-full">
                        <Check className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-white font-medium">10 in-app credits</p>
                        <p className="text-white/60 text-sm">Start betting immediately with $10 in your wallet.</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="mt-1 p-1 bg-amber-500/10 rounded-full">
                        <div className="w-4 h-4 flex items-center justify-center text-amber-400 font-bold text-xs">$</div>
                    </div>
                    <div>
                        <p className="text-white font-medium">Frontier Status</p>
                        <p className="text-white/60 text-sm">Exclusive badge and priority feature access.</p>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 mb-6 border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-5">
                    <Mail className="w-12 h-12 text-white" />
                </div>
                <p className="text-[10px] text-cyan-400 mb-1 font-bold uppercase tracking-wider">
                    Important Next Step
                </p>
                <p className="text-white/80 text-sm leading-relaxed">
                    After payment, send a screenshot to <span className="text-white font-medium select-all">predictionwagers@proton.me</span> to verify your status.
                </p>
            </div>

            <Button
                onClick={() => {
                    window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_xclick&business=admin%40opika.co&item_name=Frontier%20Member&amount=1&currency_code=USD", "_blank");
                    onComplete();
                }}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold h-12 text-base shadow-lg shadow-cyan-500/20"
            >
                Pay $1 - Become Frontier Member
            </Button>

            <p className="text-[10px] text-center text-white/30 mt-4">
                100% Refundable if we don&apos;t launch.
            </p>
        </motion.div>
    );
}
