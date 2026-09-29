"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types";

export default function Hero({ products }: { products: Product[] }) {
    const available = products.filter(product => product.stock_status === "in_stock").length;
    return (
        <section className="relative w-full overflow-hidden bg-background py-space-xl lg:py-24">
            {/* Ambient organic gradient background */}
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-tertiary-fixed/30 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 right-0 w-[30rem] h-[30rem] rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-gutter-sm md:px-gutter relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl lg:gap-8 items-center">
                    {/* Left Editorial Column (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
                        {/* Eyebrow Pill */}
                        <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-accent-50 text-accent-700">
                            <span className="w-2 h-2 rounded-full bg-on-tertiary-container animate-pulse" />
                            <span className="font-label-sm text-label-sm tracking-widest uppercase font-semibold">
                                Traditional Grains, Modern Crunch
                            </span>
                        </div>

                        {/* Main Headline */}
                        <h1 className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-primary tracking-tight font-extrabold max-w-2xl">
                            Artisan Black Rice Wafers from the Soil of Erode
                        </h1>

                        {/* Subtitle */}
                        <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl leading-relaxed">
                            Crafted with Karuppu Kavuni black rice and botanical flavours in Erode. Discover the collection and find the right crunch for your pantry.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap items-center gap-space-md pt-space-xs w-full sm:w-auto">
                            <a
                                href="#flavours"
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-space-xs px-space-xl py-space-sm bg-primary-container text-on-primary font-label-lg text-label-lg rounded-full shadow-lg hover:bg-primary-700 transition-all transform active:scale-95 group"
                            >
                                <span>Explore Flavours</span>
                                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                                    arrow_forward
                                </span>
                            </a>
                            <Link
                                href="/#craft-process"
                                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-space-xs px-space-lg py-space-sm bg-surface-container text-primary font-label-lg text-label-lg rounded-full hover:bg-surface-container-high transition-colors"
                            >
                                <span className="material-symbols-outlined text-[20px] text-accent-700">play_circle</span>
                                <span>Watch Our Story</span>
                            </Link>
                        </div>

                        {/* Key Stats Ribbon */}
                        <div className="grid grid-cols-3 gap-space-md pt-space-lg mt-space-md w-full bg-surface-container-low p-space-md rounded-xl">
                            <div className="flex flex-col">
                                <span className="font-headline-sm text-headline-sm text-primary font-bold">{products.length}</span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">Botanical Flavours</span>
                            </div>
                            <div className="flex flex-col border-l border-surface-container-high pl-space-md">
                                <span className="font-headline-sm text-headline-sm text-primary font-bold">{available}</span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">Available Now</span>
                            </div>
                            <div className="flex flex-col border-l border-surface-container-high pl-space-md">
                                <span className="font-headline-sm text-headline-sm text-secondary font-bold">Erode</span>
                                <span className="font-label-sm text-label-sm text-on-surface-variant">Our Home</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Visual Showcase Column (5 cols) */}
                    <div className="lg:col-span-5 relative flex justify-center items-center">
                        {/* Background tactile circle */}
                        <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-background-warm/60 absolute -z-0" />

                        {/* Main Product Container */}
                        <div className="relative z-10 w-full max-w-md p-space-sm">
                            <div className="relative w-full h-[430px] rounded-2xl overflow-hidden shadow-xl bg-surface-container">
                                <Image src="/images/stitch/hero-flatlay.jpg" alt="WaferKing black rice wafer pouches with botanicals and black rice" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 40vw" />
                            </div>

                            {/* Floating Guarantee Badges */}
                            <div
                                className="absolute -top-3 -right-3 sm:-right-4 bg-background-cream text-accent-700 px-space-md py-space-xs rounded-full shadow-md flex items-center gap-space-xs font-label-md text-label-md animate-bounce"
                                style={{ animationDuration: "4s" }}
                            >
                                <span className="material-symbols-outlined text-[16px] text-accent-700">bolt</span>
                                <span>{products.length} Flavours</span>
                            </div>

                            <div className="absolute bottom-6 -left-3 sm:-left-6 bg-surface-container-lowest text-primary px-space-md py-space-xs rounded-xl shadow-lg flex items-center gap-space-xs font-label-md text-label-md border border-surface-container-high/60">
                                <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0" />
                                <div>
                                    <p className="font-label-sm text-label-sm text-on-surface-variant">Shop the collection</p>
                                    <p className="font-semibold text-primary">{available} products available</p>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 right-8 bg-primary-container text-on-primary px-space-md py-space-xs rounded-full shadow-md font-label-sm text-label-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">check_circle</span>
                                <span>Made in Erode</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
