"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Container } from "@/components/layout/Container";
import { Pill } from "@/components/ui/Pill";
import { cn } from "@/lib/cn";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-[#0a0f1c]/80 backdrop-blur-md border-b border-white/5 py-4"
                    : "bg-transparent py-6 md:py-8"
            )}
        >
            <Container className="flex items-center justify-between">
                {/* Left: Brand Group */}
                <div className="flex items-center gap-3 md:gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow-blue rounded-md"
                        aria-label="SettleUp Home"
                    >
                        <div className="relative h-6 w-6 md:h-[26px] md:w-[26px]">
                            <Image
                                src="/images/logo.png"
                                alt="SettleUp Logo"
                                fill
                                className="object-contain"
                                sizes="26px"
                                priority
                            />
                        </div>
                        <span className="text-sm font-medium text-white/90">SettleUp</span>
                    </Link>

                    <span className="text-white/20 select-none">/</span>

                    <div className="flex items-center gap-3">
                        <span className="text-sm text-muted hidden sm:inline-block">Launch</span>
                        <Pill variant="gold">Beta</Pill>
                    </div>
                </div>


            </Container>
        </header>
    );
}
