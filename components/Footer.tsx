"use client";

import { Container } from "@/components/layout/Container";


export function Footer() {
    return (
        <footer className="w-full py-12 px-4 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <Container className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Brand Line */}
                <div className="text-sm text-white/50 font-medium">
                    SettleUp — friend challenges with clear rules.
                </div>

                {/* Links & Disclaimer */}
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-[13px] text-white/40 hover:text-white transition-colors">Terms</a>
                        <a href="#" className="text-[13px] text-white/40 hover:text-white transition-colors">Privacy</a>
                    </div>

                    <div className="hidden md:block w-px h-3 bg-white/10" />

                    <p className="text-[11px] text-white/30 uppercase tracking-wide">
                        Play Coins are for gameplay only. Not redeemable.
                    </p>
                </div>

            </Container>
        </footer>
    );
}
