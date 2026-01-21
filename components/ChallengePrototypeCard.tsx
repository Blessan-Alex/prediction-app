"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/cn";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Check, Clock, Users, Sparkles, UserCheck, ArrowRight, Lock, ShieldCheck, Coins, Trophy } from "lucide-react";
import { GlowBorder } from "@/components/ui/GlowBorder";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChallengeState, Side, FinishMode } from "./ChallengeShowcase";

interface Props {
    state: ChallengeState;
    updateState: (updates: Partial<ChallengeState>) => void;
}

// --- Render Helpers ---

// Common wrapper for the content area to ensure smooth height transitions
const ContentArea = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3 }}
        className={cn("w-full space-y-5", className)}
    >
        {children}
    </motion.div>
);

export function ChallengePrototypeCard({ state, updateState }: Props) {
    const { step, isAnimating, selectedSide, eventText, finishMode, amount, opponentHandle, outcome } = state;
    const shouldReduceMotion = useReducedMotion();

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        setIsMobile(window.innerWidth < 768);
    }, []);

    // --- Refs for inputs ---
    const eventInputRef = useRef<HTMLInputElement>(null);

    // --- Handlers ---

    const handleEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateState({ eventText: e.target.value });
    };

    // --- Dynamic Sides Logic ---
    // Memoize to prevent unnecessary re-calcs/renders during typing
    const currentSides = useRef<Side[]>(["Side A", "Side B"]);

    // Update ref only when meaningful change occurs
    const text = eventText.toLowerCase();
    if (text.includes("india") || text.includes("pakistan")) currentSides.current = ["India", "Pakistan"];
    else if (text.includes("lakers") || text.includes("warriors")) currentSides.current = ["Lakers", "Warriors"];
    else if (!text.includes("india") && !text.includes("lakers")) currentSides.current = ["Side A", "Side B"];

    const selectSide = (side: Side) => {
        if (isAnimating) return;
        updateState({ selectedSide: side });
    };

    const confirmStep1 = () => {
        if (eventText.length < 3) {
            eventInputRef.current?.focus();
            return;
        }
        if (!selectedSide) return; // UI should disable button
        updateState({ step: 2 });
    };

    const [isLocking, setIsLocking] = useState(false);

    const selectAmount = (amt: number) => {
        if (isAnimating) return;
        updateState({ amount: amt });
        setIsLocking(true);

        // Explicit Escrow Animation
        setTimeout(() => {
            setIsLocking(false);
            updateState({ step: 4 });
        }, 1500);
    };

    const selectFinishMode = (mode: FinishMode) => {
        if (isAnimating) return;
        updateState({ finishMode: mode });
        // If judge needed, showing judge picker in same step
        if (mode === "Trusted friend decides") {
            // Stay on step 4 to pick judge
        } else {
            updateState({ step: 5 });
        }
    };

    // --- Step 6 Logic (Animation Sequence) ---
    const [showConfetti, setShowConfetti] = useState(false);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        if (step === 6 && !outcome) {
            // Trigger outcome animation logic if handled inside component (but it was handled in parent)
            // Parent sets Step 6 after Timer.
            // Parent set outcome to "Lakers".

            // We need a small sequence for Step 6:
            // 1. "Checking..." or "Confirming..." (0.8s)
            // 2. Show Winner (Lakers) + Confetti
            // 3. Move Coins

            // Let's handle local visual state here
            const sequence = async () => {
                if (shouldReduceMotion) {
                    setShowResult(true);
                    updateState({ outcome: selectedSide || "Winner" });
                    return;
                }

                // Reset local states
                setShowResult(false);
                setShowConfetti(false);

                await new Promise(r => setTimeout(r, 1500)); // Wait for "Checking" UI (extended for visibility)

                // Determine winner (Demo logic: You win if you picked Lakers or India, otherwise random?)
                // Let's just make the user win for positive reinforcement in demo :)
                const winner = selectedSide || currentSides.current[0];
                updateState({ outcome: winner });

                setShowResult(true);
                setShowConfetti(true);
            };
            sequence();
        }
        if (step !== 6) {
            setShowResult(false);
            setShowConfetti(false);
        }
    }, [step, outcome, shouldReduceMotion, selectedSide, updateState]);




    const Wrapper = isMobile ? 'div' : GlowBorder;
    const wrapperProps = isMobile
        ? { className: "relative w-full shadow-2xl rounded-3xl border border-white/10 overflow-hidden" }
        : { className: "w-full shadow-2xl", color: isAnimating ? "#f59e0b" : "#06b6d4" };

    return (
        <div className="relative w-full md:w-[440px] flex-shrink-0">



            {/* Main Card */}
            <Wrapper {...wrapperProps}>
                <Card className="relative h-[540px] p-6 flex flex-col items-center bg-gradient-to-br from-[#1e2738] to-[#131826] border-white/10 overflow-hidden">

                    {/* Header (Status Bar Style) */}
                    <div className="w-full mb-6 pb-4 border-b border-white/5 space-y-2">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-emerald-400/90 tracking-widest uppercase">
                                    Demo Mode
                                </span>
                                <span className="text-[9px] text-white/40 font-medium">
                                    Simulation only — No real money
                                </span>
                                {/* Dynamic Friend Status */}
                                <AnimatePresence>
                                    {opponentHandle && step >= 3 && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-1.5 mt-1"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            <span className="text-[10px] text-emerald-400/80 font-medium">
                                                {opponentHandle} joined
                                                {amount && step >= 4 && " & matched amount"}
                                            </span>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="flex gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/20" />
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/20" />
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500/20" />
                            </div>
                        </div>

                        {/* Mode Context Label (Step 4+) */}
                        {finishMode && step >= 4 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-[11px] text-cyan-200/50 font-medium"
                            >
                                Mode: {finishMode}
                            </motion.div>
                        )}
                    </div>

                    {/* DYNAMIC CONTENT AREA */}
                    <div className="flex-1 w-full relative">
                        <AnimatePresence mode="wait">

                            {/* --- STEP 1: Challenge + Side --- */}
                            {step === 1 && (
                                <ContentArea key="step1">
                                    <div className="space-y-1">
                                        <label className="text-[11px] font-bold text-cyan-100 uppercase tracking-wider">
                                            What&apos;s the challenge?
                                        </label>
                                        <input
                                            ref={eventInputRef}
                                            type="text"
                                            value={eventText}
                                            onChange={handleEventChange}
                                            placeholder="e.g. Lakers vs Warriors..."
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                        />
                                        <div className="flex gap-2 mt-2">
                                            {["Lakers vs Warriors", "India vs Pakistan"].map(preset => (
                                                <button
                                                    key={preset}
                                                    onClick={() => updateState({ eventText: preset, selectedSide: null })}
                                                    className="text-[10px] px-2 py-1 bg-white/5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                                                >
                                                    {preset}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-2 pt-2">
                                        <label className="text-[11px] font-bold text-cyan-100 uppercase tracking-wider">
                                            Pick your side
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {currentSides.current.map(s => {
                                                const isSelected = selectedSide === s;
                                                return (
                                                    <button
                                                        key={s}
                                                        onClick={() => selectSide(s)}
                                                        className={cn(
                                                            "relative h-20 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all",
                                                            isSelected
                                                                ? "bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_15px_-3px_rgba(34,211,238,0.25)]"
                                                                : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10 hover:border-white/20 hover:text-white"
                                                        )}
                                                    >
                                                        <span className="font-bold text-sm text-center px-1">{s}</span>
                                                        {isSelected && (
                                                            <div className="absolute -top-2 -right-2 bg-cyan-400 text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                                                                YOU
                                                            </div>
                                                        )}
                                                    </button>
                                                )
                                            })}
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <Button
                                            className="w-full font-bold"
                                            disabled={!eventText || !selectedSide}
                                            onClick={confirmStep1}
                                        >
                                            Next <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </ContentArea>
                            )}

                            {/* --- STEP 2: Pick Friend --- */}
                            {step === 2 && (
                                <ContentArea key="step2">
                                    <div className="text-center pb-4">
                                        <h4 className="text-lg font-medium text-white">Invite a friend</h4>
                                        <p className="text-sm text-white/70">They&apos;ll get a link to join.</p>
                                    </div>

                                    <div className="space-y-4">
                                        <input
                                            type="email"
                                            value={opponentHandle || ""}
                                            onChange={(e) => updateState({ opponentHandle: e.target.value })}
                                            placeholder="friend@example.com"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
                                            autoFocus
                                        />
                                        <Button
                                            className="w-full font-bold"
                                            disabled={!opponentHandle || !opponentHandle.includes("@")}
                                            onClick={() => updateState({ step: 3 })}
                                        >
                                            Next <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </div>
                                </ContentArea>
                            )}

                            {/* --- STEP 3: Pick Amount --- */}
                            {step === 3 && (
                                <ContentArea key="step3">
                                    <div className="text-center pb-6">
                                        <h4 className="text-lg font-medium text-white">How much?</h4>
                                        <p className="text-sm text-white/70">Each side locks this amount.</p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-3">
                                        {[10, 20, 50].map((amt) => (
                                            <button
                                                key={amt}
                                                onClick={() => selectAmount(amt)}
                                                className="relative p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-all group"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                                            <Coins className="w-5 h-5 text-emerald-400" />
                                                        </div>
                                                        <span className="text-xl font-bold text-white group-hover:text-emerald-200">${amt}</span>
                                                    </div>
                                                    <span className="text-xs text-white/30 group-hover:text-emerald-400/70">
                                                        Total pool: ${amt * 2}
                                                    </span>
                                                    {/* Escrow Motion Indicator */}
                                                    <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
                                                </div>
                                            </button>
                                        ))}
                                        <div className="text-center pt-2">
                                            <span className="text-[10px] text-white/30 flex items-center justify-center gap-1">
                                                <Lock className="w-3 h-3" />
                                                coins locked securely in smart contract
                                            </span>
                                        </div>
                                    </div>
                                </ContentArea>
                            )}

                            {/* --- STEP 4: Finish Mode --- */}
                            {step === 4 && (
                                <ContentArea key="step4">
                                    <div className="text-center pb-2">
                                        <h4 className="text-lg font-medium text-white">
                                            {finishMode === "Trusted friend decides" ? "Who decides?" : "How does it end?"}
                                        </h4>
                                        <p className="text-sm text-white/40">
                                            {finishMode === "Trusted friend decides" ? "Select a 3rd party judge." : "Choose who decides the winner."}
                                        </p>
                                    </div>

                                    {finishMode === "Trusted friend decides" ? (
                                        // Judge Selection Sub-step
                                        <div className="space-y-2 pt-2">
                                            <button
                                                onClick={() => updateState({ finishMode: null })}
                                                className="text-[11px] text-cyan-400 hover:text-cyan-300 w-full text-left mb-2 flex items-center gap-1"
                                            >
                                                ← Back to options
                                            </button>
                                            {["@judge_judy", "@crypto_cop", "@blocks_fan"].map((handle) => (
                                                <button
                                                    key={handle}
                                                    onClick={() => updateState({ judgeHandle: handle, step: 5 })}
                                                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 transition-all group"
                                                >
                                                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center border border-white/10">
                                                        <UserCheck className="w-4 h-4 text-purple-300" />
                                                    </div>
                                                    <span className="text-sm font-medium text-white">{handle}</span>
                                                    <ArrowRight className="w-4 h-4 ml-auto text-white/20 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        // Mode Selection
                                        <div className="space-y-3 pt-2">
                                            {[
                                                { id: "We both confirm", icon: Users, desc: "Both must agree on winner" },
                                                { id: "Trusted friend decides", icon: UserCheck, desc: "A 3rd party judge decides" },
                                                { id: "Auto-check", icon: Sparkles, desc: "Data feed decides automatically" },
                                            ].map((m) => (
                                                <button
                                                    key={m.id}
                                                    onClick={() => selectFinishMode(m.id as FinishMode)}
                                                    className="w-full text-left p-4 rounded-xl border border-white/10 bg-white/5 hover:bg-cyan-500/10 hover:border-cyan-500/40 transition-all group"
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                                            <m.icon className="w-5 h-5 text-white/50 group-hover:text-cyan-200" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-bold text-white group-hover:text-cyan-100">{m.id}</div>
                                                            <div className="text-xs text-white/40 group-hover:text-cyan-200/50">{m.desc}</div>
                                                        </div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </ContentArea>
                            )}

                            {/* --- STEP 5: Timer Animation --- */}
                            {step === 5 && (
                                <ContentArea key="step5" className="flex flex-col items-center justify-center h-[300px]">
                                    <div className="text-center space-y-4">
                                        <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center relative">
                                            <Clock className="w-10 h-10 text-amber-400" />
                                            {/* Spinning ring */}
                                            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spin" style={{ animationDuration: '1s' }} />
                                        </div>

                                        <div>
                                            <h4 className="text-xl font-bold text-white">Event Ending...</h4>
                                            <p className="text-sm text-white/40">Waiting for {finishMode === "Auto-check" ? "data result" : "confirmation"}</p>
                                        </div>

                                        {/* Progress Bar */}
                                        <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto mt-4">
                                            <motion.div
                                                className="h-full bg-amber-500"
                                                initial={{ width: "0%" }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 1.5, ease: "linear" }}
                                            />
                                        </div>
                                    </div>
                                </ContentArea>
                            )}

                            {/* --- STEP 6: Outcome --- */}
                            {step === 6 && (
                                <ContentArea key="step6" className="flex flex-col items-center justify-center h-[300px]">
                                    {!showResult ? (
                                        // Intermediate State
                                        <div className="flex flex-col items-center animate-pulse">
                                            <span className="text-sm font-bold text-white/60">
                                                {finishMode === "Auto-check" ? "Fetching Result..." : "Verifying..."}
                                            </span>
                                        </div>
                                    ) : (
                                        // Final State
                                        <div className="w-full text-center space-y-4 md:space-y-6 relative">
                                            {/* Confetti (Simple dots) - Desktop Only */}
                                            {showConfetti && !isMobile && (
                                                <div className="absolute inset-0 pointer-events-none">
                                                    {[...Array(12)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400"
                                                            initial={{ opacity: 1, x: 0, y: 0 }}
                                                            animate={{
                                                                opacity: 0,
                                                                x: (Math.random() - 0.5) * 200,
                                                                y: (Math.random() - 0.5) * 200
                                                            }}
                                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                                            style={{ left: '50%', top: '50%' }}
                                                        />
                                                    ))}
                                                </div>
                                            )}

                                            <motion.div
                                                initial={{ scale: 0.5, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-sm"
                                            >
                                                WINNER: {outcome ?? "Determining..."}
                                            </motion.div>

                                            <div className="bg-[#0c101b] rounded-2xl p-4 border border-white/10 w-full max-w-[280px] mx-auto shadow-xl relative overflow-hidden">
                                                <div className="flex items-center justify-between z-10 relative">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                                                            <Trophy className="w-5 h-5 text-amber-400" />
                                                        </div>
                                                        <div className="text-left">
                                                            <div className="text-[10px] text-white/40 uppercase tracking-wider">You won</div>
                                                            <div className="text-lg font-bold text-white">${(amount || 0) * 2}</div>
                                                        </div>
                                                    </div>
                                                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center animate-bounce">
                                                        <Check className="w-4 h-4 text-emerald-400" />
                                                    </div>
                                                </div>
                                                {/* Background gradient sweep */}
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12"
                                                    initial={{ x: '-100%' }}
                                                    animate={{ x: '100%' }}
                                                    transition={{ duration: 1, delay: 0.2 }}
                                                />
                                            </div>

                                            {/* Trust Badges */}
                                            <div className="flex items-center justify-center gap-3 pt-2">
                                                <div className="flex items-center gap-1.5 text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded-full">
                                                    <Lock className="w-3 h-3" /> Locked upfront
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[10px] text-white/30 bg-white/5 px-2 py-1 rounded-full">
                                                    <ShieldCheck className="w-3 h-3" /> Protected
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </ContentArea>
                            )}

                        </AnimatePresence>
                    </div>



                    {/* Overlay: Escrow Locking Animation */}
                    <AnimatePresence>
                        {isLocking && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-[#0e121f]/95 backdrop-blur-sm z-50 flex flex-col items-center justify-center pointer-events-none"
                            >
                                <div className="relative mb-6">
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="w-20 h-20 bg-emerald-500/10 rounded-full border border-emerald-500/30 flex items-center justify-center relative"
                                    >
                                        <Lock className="w-8 h-8 text-emerald-400" />
                                    </motion.div>

                                    {/* Coins flying in - Desktop Only */}
                                    {!isMobile && [...Array(6)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-4 h-4 rounded-full bg-amber-400 border border-amber-200 shadow-lg text-[8px] flex items-center justify-center font-bold text-amber-900"
                                            initial={{
                                                opacity: 0,
                                                x: (Math.random() - 0.5) * 150,
                                                y: 100 + Math.random() * 50
                                            }}
                                            animate={{
                                                opacity: [0, 1, 1, 0],
                                                x: 0,
                                                y: 0,
                                                scale: [1, 1, 0.5]
                                            }}
                                            transition={{
                                                duration: 0.8,
                                                delay: i * 0.1,
                                                ease: "backOut"
                                            }}
                                            style={{ left: '40%', top: '40%' }}
                                        >
                                            $
                                        </motion.div>
                                    ))}
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-center"
                                >
                                    <h4 className="text-xl font-bold text-white mb-1">Securing Funds</h4>
                                    <p className="text-sm text-white/50">Sending ${(amount || 0) * 2} to Vault...</p>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </Card>
            </Wrapper>
        </div>
    );
}
