"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import type { StoreSettings } from "@/lib/storeContent";

const links = [
    { href: "/", label: "Shop" },
    { href: "/about", label: "Our Story" },
    { href: "/faq", label: "FAQ" },
    { href: "/track", label: "Track Order" },
    { href: "/contact", label: "Contact" },
];

export default function Header({ settings }: { settings: StoreSettings | null }) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const { cart, openCart, fetchCart } = useCartStore();
    const { isAuthenticated, user, logout } = useAuthStore();

    useEffect(() => { fetchCart(); }, [fetchCart]);
    useEffect(() => { setMenuOpen(false); }, [pathname]);

    const navLink = (href: string, label: string) => (
        <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${pathname === href ? "text-accent-200" : "text-background-cream/80"}`}
        >
            {label}
        </Link>
    );

    return (
        <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-primary/95 text-background-cream shadow-warm backdrop-blur-md">
            <div className="container mx-auto flex h-[72px] items-center justify-between gap-4 px-4">
                <Link href="/" className="flex shrink-0 items-center gap-3 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent" aria-label={`${settings?.store_name || "Wafer King"} home`}>
                    <span className="flex h-10 w-10 items-center justify-center rounded-md border border-accent/50 bg-accent/15">
                        {settings?.store_logo ? <img src={settings.store_logo} alt="" className="h-9 w-9 object-contain" /> : <Crown className="h-6 w-6 text-accent-200" aria-hidden="true" />}
                    </span>
                    <span className="flex flex-col leading-tight">
                        <span className="font-display text-xl font-bold tracking-wide">{settings?.store_name || "Wafer King"}</span>
                        <span className="text-[10px] uppercase tracking-[0.18em] text-background-cream/60">{settings?.store_motto || "Black rice wafers"}</span>
                    </span>
                </Link>

                <nav aria-label="Main navigation" className="hidden items-center gap-1 lg:flex">
                    {links.map(({ href, label }) => navLink(href, label))}
                </nav>

                <div className="flex items-center gap-2">
                    {isAuthenticated ? (
                        <Link href="/profile" className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-background-cream/80 hover:bg-white/10 hover:text-white md:flex">
                            <User className="h-4 w-4" aria-hidden="true" />{user?.name?.split(" ")[0] || "Account"}
                        </Link>
                    ) : (
                        <Link href="/login" className="hidden rounded-md px-3 py-2 text-sm font-medium text-background-cream/80 hover:bg-white/10 hover:text-white md:block">Sign in</Link>
                    )}
                    <button type="button" onClick={openCart} aria-label={`Open cart, ${cart.item_count} items`} className="relative flex h-10 w-10 items-center justify-center rounded-md border border-white/20 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent">
                        <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                        {cart.item_count > 0 && <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1 text-xs font-bold text-primary">{cart.item_count}</span>}
                    </button>
                    <button type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)} className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent lg:hidden">
                        {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>
            </div>
            {menuOpen && (
                <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-white/10 bg-primary px-4 pb-4 pt-2 lg:hidden">
                    <div className="container mx-auto flex flex-col">
                        {links.map(({ href, label }) => navLink(href, label))}
                        <div className="my-2 border-t border-white/10" />
                        {isAuthenticated ? (
                            <>
                                <Link href="/profile" className="rounded-md px-3 py-2 text-sm text-background-cream">My account</Link>
                                <button type="button" onClick={() => { logout(); setMenuOpen(false); }} className="rounded-md px-3 py-2 text-left text-sm text-background-cream">Sign out</button>
                            </>
                        ) : <Link href="/login" className="rounded-md px-3 py-2 text-sm text-background-cream">Sign in</Link>}
                    </div>
                </nav>
            )}
        </header>
    );
}
