import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import StorefrontMotion from "@/components/layout/StorefrontMotion";
import { getStoreSettings } from "@/lib/storeContent";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
});

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getStoreSettings();
    return {
        title: `${settings?.store_name || "Wafer King"} | ${settings?.store_motto || "Black rice wafers"}`,
        description: "Explore Wafer King's black rice wafers with Hibiscus, Avarampoo, Vallarai and Makhana, made in Erode, Tamil Nadu.",
        icons: settings?.store_favicon ? { icon: settings.store_favicon } : undefined,
        keywords: ["wafer", "black rice", "premium biscuits", "Indian snacks"],
    };
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const settings = await getStoreSettings();
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
            </head>
            <body className="min-h-screen flex flex-col">
                <StorefrontMotion>
                    <Header settings={settings} />
                    <main className="flex-1">{children}</main>
                    <Footer settings={settings} />
                    <CartDrawer />
                </StorefrontMotion>
            </body>
        </html>
    );
}
