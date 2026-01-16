"use client";



export function ScrollToCTAButton() {
    return (
        <button
            onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}
            className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-medium backdrop-blur-md transition-all flex items-center gap-2 group"
        >
            Get Early Access
            <span className="group-hover:translate-x-0.5 transition-transform text-cyan-400">→</span>
        </button>
    );
}
