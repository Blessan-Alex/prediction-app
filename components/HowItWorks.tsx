"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/cn";

const steps = [
    {
        id: 1,
        title: "Create a challenge",
    },
    {
        id: 2,
        title: "Friend joins, rules lock",
    },
    {
        id: 3,
        title: "Decide or coins return",
    },
];

export default function HowItWorks() {
    const [activeStep, setActiveStep] = useState<number | null>(null);

    // Animations variants
    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <section className="relative w-full py-16 md:py-24 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col items-center">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-2xl md:text-3xl font-semibold text-white mb-3 tracking-tight">
                        Three steps.
                    </h2>
                    <p className="text-sm md:text-[15px] text-white/50">
                        Simple flow. Clear finish.
                    </p>
                </motion.div>

                {/* Timeline Container */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className="relative w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center pl-8 md:pl-0"
                >
                    {/* Horizontal Line (Desktop) */}
                    <div className="absolute top-[1.125rem] left-0 right-0 hidden md:block h-[1px] bg-white/10 -z-10" />

                    {/* Vertical Line (Mobile) */}
                    <div className="absolute top-2 bottom-2 left-[1.125rem] md:hidden w-[1px] bg-white/10 -z-10" />

                    {/* Steps */}
                    {steps.map((step, index) => {
                        const isLast = index === steps.length - 1;
                        const isActive = activeStep === step.id; // Hover interaction

                        // Interaction logic:
                        // When hovering a node, we can highlight the path *to* the next node?
                        // Actually prompt says: "line segment to next step brightens slightly" when hovering a step.
                        // So if I hover Step 1, the line between 1 and 2 should brighten.

                        const showLineHighlight = activeStep === step.id && !isLast;

                        return (
                            <motion.div
                                key={step.id}
                                variants={itemVariants}
                                className="relative flex md:flex-col items-center md:text-center w-full md:w-1/3 mb-10 md:mb-0 group"
                                onMouseEnter={() => setActiveStep(step.id)}
                                onMouseLeave={() => setActiveStep(null)}
                            >
                                {/** 
                  * Line Highlight Segment (Desktop)
                  * Positioned to the right of the circle
                  */}
                                {!isLast && (
                                    <div
                                        className={cn(
                                            "hidden md:block absolute top-[1.125rem] left-[50%] w-full h-[1px] bg-cyan-400/50 transition-opacity duration-300 z-0",
                                            showLineHighlight ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                )}

                                {/** 
                  * Line Highlight Segment (Mobile)
                  * Positioned below the circle
                  */}
                                {!isLast && (
                                    <div
                                        className={cn(
                                            "md:hidden absolute top-[2.25rem] left-[1.125rem] w-[1px] h-[calc(100%+1.5rem)] bg-cyan-400/50 transition-opacity duration-300 z-0",
                                            showLineHighlight ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                )}

                                {/* Circle Node */}
                                <div
                                    className={cn(
                                        "flex items-center justify-center w-9 h-9 rounded-full",
                                        "border backdrop-blur-md z-10 transition-all duration-300",
                                        "bg-black/40",
                                        // Active/Highlight states
                                        isActive
                                            ? "border-cyan-400/60 shadow-[0_0_15px_rgba(34,211,238,0.3)] text-cyan-50"
                                            : "border-white/10 text-white/50 group-hover:border-white/30 group-hover:text-white/80"
                                    )}
                                >
                                    <span className="text-[13px] font-mono font-medium">
                                        {step.id}
                                    </span>
                                </div>

                                {/* Text Content */}
                                <div className="ml-6 md:ml-0 md:mt-6 text-left md:text-center">
                                    <h3 className={cn(
                                        "text-[15px] font-medium transition-colors duration-300",
                                        isActive ? "text-cyan-50" : "text-white/90"
                                    )}>
                                        {step.title}
                                    </h3>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
