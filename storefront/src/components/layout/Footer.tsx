"use client";

import Link from "next/link";
import Image from "next/image";
import type { StoreSettings } from "@/lib/storeContent";

export default function Footer({ settings }: { settings: StoreSettings | null }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-space-xl pb-space-lg text-on-surface border-t border-surface-container-high/60">
            <div data-scroll-stagger className="max-w-7xl mx-auto px-gutter-sm md:px-gutter grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-space-xl">
                {/* Column 1: Brand & Origin */}
                <div className="flex flex-col gap-space-sm">
                    <div className="flex items-center gap-space-xs">
                        <Image
                            src="/images/logo.svg"
                            alt={settings?.store_name || "WaferKing Logo"}
                            width={240}
                            height={60}
                            unoptimized
                            className="h-10 w-auto max-w-[190px] object-contain"
                        />
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Explore WaferKing products, read their details, and find the right pack for your pantry.
                    </p>
                    {settings?.fssai_license && <div className="flex items-center gap-space-xs pt-space-xs">
                        <span className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-accent-50 text-accent-700 font-label-sm text-label-sm font-semibold">
                            <span className="material-symbols-outlined text-[16px]">verified</span>
                            FSSAI Lic. #{settings.fssai_license}
                        </span>
                    </div>}
                    {settings?.contact_phone && (
                        <p className="text-xs text-on-surface-variant">
                            Care: <a href={`tel:${settings.contact_phone}`} className="text-primary font-medium hover:underline">{settings.contact_phone}</a>
                        </p>
                    )}
                </div>

                {/* Column 2: The Collection */}
                <div className="flex flex-col gap-space-sm">
                    <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-semibold">
                        The Collection
                    </h4>
                    <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                        <li><Link href="/#flavours" className="hover:text-on-surface">Browse the collection</Link></li>
                    </ul>
                </div>

                {/* Column 3: Customer Care */}
                <div className="flex flex-col gap-space-sm">
                    <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-semibold">
                        Customer Care
                    </h4>
                    <ul className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
                        <li>
                            <Link className="hover:text-on-surface transition-colors" href="/track">
                                Track Your Consignment
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-on-surface transition-colors" href="/legal/shipping-policy">
                                Shipping Policy
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-on-surface transition-colors" href="/legal/return-policy">
                                Returns Policy
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-on-surface transition-colors" href="/contact">
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link className="hover:text-on-surface transition-colors" href="/faq">
                                Frequently Asked Questions
                            </Link>
                        </li>
                        <li><Link className="hover:text-on-surface transition-colors" href="/blog">Blog</Link></li>
                    </ul>
                </div>

                {/* Column 4: Artisan Pantry Club */}
                <div className="flex flex-col gap-space-sm">
                    <h4 className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-semibold">
                        Artisan Pantry Club
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Newsletter signups are currently unavailable.
                    </p>
                    <form className="flex flex-col sm:flex-row gap-space-xs pt-space-xs" onSubmit={(e) => e.preventDefault()}>
                        <input
                            className="flex-1 bg-background-cream px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary placeholder-primary-50 focus:outline-none focus:ring-2 focus:ring-accent-700/20 border border-surface-container-high"
                            placeholder="Enter your email"
                            type="email"
                            disabled
                        />
                        <button
                            className="px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg opacity-50"
                            type="submit"
                            disabled
                        >
                            Join
                        </button>
                    </form>
                </div>
            </div>

            {/* Bottom Disclaimer & Copyright */}
            <div className="border-t border-surface-container max-w-7xl mx-auto px-gutter-sm md:px-gutter pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
                <p>
                    © {currentYear} {settings?.store_name || "WaferKing"}.
                </p>
                <div className="flex flex-wrap items-center gap-space-sm">
                    <span>Final taxes and shipping are shown at checkout</span>
                    <span>•</span>
                    <Link className="hover:text-on-surface transition-colors" href="/legal/privacy-policy">
                        Privacy Policy
                    </Link>
                    <span>•</span>
                    <Link className="hover:text-on-surface transition-colors" href="/legal/terms-of-service">
                        Terms of Service
                    </Link>
                </div>
            </div>
        </footer>
    );
}
