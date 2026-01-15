import { cn } from "@/lib/cn";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Card({ className, children, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "relative rounded-card border border-white/10 bg-surface-1/50 backdrop-blur-md overflow-hidden",
                className
            )}
            {...props}
        >
            {children}
        </div>
    );
}
