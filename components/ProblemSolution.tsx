"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";

export default function ProblemSolution() {
    return (
        <section
            className="relative w-full overflow-hidden"
            aria-labelledby="problem-heading"
            style={{ paddingBottom: '100px', paddingTop: '120px' }}
        >


            <Container className="relative z-10">
                <div className="flex flex-col items-start max-w-4xl">

                    <motion.div
                        className="flex flex-col gap-6 md:gap-8"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.15 } }
                        }}
                    >
                        {/* Dash Accent */}
                        <motion.div
                            variants={{
                                hidden: { width: 0, opacity: 0 },
                                show: { width: 40, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
                            }}
                            className="h-[3px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-2"
                        />

                        {/* Main Headline */}
                        <motion.h2
                            id="problem-heading"
                            className="text-white font-bold leading-[1.1] tracking-tight"
                            style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
                            }}
                        >
                            Ever had a friend go <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-200 to-blue-400">quiet</span> right when it’s time to pay up?
                        </motion.h2>

                        {/* Secondary Line */}
                        <motion.p
                            className="text-white/60 text-lg md:text-xl font-medium max-w-2xl leading-relaxed"
                            variants={{
                                hidden: { opacity: 0 },
                                show: { opacity: 1, transition: { duration: 0.8 } }
                            }}
                        >
                            SettleUp makes sure the awkward part never starts.
                        </motion.p>
                    </motion.div>

                </div>
            </Container>

            {/* Bottom Gradient Accent Band */}
            <motion.div
                className="absolute bottom-0 left-0 right-0 h-[80px] md:h-[120px] pointer-events-none"
                initial={{ opacity: 0, scaleX: 0.8 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                {/* Core Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-t from-blue-900/40 via-cyan-900/10 to-transparent blur-3xl opacity-60" />

                {/* Horizon Line Glow */}
                <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            </motion.div>
        </section>
    );
}
