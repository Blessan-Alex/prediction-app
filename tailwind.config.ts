import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                surface: {
                    1: "hsl(var(--surface-1))",
                    2: "hsl(var(--surface-2))",
                },
                foreground: "hsl(var(--foreground))", // Text
                muted: "hsl(var(--muted))",
                border: "hsl(var(--border))",
                glow: {
                    cyan: "hsl(var(--glow-cyan))",
                    blue: "hsl(var(--glow-blue))",
                },
            },
            borderRadius: {
                frame: "var(--radius-frame)",
                card: "var(--radius-card)",
            },
            fontFamily: {
                sans: ["var(--font-geist-sans)"],
            },
        },
    },
    plugins: [],
};
export default config;
