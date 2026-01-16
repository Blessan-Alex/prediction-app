"use client";

import { Container } from "@/components/layout/Container";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What happens if we disagree?",
        answer: "You can appoint a trusted 3rd party judge or use automated data API to decide perfectly."
    },
    {
        question: "What if the event can't be decided?",
        answer: "The smart contract automatically refunds both sides. 100% safe."
    },
    {
        question: "Is this real money?",
        answer: "Yes. You can add your funds and play with your friends just like in real life!"
    }
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="relative w-full py-20 lg:py-32 px-4 overflow-hidden">
            <Container className="max-w-3xl mx-auto relative z-10">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.6,
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    className="flex flex-col gap-10"
                >
                    <div className="text-center space-y-4">
                        <motion.h2
                            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                            className="text-3xl md:text-5xl font-bold text-white tracking-tight"
                        >
                            FAQ
                        </motion.h2>
                        <motion.div
                            variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
                            className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mx-auto"
                        />
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                                className="border border-white/5 bg-white/5 rounded-2xl overflow-hidden hover:border-white/10 hover:bg-white/[0.07] transition-all duration-300"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left group"
                                >
                                    <span className="text-lg md:text-xl font-medium text-white/90 group-hover:text-white transition-colors">
                                        {faq.question}
                                    </span>
                                    <div className={`ml-4 flex-shrink-0 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center transition-all duration-300 ${openIndex === i ? 'bg-cyan-500/20 rotate-180' : 'group-hover:bg-white/10'}`}>
                                        {openIndex === i ? (
                                            <Minus className="w-4 h-4 text-cyan-400" />
                                        ) : (
                                            <Plus className="w-4 h-4 text-white/40 group-hover:text-white" />
                                        )}
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-0 text-white/60 leading-relaxed text-base md:text-lg border-t border-white/5 mt-2">
                                                <div className="pt-4">
                                                    {faq.answer}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </Container>

            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-900/10 blur-[120px] rounded-full pointer-events-none" />
        </section>
    );
}
