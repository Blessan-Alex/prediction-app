"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, CreditCard, ChevronDown, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function VoteBlock() {
    const [showQr, setShowQr] = useState(false);
    const [paypalClicked, setPaypalClicked] = useState(false);

    const handlePaypalClick = () => {
        setPaypalClicked(true);
        setTimeout(() => setPaypalClicked(false), 2000);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative group w-full rounded-2xl p-[1px] overflow-hidden"
        >
            {/* A) Premium Glow Frame & Aura */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-blue-600/20 to-transparent blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/50 via-blue-500/30 to-transparent opacity-0 group-hover:opacity-40 blur-xl transition-opacity duration-700" />

            {/* Content Container */}
            <div className="relative h-full w-full bg-[#0a0f1c]/95 backdrop-blur-xl rounded-[calc(1rem-1px)] p-6 md:p-8 overflow-hidden">

                {/* B) Spotlight Accent */}
                <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

                {/* Header Section */}
                <div className="relative z-10 mb-8 flex flex-col items-center md:items-start text-center md:text-left">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-4 tracking-tight drop-shadow-sm">
                        Support this launch
                    </h3>

                    {/* C) Fairness Trust Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/30 border border-cyan-500/20 shadow-[0_0_10px_-4px_rgba(34,211,238,0.3)]">
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-[12px] font-medium text-cyan-100/90">
                            If we don’t ship, you get a refund.
                        </span>
                    </div>
                </div>

                {/* D) Payment Options Grid */}
                <div className="relative z-10 grid grid-cols-1 gap-4">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* PayPal Option */}
                        <div className="relative flex flex-col justify-between p-5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.06] transition-all group/card">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex flex-col items-start gap-1">
                                    <span className="text-sm font-semibold text-white/90">PayPal</span>
                                    <span className="text-[11px] text-white/40">Secure checkout</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover/card:border-white/10 transition-colors">
                                    <CreditCard className="w-4 h-4 text-white/60" />
                                </div>
                            </div>

                            <Button
                                onClick={handlePaypalClick}
                                className={cn(
                                    "w-full font-bold h-11 text-white shadow-lg transition-all",
                                    "bg-gradient-to-r from-[#0070BA] to-[#005ea6] hover:from-[#0085db] hover:to-[#0070BA]",
                                    "hover:shadow-blue-500/20 active:scale-[0.98]"
                                )}
                            >
                                {paypalClicked ? "Thanks!" : "PayPal"}
                            </Button>
                            <span className="text-[10px] text-white/30 text-center mt-2">Opens PayPal</span>
                        </div>

                        {/* GPay QR Option (Drawer Style) */}
                        <div className={cn(
                            "relative flex flex-col p-5 rounded-xl border transition-all duration-300",
                            showQr
                                ? "bg-white/[0.05] border-cyan-500/30 shadow-[0_0_20px_-10px_rgba(6,182,212,0.2)]"
                                : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                        )}>
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between w-full mb-1">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center border transition-colors",
                                        showQr ? "bg-cyan-500/20 border-cyan-500/30" : "bg-white/5 border-white/5"
                                    )}>
                                        <QrCode className={cn("w-4 h-4", showQr ? "text-cyan-400" : "text-white/60")} />
                                    </div>
                                    <div>
                                        <span className={cn("block text-sm font-semibold transition-colors", showQr ? "text-white" : "text-white/90")}>
                                            GPay QR
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setShowQr(!showQr)}
                                    className="p-1 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50"
                                    aria-expanded={showQr}
                                    aria-controls="qr-content"
                                    aria-label="Toggle QR code"
                                >
                                    <ChevronDown className={cn("w-5 h-5 transition-transform duration-300", showQr && "rotate-180")} />
                                </button>
                            </div>

                            {/* Expandable Content */}
                            <AnimatePresence>
                                {showQr && (
                                    <motion.div
                                        id="qr-content"
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="w-full aspect-square max-w-[140px] mx-auto bg-white rounded-xl p-3 shadow-inner flex items-center justify-center mb-3">
                                            <QrCode className="w-full h-full text-black/80" />
                                        </div>
                                        <p className="text-[12px] text-center text-cyan-200/70 font-medium">Scan to vote $1</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!showQr && (
                                <div className="mt-auto pt-2">
                                    <button
                                        onClick={() => setShowQr(true)}
                                        className="text-[11px] font-medium text-cyan-400/80 hover:text-cyan-300 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500/50 rounded-sm"
                                    >
                                        Show QR
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </motion.div>
    );
}
