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
                // Primary brand colors
                primary: {
                    DEFAULT: "#3E2723",
                    container: "#3E2723",
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
                "on-primary": "#ffffff",
                "on-primary-container": "#ae8d87",
                "primary-container": "#3e2723",
                "primary-50": "#8B7355",
                "primary-300": "#61492E",
                "primary-700": "#2C1B10",

                // Accent golds
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
                "accent-50": "#FAF1E6",
                "accent-700": "#754A22",

                // Secondary botanical greens
                secondary: {
                    DEFAULT: "#376847",
                    container: "#b6edc2",
                    light: "#6B9B7A",
                    dark: "#2D5438",
                },
                "secondary-container": "#b6edc2",
                "on-secondary": "#ffffff",
                "on-secondary-container": "#3b6d4b",
                "secondary-fixed": "#b9efc5",
                "secondary-fixed-dim": "#9dd3aa",

                // Tertiary warm earth & spice
                tertiary: {
                    DEFAULT: "#251400",
                    container: "#412700",
                },
                "tertiary-container": "#412700",
                "on-tertiary": "#ffffff",
                "on-tertiary-container": "#b68c57",
                "tertiary-fixed": "#ffddb6",
                "tertiary-fixed-dim": "#edbe84",
                "on-tertiary-fixed": "#2a1800",
                "on-tertiary-fixed-variant": "#604011",

                // Surfaces & backgrounds
                background: {
                    DEFAULT: "#FBF7F1",
                    cream: "#FFFDF9",
                    warm: "#F1E7DA",
                },
                "background-cream": "#FFFDF9",
                "background-warm": "#F1E7DA",

                surface: {
                    DEFAULT: "#fdf9f3",
                    dim: "#dddad4",
                    bright: "#fdf9f3",
                },
                "surface-container-lowest": "#ffffff",
                "surface-container-low": "#f7f3ed",
                "surface-container": "#f1ede7",
                "surface-container-high": "#ebe8e2",
                "surface-container-highest": "#e6e2dc",
                "surface-variant": "#e6e2dc",
                "on-surface": "#1c1c18",
                "on-surface-variant": "#504442",
                outline: "#827472",
                "outline-variant": "#d3c3c0",

                // Functional states
                "state-error": "#DC2626",
                "state-success": "#16A34A",
                error: "#ba1a1a",
                "error-container": "#ffdad6",
                "on-error": "#ffffff",
                "on-error-container": "#93000a",
                "on-background": "#1c1c18",
            },
            spacing: {
                "space-xs": "0.25rem",
                "space-sm": "0.5rem",
                "space-md": "1rem",
                "space-lg": "1.5rem",
                "space-xl": "2.5rem",
                "gutter": "1.5rem",
                "gutter-sm": "1rem",
                "margin": "2rem",
                "margin-mobile": "1rem",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Outfit", "Inter", "system-ui", "sans-serif"],
                "headline-xl": ["Outfit", "sans-serif"],
                "headline-xl-mobile": ["Outfit", "sans-serif"],
                "headline-lg": ["Outfit", "sans-serif"],
                "headline-lg-mobile": ["Outfit", "sans-serif"],
                "headline-md": ["Outfit", "sans-serif"],
                "headline-sm": ["Outfit", "sans-serif"],
                "body-lg": ["Inter", "sans-serif"],
                "body-md": ["Inter", "sans-serif"],
                "body-sm": ["Inter", "sans-serif"],
                "label-lg": ["Inter", "sans-serif"],
                "label-md": ["Inter", "sans-serif"],
                "label-sm": ["Inter", "sans-serif"],
            },
            fontSize: {
                "headline-xl": ["48px", { lineHeight: "56px", fontWeight: "700" }],
                "headline-xl-mobile": ["32px", { lineHeight: "40px", fontWeight: "700" }],
                "headline-lg": ["36px", { lineHeight: "44px", fontWeight: "600" }],
                "headline-lg-mobile": ["26px", { lineHeight: "34px", fontWeight: "600" }],
                "headline-md": ["24px", { lineHeight: "32px", fontWeight: "600" }],
                "headline-sm": ["20px", { lineHeight: "28px", fontWeight: "600" }],
                "body-lg": ["18px", { lineHeight: "28px", fontWeight: "400" }],
                "body-md": ["16px", { lineHeight: "24px", fontWeight: "400" }],
                "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
                "label-lg": ["14px", { lineHeight: "20px", fontWeight: "600" }],
                "label-md": ["12px", { lineHeight: "16px", fontWeight: "600" }],
                "label-sm": ["11px", { lineHeight: "14px", fontWeight: "500" }],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gold-shimmer": "linear-gradient(135deg, #D4AF37 0%, #F5E9C4 50%, #D4AF37 100%)",
            },
            boxShadow: {
                "warm": "0 4px 14px 0 rgba(62, 39, 35, 0.08)",
                "warm-lg": "0 10px 40px 0 rgba(62, 39, 35, 0.14)",
                "gold": "0 4px 14px 0 rgba(212, 175, 55, 0.25)",
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
