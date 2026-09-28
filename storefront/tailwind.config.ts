import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Brand Colors
                primary: {
                    DEFAULT: "#3E2723",
                    50: "#8B7355",
                    100: "#7D6548",
                    200: "#6F573B",
                    300: "#61492E",
                    400: "#533B21",
                    500: "#3E2723",
                    600: "#352119",
                    700: "#2C1B10",
                    800: "#231506",
                    900: "#1A0F00",
                },
                accent: {
                    DEFAULT: "#C39861",
                    50: "#FAF1E6",
                    100: "#F3DFC3",
                    200: "#E9C99E",
                    300: "#DCB47D",
                    400: "#CFA268",
                    500: "#C39861",
                    600: "#9A6838",
                    700: "#754A22",
                    800: "#543316",
                    900: "#38210F",
                },
                secondary: {
                    // Organic greens
                    DEFAULT: "#4A7C59",
                    light: "#6B9B7A",
                    dark: "#2D5438",
                },
                background: {
                    DEFAULT: "#FBF7F1",
                    cream: "#FFFDF9",
                    warm: "#F1E7DA",
                },
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Outfit", "Inter", "system-ui", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gold-shimmer": "linear-gradient(135deg, #D4AF37 0%, #F5E9C4 50%, #D4AF37 100%)",
            },
            boxShadow: {
                "warm": "0 4px 14px 0 rgba(62, 39, 35, 0.1)",
                "warm-lg": "0 10px 40px 0 rgba(62, 39, 35, 0.15)",
                "gold": "0 4px 14px 0 rgba(212, 175, 55, 0.3)",
            },
            animation: {
                "shimmer": "shimmer 2s linear infinite",
                "float": "float 3s ease-in-out infinite",
            },
            keyframes: {
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
