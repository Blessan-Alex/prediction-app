"use client";

import { CheckCircle2, Sparkles } from "lucide-react";

export function RegistrationToast() {
    return (
        <div className="flex items-start gap-4">
            {/* Icon */}
            <div className="relative flex-shrink-0 w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <div className="absolute inset-0 bg-cyan-400/20 blur-lg rounded-full animate-pulse" />
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5 pt-0.5">
                <h4 className="text-sm font-semibold text-white leading-none mb-1">
                    You&apos;re in!
                </h4>
                <p className="text-xs text-blue-200/70 font-medium leading-relaxed">
                    Thanks for joining. We&apos;ll notify you when we go live.
                </p>
            </div>
        </div>
    );
}
