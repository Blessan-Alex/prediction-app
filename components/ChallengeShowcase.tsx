"use client";

import { useState, useEffect, useCallback } from "react";
import { useReducedMotion } from "framer-motion";
import { StepsRail, Step } from "./StepsRail";
import { ChallengePrototypeCard } from "./ChallengePrototypeCard";
import { ArrowRight } from "lucide-react";

export type FinishMode = "We both confirm" | "Trusted friend decides" | "Auto-check";
export type Side = string;

export interface ChallengeState {
    step: Step;
    eventText: string;
    selectedSide: Side | null;
    opponentHandle: string | null;
    amount: number | null;
    finishMode: FinishMode | null;
    judgeHandle: string | null;
    outcome: Side | null;
    isAnimating: boolean;
    isRestarting: boolean;
}

const INITIAL_STATE: ChallengeState = {
    step: 1,
    eventText: "",
    selectedSide: null,
    opponentHandle: null,
    amount: null,
    finishMode: null,
    judgeHandle: null,
    outcome: null,
    isAnimating: false,
    isRestarting: false, // momentary flag for reset animation
};

export function ChallengeShowcase() {
    const [state, setState] = useState<ChallengeState>(INITIAL_STATE);

    const updateState = useCallback((updates: Partial<ChallengeState>) => {
        setState((prev) => ({ ...prev, ...updates }));
    }, []);

    const handleRestart = useCallback(() => {
        updateState({ isRestarting: true });
        // Small delay to allow exit animations if we want, but for now instant reset feels snappier
        setTimeout(() => {
            setState({ ...INITIAL_STATE, isRestarting: false });
        }, 100);
    }, [updateState]);

    // --- Logic for Auto-Advancing Steps ---

    const shouldReduceMotion = useReducedMotion();

    // Step 5 -> 6 (Timer Animation)
    useEffect(() => {
        if (state.step === 5 && !state.isAnimating) {
            updateState({ isAnimating: true });

            const timerDuration = shouldReduceMotion ? 0 : 1600; // 1.6s fast forward

            setTimeout(() => {
                updateState({
                    step: 6,
                    isAnimating: false,
                    // Outcome will be determined by the card animation
                });
            }, timerDuration);
        }
    }, [state.step, state.isAnimating, shouldReduceMotion, updateState]);

    const handleScrollToCTA = () => {
        document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="w-full flex flex-col items-center gap-12">

            {/* Main Showcase Container */}
            <div className="w-full max-w-4xl mx-auto rounded-3xl overflow-hidden border border-white/10 bg-[#0c101b] shadow-2xl shadow-cyan-900/20 relative group">
                {/* Subtle Star Density Overlay (Scoped) */}
                <div
                    className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                    style={{
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                    }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] xl:grid-cols-[300px_1fr] min-h-[600px] relative z-10">

                    {/* LEFT: Steps Rail */}
                    <div className="hidden lg:block h-full">
                        <StepsRail
                            step={state.step}
                            onRestart={handleRestart}
                            isAnimating={state.isAnimating}
                        />
                    </div>

                    {/* RIGHT: Prototype Area */}
                    <div className="relative w-full h-full bg-[#080a11] flex flex-col items-center justify-center p-6 md:p-10 lg:p-12 overflow-hidden">
                        {/* Ambient Background Glows for the Right Side */}
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] bg-cyan-600/5 blur-[80px] rounded-full pointer-events-none" />

                        {/* Mobile Header (Only visible on small screens) */}
                        <div className="lg:hidden w-full flex justify-between items-center mb-6">
                            <div className="px-3 py-1 rounded-full bg-cyan-950/30 border border-cyan-500/20">
                                <span className="text-[11px] font-bold text-cyan-200 tracking-wider">
                                    STEP {state.step} OF 6
                                </span>
                            </div>
                            <button
                                onClick={handleRestart}
                                className="text-[11px] font-medium text-white/40 hover:text-white"
                            >
                                Restart
                            </button>
                        </div>

                        <ChallengePrototypeCard
                            state={state}
                            updateState={updateState}
                        />
                    </div>
                </div>
            </div>

            {/* Conversion Button */}
            <button
                onClick={handleScrollToCTA}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-sm font-medium text-white/70 hover:text-white"
            >
                Get early access
                <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>
        </div>
    );
}
