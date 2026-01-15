import { cn } from "@/lib/cn";

interface PillProps {
    children: React.ReactNode;
    variant?: "neutral" | "gold";
    className?: string;
}

export function Pill({ children, variant = "neutral", className }: PillProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                {
                    "bg-white/5 text-muted border-white/10": variant === "neutral",
                    "bg-yellow-500/10 text-yellow-500 border-yellow-500/20": variant === "gold",
                },
                className
            )}
        >
            {children}
        </span>
    );
}
