/** @type {import('tailwindcss').Config} */
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        retro: {
          "bg-dark": "#1A1F2C",
          window: "#C8C8C9",
          "window-border": "#9F9EA1",
          text: "#221F26",
          accent: "#646cff",
          taskbar: "#8E9196",
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "cursive"],
        system: ["VT323", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        retro: "2px 2px 0px 0px rgba(0,0,0,0.5)",
        "retro-window": "4px 4px 0px 0px rgba(0,0,0,0.5)",
      },
      keyframes: {
        "crt-on": {
          "0%": { opacity: "0", transform: "scale(0.95) translateY(10px)" },
          "5%": { opacity: "0.5" },
          "10%": { opacity: "0.2" },
          "20%": { opacity: "1" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        scanline: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(100vh)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "crt-on": "crt-on 1s ease-in-out",
        scanline: "scanline 10s linear infinite",
        blink: "blink 1s step-end infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [animate],
};
