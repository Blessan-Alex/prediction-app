"use client";

import { cn } from "@/lib/cn";
import { Check, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";

export type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface StepsRailProps {
    step: Step;
    onRestart: () => void;
    isAnimating?: boolean;
}

const STEPS = [
    { id: 1, title: "Pick the challenge and your side", desc: "Define it. Pick your side." },
    { id: 2, title: "Pick your friend", desc: "Select who you're challenging." },
    { id: 3, title: "Pick the amount", desc: "Set the stakes." },
    { id: 4, title: "Choose how it ends", desc: "Choose the judge." },
    { id: 5, title: "Event ends", desc: "Time passes..." },
    { id: 6, title: "Winner gets coins", desc: "Paid out automatically." },
] as const;

export function StepsRail({ step, onRestart, isAnimating }: StepsRailProps) {
    return (
        <div className="relative flex flex-col h-full bg-transparent p-0 border-none">
            {/* Steps List */}
            <nav aria-label="Walkthrough steps" className="relative flex-1">
                {/* Continuous vertical line behind steps - subtle */}
                <div className="absolute left-[15px] top-4 bottom-4 w-[1px] bg-white/5 z-0" />

                <ul className="relative z-10 space-y-8">
                    {STEPS.map((s) => {
                        const isCurrent = step === s.id;
                        const isCompleted = step > s.id;
                        // const isFuture = step < s.id; // Removed to keep all visible

                        return (
                            <li
                                key={s.id}
                                className={cn(
                                    "flex gap-4 transition-all duration-500 relative",
                                    "opacity-100 blur-0" // Always visible
                                )}
                                aria-current={isCurrent ? "step" : undefined}
                            >
                                {/* Active Step Glow Background */}
                                {isCurrent && (
                                    <motion.div
                                        layoutId="activeStepGlow"
                                        className="absolute -inset-x-4 -inset-y-3 bg-cyan-500/5 rounded-xl blur-md z-[-1]"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}

                                {/* Visual Indicator */}
                                <div
                                    className={cn(
                                        "relative flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500",
                                        isCurrent
                                            ? "bg-cyan-500/10 border-cyan-400 text-cyan-200 shadow-[0_0_15px_-3px_rgba(34,211,238,0.4)]"
                                            : isCompleted
                                                ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500/50"
                                                : "bg-white/5 border-white/10 text-white/30"
                                    )}
                                >
                                    {isCompleted ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <span className="text-[11px] font-bold">{s.id.toString().padStart(2, "0")}</span>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col pt-0.5">
                                    <span
                                        className={cn(
                                            "font-semibold tracking-tight transition-all duration-300",
                                            isCurrent ? "text-[15px] text-white" : isCompleted ? "text-[14px] text-white/40" : "text-[14px] text-white/40"
                                        )}
                                    >
                                        {s.title}
                                    </span>
                                    {/* Progressive Reveal for Description */}
                                    <motion.div
                                        initial={false}
                                        animate={{
                                            height: isCurrent ? "auto" : 0,
                                            opacity: isCurrent ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <span className="block mt-1 text-[12px] text-cyan-200/60 leading-tight">
                                            {s.desc}
                                        </span>
                                    </motion.div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Restart Action */}
            <div className="mt-8 pt-4 border-t border-white/5">
                <button
                    onClick={onRestart}
                    disabled={isAnimating || step === 1}
                    className="flex items-center gap-2 text-xs font-medium text-white/30 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                    <RotateCcw className="w-3 h-3 group-hover:-rotate-180 transition-transform duration-500" />
                    Restart Demo
                </button>
            </div>
        </div>
    );
}
