import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/cn";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost";
    size?: "sm" | "md";
    isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow-blue disabled:pointer-events-none disabled:opacity-50",
                    {
                        // Variants
                        "bg-foreground text-background hover:bg-foreground/90": variant === "primary",
                        "bg-surface-2 text-foreground border border-white/10 hover:bg-surface-2/80 hover:border-white/20": variant === "secondary",
                        "hover:bg-white/5 text-foreground": variant === "ghost",
                        // Sizes
                        "h-9 px-4 text-sm": size === "sm",
                        "h-11 px-8 text-base": size === "md",
                    },
                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
