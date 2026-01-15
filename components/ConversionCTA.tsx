"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Twitter, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { VoteBlock } from "@/components/VoteBlock";

export function ConversionCTA() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus("idle");

        // Simulate API call
        setTimeout(() => {
            if (validateEmail(email)) {
                setStatus("success");
            } else {
                setStatus("error");
            }
            setIsLoading(false);
        }, 600);
    };

    return (
        <section className="relative w-full py-24 px-4 overflow-hidden" id="cta">


            <Container className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Email Capture */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 tracking-tight">
                                Be an early tester.
                            </h2>
                            <p className="text-white/50 text-[15px] mb-8">
                                Register with your email to get first access.
                            </p>
                        </motion.div>

                        {/* Email Form */}
                        <div className="w-full max-w-sm">
                            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            if (status === "error") setStatus("idle");
                                        }}
                                        placeholder="you@example.com"
                                        className={cn(
                                            "w-full h-12 bg-white/5 border rounded-lg px-4 text-white text-sm placeholder:text-white/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50",
                                            status === "error" ? "border-red-500/50 focus:border-red-500" : "border-white/10 focus:border-cyan-500/50"
                                        )}
                                        aria-label="Email address"
                                        aria-describedby="email-feedback"
                                    />
                                    {status === "error" && (
                                        <div id="email-feedback" className="absolute -bottom-6 left-0 text-[11px] text-red-400 flex items-center gap-1.5 opacity-90">
                                            <AlertCircle className="w-3 h-3" />
                                            Enter a valid email.
                                        </div>
                                    )}
                                    {status === "success" && (
                                        <div id="email-feedback" className="absolute -bottom-6 left-0 text-[11px] text-emerald-400 flex items-center gap-1.5 opacity-90">
                                            <CheckCircle2 className="w-3 h-3" />
                                            You’re on the list.
                                        </div>
                                    )}
                                </div>
                                <Button type="submit" size="lg" isLoading={isLoading} className="w-full">
                                    Register
                                </Button>
                            </form>

                            <div className="mt-8 flex items-center justify-center md:justify-start gap-6">
                                <button disabled className="text-sm font-medium text-white/40 hover:text-white transition-colors cursor-not-allowed">
                                    Notify Me
                                </button>
                                <a href="#" className="flex items-center gap-1.5 text-sm font-medium text-white/40 hover:text-white transition-colors">
                                    <Twitter className="w-3.5 h-3.5" />
                                    Follow us on X
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Vote Block */}
                    <div className="w-full max-w-md mx-auto md:ml-auto">
                        <VoteBlock />
                    </div>

                </div>
            </Container>
        </section>
    );
}
