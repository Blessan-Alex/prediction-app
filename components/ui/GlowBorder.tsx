import { cn } from "@/lib/cn";

interface GlowBorderProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function GlowBorder({ className, children, ...props }: GlowBorderProps) {
    return (
        <div className={cn("relative group p-[1px] rounded-card overflow-hidden", className)} {...props}>
            {/* Glow Gradient Layer */}
            <div
                className="absolute inset-0 bg-gradient-to-r from-glow-cyan via-glow-blue to-glow-cyan opacity-50 blur-md group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
            />

            {/* Content Wrapper (masks the inner part to show only border) */}
            <div className="relative h-full w-full bg-surface-1 rounded-[calc(var(--radius-card)-1px)] overflow-hidden">
                {children}
            </div>
        </div>
    );
}
