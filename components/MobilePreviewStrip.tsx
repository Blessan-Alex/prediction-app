"use client";

import { motion } from "framer-motion";
import { CheckCircle, Play } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function MobilePreviewStrip() {
    const scrollToDemo = () => {
        // Tell the widget to do a pop animation
        window.dispatchEvent(new CustomEvent("settleup:play-demo"));

        const el = document.getElementById("demo");
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <section className="lg:hidden w-full min-h-[100svh] px-4 py-16 flex flex-col justify-center items-center gap-8 relative z-10 bg-transparent snap-start snap-always">
            {/* 1. Live Example Card */}
            <div className="w-full max-w-[400px]">
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-5 text-left relative overflow-hidden">
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
            </div>

            {/* 2. Play Demo Button */}
            <div className="w-full max-w-[400px]">
                <Button
                    type="button"
                    size="md"
                    onClick={scrollToDemo}
                    className="w-full h-14 text-base rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 hover:border-white/25 transition shadow-lg flex items-center justify-center gap-3 font-semibold"
                >
                    <Play className="w-5 h-5 fill-white" />
                    Play Interactive Demo
                </Button>
            </div>
        </section>
    );
}
