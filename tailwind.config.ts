import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        terminal: {
          green: "var(--terminal-green)",
          dark: "var(--terminal-dark)",
          light: "var(--terminal-light)",
        },
      },
      animation: {
        "terminal-blink": "blink 1s step-end infinite",
        "terminal-glow": "glow 2s ease-in-out infinite",
        "terminal-scan": "scan 2s ease-in-out infinite",
        "terminal-flicker": "flicker 0.15s ease-in-out infinite",
        "terminal-type":
          "typing 2s steps(40, end), blink-caret .75s step-end infinite",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        glow: {
          "0%, 100%": { textShadow: "0 0 4px var(--terminal-green)" },
          "50%": { textShadow: "0 0 16px var(--terminal-green)" },
        },
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        flicker: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
        typing: {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "blink-caret": {
          "from, to": { borderColor: "transparent" },
          "50%": { borderColor: "var(--terminal-green)" },
        },
      },
      backgroundImage: {
        "terminal-scan":
          "linear-gradient(to bottom, transparent 50%, rgba(74, 246, 38, 0.1) 50%)",
      },
    },
  },
  plugins: [],
} satisfies Config;
