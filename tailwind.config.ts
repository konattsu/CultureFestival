import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        electric: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          500: "#0ea5e9",
          600: "#0284c7",
          900: "#0c4a6e",
        },
        neon: {
          pink: "#ff10f0",
          blue: "#10d7ff",
          green: "#39ff14",
          purple: "#bf00ff",
          yellow: "#ffff00",
        },
      },
      animation: {
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 3s ease-in-out infinite",
        "slide-up": "slideUp 0.8s ease-out",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "gradient-y": "gradient-y 15s ease infinite",
        "gradient-xy": "gradient-xy 15s ease infinite",
        sparkle: "sparkle 1.5s ease-in-out infinite",
        "spin-reverse": "spin-reverse 1s linear infinite",
      },
      keyframes: {
        glow: {
          "0%": {
            "box-shadow":
              "0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3), 0 0 60px rgba(59, 130, 246, 0.1)",
            transform: "scale(1)",
          },
          "100%": {
            "box-shadow":
              "0 0 30px rgba(147, 51, 234, 0.6), 0 0 60px rgba(147, 51, 234, 0.4), 0 0 90px rgba(147, 51, 234, 0.2)",
            transform: "scale(1.05)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "gradient-y": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "center bottom",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "25%": {
            "background-size": "400% 400%",
            "background-position": "right center",
          },
          "50%": {
            "background-size": "400% 400%",
            "background-position": "center bottom",
          },
          "75%": {
            "background-size": "400% 400%",
            "background-position": "center top",
          },
        },
        sparkle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.5", transform: "scale(1.2)" },
        },
        "spin-reverse": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        cyber: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        electric: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        matrix: "linear-gradient(0deg, #000 0%, #111 50%, #000 100%)",
      },
      fontFamily: {
        cyber: ["Orbitron", "monospace"],
        electric: ["Exo 2", "sans-serif"],
      },
    },
  },
  plugins: [typography],
};

export default config;
