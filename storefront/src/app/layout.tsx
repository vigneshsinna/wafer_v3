import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
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
            <body className="min-h-screen flex flex-col">
                <Header settings={settings} />
                <main className="flex-1">{children}</main>
                <Footer settings={settings} />
                <CartDrawer />
            </body>
        </html>
    );
}
