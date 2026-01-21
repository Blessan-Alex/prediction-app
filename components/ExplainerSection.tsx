"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Handshake, Zap, Clock, Heart, MoveRight, Scale, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/cn";

export function ExplainerSection() {
    const [activeTab, setActiveTab] = useState<"public" | "private">("public");

    return (
        <section className="relative w-full py-24 px-4 border-t border-white/5">
            {/* Background Ambience */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0e121f] to-[#080b14] -z-20" />

            {/* Center Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />


            <div className="max-w-6xl mx-auto">

                {/* Section Header */}
                <div className="text-center mb-16 space-y-3">
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                        What exactly is this app?
                    </h2>
                    <p className="text-white/50 text-xl max-w-2xl mx-auto">
                        SettleUp removes the awkward part of betting: collecting money after.
                    </p>
                </div>

                {/* 3-Card Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

                    {/* CARD 1: What SettleUp is */}
                    <div className="relative group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 flex flex-col hover:bg-white/[0.05] transition-colors">
                        <div className="mb-6">
                            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center mb-4 border border-cyan-500/20">
                                <Handshake className="w-5 h-5 text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Friendly bets. <br /> No money chasing.</h3>
                        </div>

                        <div className="flex-1 space-y-4">
                            {/* Comparison Block */}
                            <div className="relative p-4 rounded-xl bg-red-500/5 border border-red-500/10 group-hover:border-red-500/20 transition-colors">
                                <span className="absolute -top-2.5 left-4 px-2 bg-[#0e121f] text-xs uppercase font-bold text-red-400 tracking-wider">Usually</span>
                                <div className="text-base text-red-200/60 leading-relaxed">
                                    You win <MoveRight className="inline w-3 h-3 mx-1" /> you ask <MoveRight className="inline w-3 h-3 mx-1" /> they delay <br /> <span className="text-red-300 font-medium">It gets weird.</span>
                                </div>
                            </div>

                            <div className="relative p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                                <span className="absolute -top-2.5 left-4 px-2 bg-[#0e121f] text-xs uppercase font-bold text-emerald-400 tracking-wider">With SettleUp</span>
                                <div className="text-base text-emerald-200/60 leading-relaxed">
                                    Both lock money first <MoveRight className="inline w-3 h-3 mx-1" /> <br /> <span className="text-emerald-300 font-medium">Winner gets paid automatically.</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-white/5 text-center">
                            <p className="text-sm text-white/40 italic">That&apos;s it. That&apos;s the whole thing.</p>
                        </div>
                    </div>

                    {/* CARD 2: How winner is decided */}
                    <div className="relative group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 flex flex-col hover:bg-white/[0.05] transition-colors">
                        <div className="mb-6">
                            <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
                                <Scale className="w-5 h-5 text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">How we decide <br /> the winner</h3>
                        </div>

                        {/* Tabs */}
                        <div className="w-full bg-white/5 p-1 rounded-xl flex mb-6 border border-white/5">
                            {(["public", "private"] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={cn(
                                        "flex-1 py-1.5 text-xs md:text-sm font-bold uppercase tracking-wider rounded-lg transition-all",
                                        activeTab === tab ? "bg-white/10 text-white shadow-sm" : "text-white/40 hover:text-white/60"
                                    )}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="flex-1 relative h-[140px]">
                            <AnimatePresence mode="wait">
                                {activeTab === "public" ? (
                                    <motion.div
                                        key="public"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {["Game scores", "Elections", "Stock prices"].map(tag => (
                                                <span key={tag} className="px-2 py-1.5 rounded-md bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Zap className="w-4 h-4 text-amber-400 mt-1 shrink-0" />
                                            <p className="text-base text-white/70">We check the result automatically and pay the winner deeply instantly.</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="private"
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-4"
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            {["Pushups", "First to verify", "Read a book"].map(tag => (
                                                <span key={tag} className="px-2 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-[11px] text-indigo-200">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-white/70">We ask both of you who won.</p>
                                            <div className="space-y-1 pl-4 border-l border-white/10">
                                                <div className="flex items-center gap-2 text-xs text-white/50">
                                                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                    If agree → Winner paid
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-white/50">
                                                    <XCircle className="w-3 h-3 text-red-500" />
                                                    If disagree → Both refunded
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Ghosting Rule */}
                        <div className="pt-4 mt-auto border-t border-white/5">
                            <div className="flex items-center gap-2 text-xs md:text-sm text-white/30">
                                <Clock className="w-3.5 h-3.5" />
                                <span>No response in 48h → Bet cancels & refunds.</span>
                            </div>
                        </div>
                    </div>

                    {/* CARD 3: Why we built this */}
                    <div className="relative group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 flex flex-col hover:bg-white/[0.05] transition-colors">
                        <div className="mb-6">
                            <div className="w-10 h-10 rounded-full bg-pink-500/10 flex items-center justify-center mb-4 border border-pink-500/20">
                                <Heart className="w-5 h-5 text-pink-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-1">Why we built <br /> SettleUp</h3>
                        </div>

                        <div className="flex-1 space-y-4">
                            <p className="text-base text-white/70 leading-relaxed">
                                Bets between friends are fun. Collecting money after is not.
                            </p>
                            <p className="text-base text-white/70 leading-relaxed">
                                The moment you have to remind a friend they owe you $20, it kills the vibe.
                            </p>

                            <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/10 mt-4">
                                <p className="text-sm font-medium text-pink-200">
                                    &quot;We keep the fun part <br /> and remove the awkward part.&quot;
                                </p>
                            </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2">
                            <div className="flex -space-x-2">
                                <div className="w-6 h-6 rounded-full bg-white/10 border border-[#0e121f]" />
                                <div className="w-6 h-6 rounded-full bg-white/20 border border-[#0e121f]" />
                            </div>
                            <span className="text-xs text-white/30">Built by friends, for friends.</span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
