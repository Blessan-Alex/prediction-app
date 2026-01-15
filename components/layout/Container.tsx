import { cn } from "@/lib/cn";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function Container({ className, children, ...props }: ContainerProps) {
    return (
        <div
            className={cn("w-full max-w-[1200px] mx-auto px-5 md:px-8", className)}
            {...props}
        >
            {children}
        </div>
    );
}
