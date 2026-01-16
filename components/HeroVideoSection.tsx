"use client";

import { motion } from "framer-motion";
import { ScrollToCTAButton } from "./ScrollToCTAButton";

export function HeroVideoSection() {
    return (
        <div className="flex flex-col items-center w-full">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }} // Trigger when in view, or animate on load? Usually hero is in view immediately. animate is better for hero.
                animate={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-black/50 backdrop-blur-sm"
            >
                <video
                    src="/demo.m4v"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                />
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-8"
            >
                <ScrollToCTAButton />
            </motion.div>
        </div>
    );
}
