"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import type { StoreSettings } from "@/lib/storeContent";

const navLinks = [
    { href: "/#flavours", label: "Shop", pathKey: "shop" },
    { href: "/about", label: "Our Story", pathKey: "our-story" },
    { href: "/blog", label: "Blog", pathKey: "blog" },
    { href: "/track", label: "Track Order", pathKey: "track" },
    { href: "/faq", label: "FAQ", pathKey: "faq" },
    { href: "/contact", label: "Contact", pathKey: "contact" },
];

function getInitials(name?: string) {
    if (!name) return "WK";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

export default function Header({ settings }: { settings: StoreSettings | null }) {
    const router = useRouter();
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const { cart, openCart, fetchCart } = useCartStore();
    const { isAuthenticated, user, logout } = useAuthStore();
    const announcement = settings?.announcement_text || settings?.store_motto;

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    useEffect(() => {
        setMenuOpen(false);
        setUserDropdownOpen(false);
    }, [pathname]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
                setUserDropdownOpen(false);
            }
        }
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setUserDropdownOpen(false);
            }
        }
        if (userDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleKeyDown);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [userDropdownOpen]);

    const handleLogout = async () => {
        setUserDropdownOpen(false);
        try {
            await logout();
        } catch {}
        window.location.href = "/";
    };

    const isLinkActive = (href: string, pathKey: string) => {
        if (href === "/#flavours") return pathKey === "shop" && pathname === "/" && !menuOpen;
        return pathname === href || (href === "/blog" && pathname.startsWith("/blog/"));
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
            {/* Top Announcement Bar */}
            {announcement && <div className="bg-tertiary-container text-tertiary-fixed-dim text-center py-space-xs px-margin-mobile md:px-margin font-label-sm text-label-sm tracking-wide flex items-center justify-center gap-space-xs">
                <span className="material-symbols-outlined text-[14px] text-tertiary-fixed-dim">{settings?.announcement_text ? "local_shipping" : "spa"}</span>
                <span>{announcement}</span>
            </div>}

            {/* Main Navigation Bar */}
            <div className="h-20 bg-surface/90 backdrop-blur-xl border-b border-surface-container-high/60">
                <div className="max-w-7xl mx-auto h-full px-gutter-sm md:px-gutter flex items-center justify-between gap-space-md">
                    {/* Brand Logo & Wordmark */}
                    <Link href="/" className="flex items-center gap-space-sm group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                        <Image
                            src="/images/logo.svg"
                            alt={settings?.store_name || "WaferKing"}
                            width={240}
                            height={60}
                            unoptimized
                            className="h-12 w-auto max-w-[150px] sm:max-w-[195px] object-contain transition-transform group-hover:scale-105"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-space-xs" aria-label="Main Navigation">
                        {navLinks.map(({ href, label, pathKey }) => {
                            const active = isLinkActive(href, pathKey);
                            return (
                                <Link
                                    key={pathKey}
                                    href={href}
                                    aria-current={active ? "page" : undefined}
                                    className={`px-space-sm py-space-xs font-label-lg text-label-lg transition-colors rounded-lg ${
                                        active
                                            ? "bg-primary-container text-on-primary"
                                            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                                    }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right Action Icons: Search, Cart, Account */}
                    <div className="flex items-center gap-space-sm">
                        <Link
                            href="/#flavours"
                            className="p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
                            aria-label="Browse Flavours"
                        >
                            <span className="material-symbols-outlined text-[22px]">search</span>
                        </Link>

                        {/* Cart CTA Pill */}
                        <button
                            type="button"
                            onClick={openCart}
                            aria-label={`Open cart, ${cart.item_count} items`}
                            className="flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-primary-container text-on-primary hover:bg-primary-700 transition-colors shadow-sm active:scale-95"
                        >
                            <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                            <span className="font-label-lg text-label-lg">Cart ({cart.item_count})</span>
                        </button>

                        {/* User Account / Profile */}
                        {isAuthenticated ? (
                            <div className="relative pl-space-xs" ref={userDropdownRef}>
                                <button
                                    type="button"
                                    onClick={() => setUserDropdownOpen((prev) => !prev)}
                                    aria-expanded={userDropdownOpen}
                                    aria-haspopup="menu"
                                    aria-label={`User menu for ${user?.name || "account"}`}
                                    className="flex items-center gap-1.5 p-1 rounded-full hover:bg-surface-container transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-primary-container text-tertiary-fixed flex items-center justify-center font-bold text-xs uppercase shadow-sm ring-1 ring-tertiary-fixed/30 group-hover:ring-2 group-hover:ring-accent-700 transition-all">
                                        {getInitials(user?.name)}
                                    </div>
                                    <span
                                        className={`material-symbols-outlined text-[18px] text-on-surface-variant transition-transform duration-200 ${
                                            userDropdownOpen ? "rotate-180 text-primary" : "group-hover:text-primary"
                                        }`}
                                    >
                                        expand_more
                                    </span>
                                </button>

                                {userDropdownOpen && (
                                    <div
                                        role="menu"
                                        aria-label="User account menu"
                                        className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-surface border border-surface-container-high shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                                    >
                                        {/* User Identity Header */}
                                        <div className="px-4 py-3 border-b border-surface-container-high/60 bg-surface-container-lowest/60">
                                            <p className="text-[11px] font-semibold text-tertiary-fixed-dim uppercase tracking-wider">
                                                Signed in as
                                            </p>
                                            <p className="font-bold text-sm text-on-surface truncate mt-0.5">
                                                {user?.name || "Artisan Member"}
                                            </p>
                                            {user?.email && (
                                                <p className="text-xs text-on-surface-variant truncate mt-0.5">
                                                    {user.email}
                                                </p>
                                            )}
                                        </div>

                                        {/* Dropdown Options */}
                                        <div className="py-1">
                                            <Link
                                                href="/profile"
                                                onClick={() => setUserDropdownOpen(false)}
                                                role="menuitem"
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px] text-accent-700">
                                                    person
                                                </span>
                                                <div>
                                                    <p className="font-medium leading-none">View Profile</p>
                                                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                                                        Pantry overview & details
                                                    </p>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/profile?tab=orders"
                                                onClick={() => setUserDropdownOpen(false)}
                                                role="menuitem"
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px] text-accent-700">
                                                    receipt_long
                                                </span>
                                                <div>
                                                    <p className="font-medium leading-none">Order History</p>
                                                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                                                        Track parcels & orders
                                                    </p>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/profile?tab=addresses"
                                                onClick={() => setUserDropdownOpen(false)}
                                                role="menuitem"
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px] text-accent-700">
                                                    pin_drop
                                                </span>
                                                <div>
                                                    <p className="font-medium leading-none">Address Book</p>
                                                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                                                        Manage shipping destinations
                                                    </p>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/profile?tab=wishlist"
                                                onClick={() => setUserDropdownOpen(false)}
                                                role="menuitem"
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px] text-accent-700">
                                                    favorite
                                                </span>
                                                <div>
                                                    <p className="font-medium leading-none">Wishlist</p>
                                                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                                                        Saved favorite wafers
                                                    </p>
                                                </div>
                                            </Link>

                                            <Link
                                                href="/profile?tab=settings"
                                                onClick={() => setUserDropdownOpen(false)}
                                                role="menuitem"
                                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface hover:bg-surface-container hover:text-primary transition-colors"
                                            >
                                                <span className="material-symbols-outlined text-[20px] text-accent-700">
                                                    settings
                                                </span>
                                                <div>
                                                    <p className="font-medium leading-none">Account Settings</p>
                                                    <p className="text-[11px] text-on-surface-variant mt-0.5">
                                                        Password & security
                                                    </p>
                                                </div>
                                            </Link>
                                        </div>

                                        {/* Logout CTA */}
                                        <div className="pt-1 mt-1 border-t border-surface-container-high/60 px-2 pb-1">
                                            <button
                                                type="button"
                                                onClick={handleLogout}
                                                role="menuitem"
                                                className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-error hover:bg-error-container/20 transition-colors text-left"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">
                                                    logout
                                                </span>
                                                <span>Sign Out / Log Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="hidden sm:inline-flex px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container text-sm font-semibold transition-colors"
                            >
                                Sign in
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            aria-label={menuOpen ? "Close menu" : "Open menu"}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="lg:hidden p-space-xs rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
                        >
                            <span className="material-symbols-outlined text-[24px]">
                                {menuOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            {menuOpen && (
                <nav
                    id="mobile-navigation"
                    aria-label="Mobile navigation"
                    className="border-t border-surface-container-high bg-surface px-4 pb-6 pt-3 lg:hidden shadow-lg animate-in slide-in-from-top-2 duration-200"
                >
                    <div className="flex flex-col gap-1">
                        {navLinks.map(({ href, label, pathKey }) => {
                            const active = isLinkActive(href, pathKey);
                            return (
                                <Link
                                    key={pathKey}
                                    href={href}
                                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                                        active
                                            ? "bg-primary-container text-on-primary"
                                            : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                                    }`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                        <div className="my-2 border-t border-surface-container" />
                        {isAuthenticated ? (
                            <>
                                <Link
                                    href="/profile"
                                    className="px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-surface-container flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">account_circle</span>
                                    <span>My Account ({user?.name || "User"})</span>
                                </Link>
                                <button
                                    type="button"
                                    onClick={() => {
                                        logout().finally(() => { setMenuOpen(false); window.location.href = "/"; });
                                    }}
                                    className="px-3 py-2 text-left rounded-lg text-sm font-medium text-error hover:bg-error-container/20 flex items-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[18px]">logout</span>
                                    <span>Sign Out</span>
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/login"
                                className="px-3 py-2 rounded-lg text-sm font-medium text-primary hover:bg-surface-container flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">login</span>
                                <span>Sign In / Create Account</span>
                            </Link>
                        )}
                    </div>
                </nav>
            )}
        </header>
    );
}
