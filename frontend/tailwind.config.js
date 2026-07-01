/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      colors: {
        background: "#09090B",
        sidebar: "#111827",
        card: "#18181B",
        border: "#27272A",
        primary: {
          DEFAULT: "#3B82F6",
          hover: "#2563EB",
          foreground: "#FAFAFA",
        },
        foreground: "#FAFAFA",
        muted: {
          DEFAULT: "#A1A1AA",
          foreground: "#71717A",
        },
        success: "#22C55E",
        danger: "#EF4444",
        warning: "#F59E0B",
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 4px 24px -8px rgba(0, 0, 0, 0.45)",
        glow: "0 0 0 1px rgba(59, 130, 246, 0.15), 0 8px 24px -8px rgba(59, 130, 246, 0.35)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        "slide-up": {
          from: { opacity: 0, transform: "translateY(8px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        "typing-dot": {
          "0%, 60%, 100%": { transform: "translateY(0)", opacity: 0.4 },
          "30%": { transform: "translateY(-4px)", opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "typing-dot": "typing-dot 1.2s ease-in-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "glow-blue":
          "radial-gradient(60% 60% at 50% 0%, rgba(59,130,246,0.18) 0%, rgba(59,130,246,0) 70%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
