"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, useAnimation } from "framer-motion";
import { ChallengePrototypeCard } from "./ChallengePrototypeCard";
import { ChallengeState } from "./ChallengeShowcase";
import { StepsRail } from "./StepsRail";

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
    isRestarting: false,
};

export function HeroVideoSection() {
    const [state, setState] = useState<ChallengeState>(INITIAL_STATE);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-120px" });
    const shouldReduceMotion = useReducedMotion();

    const popControls = useAnimation();
    const [popped, setPopped] = useState(false);

    const updateState = useCallback((updates: Partial<ChallengeState>) => {
        setState((prev) => ({ ...prev, ...updates }));
    }, []);

    // Step 5 -> 6 (Timer Animation)
    useEffect(() => {
        if (state.step === 5 && !state.isAnimating) {
            updateState({ isAnimating: true });
            const timerDuration = shouldReduceMotion ? 0 : 1600;
            setTimeout(() => {
                updateState({ step: 6, isAnimating: false });
            }, timerDuration);
        }
    }, [state.step, state.isAnimating, shouldReduceMotion, updateState]);

    // Listen for "Play Demo" click from HeroTop
    useEffect(() => {
        const handler = async () => {
            if (shouldReduceMotion) return;

            setPopped(true);
            // Pop + slight lift + glow pulse
            await popControls.start({
                y: [0, -10, 0],
                scale: [1, 1.03, 1],
                transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
            });
            setTimeout(() => setPopped(false), 900);
        };

        window.addEventListener("settleup:play-demo", handler as EventListener);
        return () => window.removeEventListener("settleup:play-demo", handler as EventListener);
    }, [popControls, shouldReduceMotion]);

    // Subtle “trying to pop up” wiggle (only when near view)
    const wiggle =
        shouldReduceMotion || !isInView
            ? {}
            : {
                y: [0, -2, 0],
                rotate: [0, 0.15, 0, -0.15, 0],
                transition: { duration: 5.5, repeat: Infinity, ease: "easeInOut" },
            };

    return (
        <div
            id="demo"
            ref={ref}
            className="flex flex-col items-center w-full px-4 md:px-0 scroll-mt-24"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 18 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.98, y: 18 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="w-full max-w-6xl relative"
            >
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[520px] h-[520px] bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none -z-10" />

                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight">
                        Play a demo bet
                    </h2>
                    <p className="mt-2 text-sm md:text-base text-white/60">
                        Takes 20 seconds. No signup.
                    </p>
                </div>

                {/* Frame */}
                <div className="rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-[2px] p-5 md:p-6">
                    <div className="flex justify-center">
                        {/* Centered Pair: Steps + Widget */}
                        <div className="grid grid-cols-1 lg:grid-cols-[300px_500px] gap-6 items-start">

                            {/* Left rail - Steps */}
                            <div className="lg:pt-2 opacity-85">
                                <StepsRail step={state.step} onRestart={() => setState(INITIAL_STATE)} isAnimating={state.isAnimating} />
                            </div>

                            {/* Right - Interactive Card */}
                            <div className="flex justify-center lg:justify-start">
                                <motion.div
                                    animate={popControls}
                                    className={popped
                                        ? "inline-flex rounded-[28px] ring-2 ring-cyan-400/30 shadow-[0_0_0_10px_rgba(34,211,238,0.10)]"
                                        : "inline-flex"}
                                >
                                    <motion.div animate={wiggle} className="relative z-10 w-full">
                                        <ChallengePrototypeCard state={state} updateState={updateState} />
                                    </motion.div>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
