import { cn } from "@/lib/cn";
import Image from "next/image";

export function SpaceBackground({ className }: { className?: string }) {
    return (
        <div className={cn("fixed top-0 left-0 w-full h-[100lvh] z-[-1] overflow-hidden bg-background select-none pointer-events-none", className)}>
            {/* 1. Base Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/background.png"
                    alt=""
                    fill
                    priority
                    quality={95}
                    className="object-cover opacity-60 mix-blend-screen"
                    sizes="100vw"
                />
                {/* Fallback gradient at bottom in case image doesn't cover ideally */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            {/* 2. Stars (CSS Pattern) - Subtle Addition */}
            <div className="absolute inset-0 bg-[radial-gradient(#EAF0FF_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03]" />
            <div className="absolute inset-0 bg-[radial-gradient(#EAF0FF_1px,transparent_1px)] [background-size:90px_90px] opacity-[0.04]" />

            {/* 3. Horizon Glow */}
            <div
                className="absolute top-[80%] left-1/2 -translate-x-1/2 w-[80%] h-[400px] bg-glow-blue/10 blur-[120px] rounded-[100%]"
                aria-hidden="true"
            />

            {/* 4. CSS Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.01] pointer-events-none mix-blend-overlay">
                <svg className="w-full h-full">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.80" numOctaves="4" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>
            </div>
        </div>
    );
}
