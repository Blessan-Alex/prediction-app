"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, User, Users, Sparkles, UserCheck } from "lucide-react";
import { cn } from "@/lib/cn";
import { GlowBorder } from "@/components/ui/GlowBorder";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

type Side = "Lakers" | "Warriors";
type FinishMode = "We both confirm" | "A trusted friend decides" | "Auto-check";
type Step = 1 | 2 | 3;

export function ChallengeWidget() {
    const [step, setStep] = useState<Step>(1);
    const [selectedSide, setSelectedSide] = useState<Side | null>(null);
    const [finishMode, setFinishMode] = useState<FinishMode | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSideSelect = (side: Side) => {
        if (selectedSide === side) return;
        setSelectedSide(side);
        setError(null);
        if (step < 2) setStep(2);
    };

    const handleFinishSelect = (mode: FinishMode) => {
        setFinishMode(mode);
        setError(null);
        if (step < 3) setStep(3);
    };

    const handleCreate = () => {
        if (!selectedSide) {
            setError("Pick a side to continue.");
            return;
        }
        if (!finishMode) {
            setError("Choose how it finishes.");
            return;
        }

        const cta = document.getElementById("cta");
        if (cta) {
            cta.scrollIntoView({ behavior: "smooth", block: "start" });
            // Add momentary highlight class manually
            cta.classList.add("ring-2", "ring-cyan-500", "ring-offset-4", "ring-offset-black");
            setTimeout(() => {
                cta.classList.remove("ring-2", "ring-cyan-500", "ring-offset-4", "ring-offset-black");
            }, 1000);
        }
    };

    return (
        <div className="relative z-10 w-full max-w-[92vw] md:max-w-[460px] mx-auto">
            {/* Step Indicator with Rail */}
            <div className="absolute -top-4 right-4 z-20 flex flex-col items-end gap-1">
                <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-md shadow-lg shadow-amber-900/10">
                    <span className="text-[10px] font-bold tracking-wider text-amber-200 uppercase">
                        Step {step} of 3
                    </span>
                </div>
                {/* Progress Rail */}
                <div className="flex gap-1 h-1">
                    {[1, 2, 3].map((s) => (
                        <div
                            key={s}
                            className={cn(
                                "w-4 rounded-full transition-all duration-300",
                                step >= s ? "bg-amber-500/80" : "bg-white/10"
                            )}
                        />
                    ))}
                </div>
            </div>

            <GlowBorder className="w-full shadow-2xl">
                <Card className="relative p-5 md:p-6 flex flex-col space-y-5 border-white/10 bg-[#0c101b]/80 backdrop-blur-xl overflow-hidden">

                    {/* 1) Spotlight Gradient */}
                    <div className="absolute -top-[100px] -left-[100px] w-[300px] h-[300px] bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none" />

                    {/* Header */}
                    <div className="relative z-10 space-y-1">
                        <h3 className="text-[17px] font-semibold text-white tracking-tight">
                            Create a 2-side challenge
                        </h3>
                    </div>

                    {/* Event Field */}
                    <div className="relative z-10 space-y-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">Event</span>
                        </div>
                        <div className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 flex items-center text-[15px] font-medium text-white shadow-inner">
                            Lakers vs Warriors — who wins?
                        </div>
                    </div>

                    {/* Side Selection (Step 1) */}
                    <div className={cn("relative z-10 space-y-2 transition-all duration-500", step === 1 ? "opacity-100" : "opacity-90")}>
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">Pick your side</span>
                            <span className="text-[11px] text-cyan-200/60 font-medium">10 coins each</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {(["Lakers", "Warriors"] as Side[]).map((side) => {
                                const isSelected = selectedSide === side;
                                const isOtherSelected = selectedSide && selectedSide !== side;

                                return (
                                    <button
                                        key={side}
                                        onClick={() => handleSideSelect(side)}
                                        aria-pressed={isSelected}
                                        className={cn(
                                            "relative h-14 rounded-xl border text-[15px] font-semibold transition-all duration-200 flex items-center justify-center gap-2",
                                            isSelected
                                                ? "bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-400/60 text-white shadow-[0_0_15px_-3px_rgba(34,211,238,0.25)]"
                                                : "bg-white/5 border-white/5 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white",
                                            isOtherSelected && "opacity-40 hover:opacity-100"
                                        )}
                                    >
                                        {side}
                                        {isSelected && <Check className="w-4 h-4 text-cyan-400" strokeWidth={3} />}
                                        {isSelected && (
                                            <div className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-lg">
                                                YOU
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        {/* Micro Trust Line */}
                        <div className="flex items-center gap-1.5 pt-1">
                            <div className="w-1 h-1 rounded-full bg-white/20" />
                            <span className="text-[11px] text-white/30">Rules lock when your friend joins.</span>
                        </div>
                    </div>

                    {/* Friend Join Animation (Step 2 Preview) */}
                    <AnimatePresence>
                        {step >= 2 && selectedSide && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center border border-amber-500/30">
                                        <User className="w-4 h-4 text-amber-200" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-[13px] text-white/90 font-medium">Friend joins</span>
                                        <span className="text-[11px] text-white/40">
                                            Picked {selectedSide === "Lakers" ? "Warriors" : "Lakers"} • 10 coins locked
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Decision Settings (Step 3 Focus) */}
                    <div className="relative z-10 space-y-4 pt-3 border-t border-white/5">

                        {/* Time Row */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/50 font-medium">
                                <Clock className="w-3.5 h-3.5 text-white/40" />
                                <span>Decide after</span>
                            </div>
                            <div className={cn(
                                "text-sm font-medium transition-colors duration-300",
                                finishMode ? "text-amber-100" : "text-white/60"
                            )}>
                                Tonight, 11:30 PM
                            </div>
                        </div>

                        {/* Finish Mode Chips */}
                        <div className="space-y-2">
                            <span className="text-[11px] uppercase tracking-wider text-white/50 font-medium">How it finishes</span>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { label: "We both confirm", icon: Users, id: "We both confirm" },
                                    { label: "Trusted friend", icon: UserCheck, id: "A trusted friend decides" },
                                    { label: "Auto-check", icon: Sparkles, id: "Auto-check" },
                                ].map((mode) => {
                                    const isActive = finishMode === mode.id;
                                    return (
                                        <button
                                            key={mode.id}
                                            onClick={() => handleFinishSelect(mode.id as FinishMode)}
                                            aria-pressed={isActive}
                                            className={cn(
                                                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-medium transition-all duration-200",
                                                isActive
                                                    ? "bg-cyan-900/30 border-cyan-400/50 text-cyan-50 shadow-[0_0_8px_rgba(34,211,238,0.15)]"
                                                    : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10 hover:border-white/20 hover:text-white/90"
                                            )}
                                        >
                                            {isActive ? <Check className="w-3 h-3" /> : <mode.icon className="w-3 h-3 opacity-70" />}
                                            {mode.label}
                                        </button>
                                    )
                                })}
                            </div>
                            {/* Dynamic Micro Trust Line */}
                            <div className="flex items-center gap-1.5 pt-1 min-h-[20px]">
                                <div className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="text-[11px] text-white/30 transition-all duration-300">
                                    {finishMode === "We both confirm" && "If you disagree, coins return to both."}
                                    {finishMode === "A trusted friend decides" && "If they don't decide, coins return to both."}
                                    {finishMode === "Auto-check" && "SettleUp checks the actual outcome and decides."}
                                    {!finishMode && "If it can’t be decided, coins return."}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                        <Button
                            size="lg"
                            className="w-full h-12 bg-white text-black hover:bg-white/90 font-bold text-[15px] shadow-lg shadow-white/5"
                            onClick={handleCreate}
                        >
                            Create challenge
                        </Button>

                        {/* Inline Error */}
                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-3 text-center" aria-live="polite">
                                        <span className="inline-block px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[12px] text-red-200 font-medium">
                                            {error}
                                        </span>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                </Card>
            </GlowBorder>
        </div>
    );
}
