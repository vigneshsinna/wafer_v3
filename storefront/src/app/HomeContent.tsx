"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product, Review } from "@/types";
import { getProductReviews } from "@/lib/api";
import { formatINR } from "@/lib/money";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/products/ProductGrid";
import { useCartStore } from "@/store/cartStore";

export default function HomeContent({ products, error }: { products: Product[]; error: boolean }) {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [cartError, setCartError] = useState<string | null>(null);
    const { addItem } = useCartStore();

    useEffect(() => {
        let active = true;
        void Promise.all(products.slice(0, 3).map(product => getProductReviews(product.slug).catch(() => [])))
            .then(published => { if (active) setReviews(published.flat().filter(review => review.is_approved).slice(0, 3)); });
        return () => { active = false; };
    }, [products]);

    const sampler = products.find(product => product.tags?.some(tag => tag.trim().toLowerCase() === "sampler"));
    const featuredProducts = products.slice(0, 3);
    const reviewCount = products.reduce((count, product) => count + product.rating_count, 0);
    const averageRating = reviewCount ? products.reduce((sum, product) => sum + product.rating * product.rating_count, 0) / reviewCount : null;

    return (
        <div className="w-full pt-20 bg-background">
            {/* SECTION 1: HERO */}
            <Hero products={products} />

            {/* SECTION 2: VALUE TICKER / TRUST RIBBON */}
            <section className="w-full bg-primary-container text-on-primary py-space-md">
                <div className="max-w-7xl mx-auto px-gutter-sm md:px-gutter">
                    <div data-scroll-stagger className="grid grid-cols-2 md:grid-cols-4 gap-space-md items-center text-center md:text-left">
                        <div className="flex items-center gap-space-sm justify-center md:justify-start">
                            <span className="material-symbols-outlined text-[28px] text-tertiary-fixed-dim">spa</span>
                            <div className="flex flex-col text-left">
                                <span className="font-label-md text-label-md text-surface-container-lowest font-semibold">
                                    Karuppu Kavuni
                                </span>
                                <span className="font-label-sm text-label-sm text-tertiary-fixed opacity-90">
                                    Black Rice Wafers
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-space-sm justify-center md:justify-start">
                            <span className="material-symbols-outlined text-[28px] text-tertiary-fixed-dim">microwave</span>
                            <div className="flex flex-col text-left">
                                <span className="font-label-md text-label-md text-surface-container-lowest font-semibold">
                                    Botanical Flavours
                                </span>
                                <span className="font-label-sm text-label-sm text-tertiary-fixed opacity-90">
                                    {products.length} to Explore
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-space-sm justify-center md:justify-start">
                            <span className="material-symbols-outlined text-[28px] text-tertiary-fixed-dim">inventory_2</span>
                            <div className="flex flex-col text-left">
                                <span className="font-label-md text-label-md text-surface-container-lowest font-semibold">
                                    Freshness Sealed
                                </span>
                                <span className="font-label-sm text-label-sm text-tertiary-fixed opacity-90">
                                    {products[0]?.unit || "See Pack Details"}
                                </span>
                            </div>
                        </div>

                        <div className="flex items-center gap-space-sm justify-center md:justify-start">
                            <span className="material-symbols-outlined text-[28px] text-tertiary-fixed-dim">location_on</span>
                            <div className="flex flex-col text-left">
                                <span className="font-label-md text-label-md text-surface-container-lowest font-semibold">
                                    Erode Heritage
                                </span>
                                <span className="font-label-sm text-label-sm text-tertiary-fixed opacity-90">
                                    Crafted in Tamil Nadu
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: THE FLAVOUR COLLECTION */}
            <section className="w-full bg-background-cream py-space-xl lg:py-24 scroll-mt-24" id="flavours">
                <div className="max-w-7xl mx-auto px-gutter-sm md:px-gutter flex flex-col gap-space-xl">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                        <div className="flex flex-col gap-space-xs max-w-xl">
                            <span className="font-label-md text-label-md text-accent-700 font-semibold uppercase tracking-wider">
                                Small-Batch Harvest Wafers
                            </span>
                            <h2 data-scroll-reveal className="font-headline-lg text-headline-lg text-primary font-bold">
                                The Botanical Crisp Collection
                            </h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Each flavour pairs Karuppu Kavuni black rice with a distinct botanical ingredient. Explore the current collection below.
                            </p>
                        </div>
                        <div className="flex items-center gap-space-xs">
                            <span className="font-label-sm text-label-sm text-secondary bg-secondary-container/40 px-space-sm py-1 rounded-full font-semibold">
                                    {products.length > 0 && products.every(product => product.stock_status === "in_stock") ? "All Flavours In Stock" : `${products.filter(product => product.stock_status === "in_stock").length} In Stock`}
                            </span>
                        </div>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-16 bg-surface-container-low rounded-xl">
                            <p className="text-error font-medium mb-4">Failed to load products</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-2.5 bg-primary-container text-on-primary rounded-lg font-semibold hover:bg-primary-700"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Dynamic Products Grid */}
                    {!error && <ProductGrid products={products} />}
                </div>
            </section>

            {/* SECTION 4: NUTRITIONAL ARCHITECTURE (BLACK RICE VS OTHER RICE) */}
            <section className="w-full bg-surface-container py-space-xl lg:py-24">
                <div className="max-w-7xl mx-auto px-gutter-sm md:px-gutter flex flex-col gap-space-xl">
                    <div className="text-center max-w-2xl mx-auto flex flex-col items-center gap-space-xs">
                        <span className="font-label-md text-label-md text-accent-700 uppercase tracking-widest font-semibold">Nutritional Architecture</span>
                        <h2 data-scroll-reveal className="font-headline-lg text-headline-lg text-primary font-bold">The Supergrain Truth: Black Rice vs. Other Rice</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Direct nutritional comparison per 100g raw edible portion from official Indian nutritional data (ICMR-NIN Indian Food Composition Tables [IFCT] &amp; TNAU bio-analytical studies).
                        </p>
                    </div>
                    <div className="w-full bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden p-space-md lg:p-space-xl">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[760px] text-left">
                                <thead>
                                    <tr className="border-b border-surface-container">
                                        <th className="py-space-md px-space-md font-label-lg text-label-lg text-on-surface-variant font-medium w-1/4">
                                            Nutrient Metric (per 100g)
                                        </th>
                                        <th className="py-space-md px-space-md bg-accent-50 rounded-t-xl text-primary font-bold border-x border-t border-accent-200/60 w-1/4">
                                            <div className="flex flex-col gap-0.5">
                                                <div className="flex items-center gap-space-xs">
                                                    <span className="w-2.5 h-2.5 rounded-full bg-secondary inline-block"></span>
                                                    <span className="font-headline-sm text-headline-sm">Karuppu Kavuni</span>
                                                </div>
                                                <span className="font-label-xs text-[11px] font-semibold text-secondary uppercase tracking-wider">
                                                    Heritage Black Rice
                                                </span>
                                            </div>
                                        </th>
                                        <th className="py-space-md px-space-md font-headline-sm text-headline-sm font-bold text-on-surface-variant w-1/6">
                                            <div className="flex flex-col gap-0.5">
                                                <span>Polished White Rice</span>
                                                <span className="font-label-xs text-[11px] font-normal text-on-surface-variant/70">
                                                    Raw Milled · IFCT A001
                                                </span>
                                            </div>
                                        </th>
                                        <th className="py-space-md px-space-md font-headline-sm text-headline-sm font-bold text-on-surface-variant w-1/6">
                                            <div className="flex flex-col gap-0.5">
                                                <span>Brown Rice</span>
                                                <span className="font-label-xs text-[11px] font-normal text-on-surface-variant/70">
                                                    Whole Grain · IFCT A003
                                                </span>
                                            </div>
                                        </th>
                                        <th className="py-space-md px-space-md font-headline-sm text-headline-sm font-bold text-on-surface-variant w-1/6">
                                            <div className="flex flex-col gap-0.5">
                                                <span>Traditional Red Rice</span>
                                                <span className="font-label-xs text-[11px] font-normal text-on-surface-variant/70">
                                                    Matta / Pigmented Whole
                                                </span>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-container font-body-sm text-body-sm">
                                    {[
                                        {
                                            metric: "Anthocyanin Antioxidants",
                                            sub: "Potent anti-inflammatory phytonutrients",
                                            icon: "shield_with_heart",
                                            blackRice: "327 mg",
                                            blackRiceNote: "Rich Cyanidin-3-Glucoside",
                                            whiteRice: "0 mg (None)",
                                            brownRice: "0 mg (None)",
                                            redRice: "Trace (< 15 mg)",
                                        },
                                        {
                                            metric: "Total Dietary Fibre",
                                            sub: "Sustained satiety & prebiotic gut support",
                                            icon: "grain",
                                            blackRice: "5.2 g",
                                            blackRiceNote: "Whole kernel complex fibre",
                                            whiteRice: "1.3 g",
                                            brownRice: "3.5 g",
                                            redRice: "3.6 g",
                                        },
                                        {
                                            metric: "Plant Protein",
                                            sub: "Essential amino acid & cellular strength",
                                            icon: "fitness_center",
                                            blackRice: "8.5 – 11.3 g",
                                            blackRiceNote: "Highest among native grains",
                                            whiteRice: "6.8 g",
                                            brownRice: "7.6 g",
                                            redRice: "7.2 g",
                                        },
                                        {
                                            metric: "Iron (Fe)",
                                            sub: "Vital for hemoglobin & oxygen transport",
                                            icon: "bloodtype",
                                            blackRice: "3.5 mg",
                                            blackRiceNote: "4.5× higher than white rice",
                                            whiteRice: "0.65 mg",
                                            brownRice: "1.8 mg",
                                            redRice: "2.1 mg",
                                        },
                                        {
                                            metric: "Zinc (Zn)",
                                            sub: "Immune defense & cellular metabolism",
                                            icon: "vital_signs",
                                            blackRice: "2.2 mg",
                                            blackRiceNote: "High bioavailable mineral density",
                                            whiteRice: "0.8 mg",
                                            brownRice: "1.4 mg",
                                            redRice: "1.5 mg",
                                        },
                                        {
                                            metric: "Glycemic Index (GI Spike)",
                                            sub: "Blood sugar response & insulin fatigue",
                                            icon: "trending_down",
                                            blackRice: "Low GI (42–45)",
                                            blackRiceNote: "Slow, sustained energy curve",
                                            whiteRice: "High GI (74–82)",
                                            brownRice: "Moderate GI (55–60)",
                                            redRice: "Moderate GI (55–58)",
                                            whiteRiceAlert: true,
                                        },
                                        {
                                            metric: "Bran & Germ Retention",
                                            sub: "Whole-grain protective layers intact",
                                            icon: "eco",
                                            blackRice: "100% Whole Kernel",
                                            blackRiceNote: "Deep purple aleurone intact",
                                            whiteRice: "0% (Stripped during milling)",
                                            brownRice: "100% (Unpolished)",
                                            redRice: "100% (Pigmented)",
                                            whiteRiceAlert: true,
                                        },
                                    ].map((row) => (
                                        <tr key={row.metric} className="hover:bg-surface-container-low/50 transition-colors">
                                            <th className="py-space-md px-space-md font-medium text-primary align-top">
                                                <div className="flex items-start gap-space-xs">
                                                    <span className="material-symbols-outlined text-[20px] text-accent-700 mt-0.5 shrink-0">
                                                        {row.icon}
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="font-semibold text-primary">{row.metric}</span>
                                                        <span className="font-label-xs text-xs text-on-surface-variant font-normal">
                                                            {row.sub}
                                                        </span>
                                                    </div>
                                                </div>
                                            </th>
                                            <td className="py-space-md px-space-md bg-accent-50/70 border-x border-accent-200/50 align-top">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-secondary text-body-md">
                                                        {row.blackRice}
                                                    </span>
                                                    <span className="font-label-xs text-xs text-secondary/90 font-medium">
                                                        {row.blackRiceNote}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-space-md px-space-md text-on-surface-variant align-top">
                                                <span className={row.whiteRiceAlert ? "font-semibold text-state-error" : "font-medium"}>
                                                    {row.whiteRice}
                                                </span>
                                            </td>
                                            <td className="py-space-md px-space-md text-on-surface-variant align-top">
                                                <span className="font-medium">{row.brownRice}</span>
                                            </td>
                                            <td className="py-space-md px-space-md text-on-surface-variant align-top">
                                                <span className="font-medium">{row.redRice}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-space-lg p-space-md bg-background-warm/60 rounded-xl flex flex-col md:flex-row items-center justify-between gap-space-md">
                            <div className="flex items-center gap-space-sm">
                                <span className="material-symbols-outlined text-[32px] text-accent-700 shrink-0">
                                    verified
                                </span>
                                <div>
                                    <p className="font-label-lg text-label-lg font-semibold text-primary">
                                        Official Indian Nutritional Data Benchmark (ICMR-NIN &amp; TNAU)
                                    </p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        Nutrient metrics per 100g raw edible portion sourced from ICMR - National Institute of Nutrition (Indian Food Composition Tables, IFCT 2017) and Tamil Nadu Agricultural University (TNAU) grain profiling. WaferKing crafts snacks from 100% whole grain Karuppu Kavuni black rice.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/#flavours"
                                className="shrink-0 px-space-md py-space-xs rounded-full bg-accent-700 text-on-primary font-label-md text-label-md hover:bg-primary transition-colors inline-flex items-center gap-1.5"
                            >
                                <span>Explore Black Rice Wafers</span>
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            {/* SECTION 5: HOW WE MAKE IT (3-STEP CRAFT METHOD) */}
            <section className="w-full bg-background py-space-xl lg:py-24" id="craft-process">
                <div className="max-w-7xl mx-auto px-gutter-sm md:px-gutter flex flex-col gap-space-xl">
                    <div className="flex flex-col max-w-xl">
                        <span className="font-label-md text-label-md text-accent-700 uppercase tracking-widest font-semibold">
                            Traceable Farm to Crisp
                        </span>
                        <h2 data-scroll-reveal className="font-headline-lg text-headline-lg text-primary font-bold">
                            The 3-Step Craft Story
                        </h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                            Follow the journey from black rice and botanicals to the wafers you choose for your pantry.
                        </p>
                    </div>

                    <div data-scroll-stagger className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                        {/* Step 1 */}
                        <div className="flex flex-col bg-surface-container-low rounded-2xl p-space-lg relative overflow-hidden">
                            <span className="text-[64px] font-black font-headline-xl text-surface-container-high leading-none -mb-4">01</span>
                            <div className="w-full h-48 rounded-xl overflow-hidden mb-space-md relative bg-surface-container">
                                <Image src="/images/stitch/farm.jpg" alt="Illustration of rice fields in Tamil Nadu" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">The Grain</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                                Karuppu Kavuni black rice is the starting point of every flavour in the collection.
                            </p>
                            <div className="mt-space-md flex items-center gap-space-xs font-label-sm text-label-sm text-secondary">
                                <span className="material-symbols-outlined text-[16px]">eco</span>
                                <span>Karuppu Kavuni Black Rice</span>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex flex-col bg-surface-container-low rounded-2xl p-space-lg relative overflow-hidden">
                            <span className="text-[64px] font-black font-headline-xl text-surface-container-high leading-none -mb-4">02</span>
                            <div className="w-full h-48 rounded-xl overflow-hidden mb-space-md relative bg-surface-container">
                                <Image src="/images/stitch/stone-mill.jpg" alt="Illustration of black rice and botanicals in an artisan kitchen" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">The Botanicals</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                                Explore the distinct botanical ingredients listed for each wafer flavour.
                            </p>
                            <div className="mt-space-md flex items-center gap-space-xs font-label-sm text-label-sm text-secondary">
                                <span className="material-symbols-outlined text-[16px]">local_florist</span>
                                <span>Flavour Details by Product</span>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex flex-col bg-surface-container-low rounded-2xl p-space-lg relative overflow-hidden">
                            <span className="text-[64px] font-black font-headline-xl text-surface-container-high leading-none -mb-4">03</span>
                            <div className="w-full h-48 rounded-xl overflow-hidden mb-space-md relative bg-surface-container">
                                <Image src="/images/stitch/oven.jpg" alt="Illustration of black rice wafers in a bakery kitchen" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-primary font-bold">The Crisp</h3>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                                Choose a pack, then see the current price, availability, and checkout total before ordering.
                            </p>
                            <div className="mt-space-md flex items-center gap-space-xs font-label-sm text-label-sm text-secondary">
                                <span className="material-symbols-outlined text-[16px]">bakery_dining</span>
                                <span>Explore the Collection</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: VERIFIED CUSTOMER REVIEWS */}
            <section className="w-full bg-background-cream py-space-xl lg:py-24">
                <div className="max-w-7xl mx-auto px-gutter-sm md:px-gutter flex flex-col gap-space-xl">
                    <div className="text-center max-w-xl mx-auto flex flex-col items-center gap-space-xs">
                        <span className="font-label-md text-label-md text-accent-700 uppercase tracking-widest font-semibold">Community Verified</span>
                        <h2 data-scroll-reveal className="font-headline-lg text-headline-lg text-primary font-bold">{reviews.length ? "Loved by Our Customers" : "Your Story Starts Here"}</h2>
                        {averageRating !== null ? <div className="flex items-center gap-1 text-accent-700 pt-1"><span className="material-symbols-outlined text-[20px]">star</span><span className="font-label-md text-label-md text-primary font-bold">{averageRating.toFixed(1)} / 5 from {reviewCount} product reviews</span></div> : <p className="font-body-md text-body-md text-on-surface-variant">Explore the collection and be among the first to share a review.</p>}
                    </div>
                    <div data-scroll-stagger className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                        {reviews.length ? reviews.map(review => <article key={review.id} className="flex flex-col bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm justify-between">
                            <div className="flex flex-col gap-space-sm"><div className="flex text-accent-700 gap-0.5" aria-label={`${review.rating} of 5 stars`}>{Array.from({ length: review.rating }, (_, i) => <span key={i} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>)}</div><p className="font-body-md text-body-md text-primary italic leading-relaxed">“{review.comment}”</p></div>
                            <div className="flex items-center gap-space-sm pt-space-lg mt-space-md border-t border-surface-container"><div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center font-bold text-on-tertiary-fixed-variant">{review.user_name.slice(0, 2).toUpperCase()}</div><div className="flex flex-col"><span className="font-label-md text-label-md font-bold text-primary">{review.user_name}</span><span className="font-label-sm text-label-sm text-on-surface-variant">{new Date(review.created_at).toLocaleDateString("en-IN")}</span></div></div>
                        </article>) : featuredProducts.map(product => <article key={product.id} className="flex flex-col bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm justify-between">
                            <div className="flex flex-col gap-space-sm"><span className="material-symbols-outlined text-[28px] text-accent-700">rate_review</span><h3 className="font-headline-sm text-headline-sm text-primary font-bold">{product.name}</h3><p className="font-body-md text-body-md text-on-surface-variant">No customer reviews yet for this flavour.</p></div>
                            <div className="pt-space-lg mt-space-md border-t border-surface-container"><Link href={`/product/${product.slug}`} className="font-label-md text-label-md font-bold text-secondary">Explore this flavour →</Link></div>
                        </article>)}
                    </div>
                </div>
            </section>
            {/* SECTION 7: SAMPLER BOX PROMO BANNER */}
            <section className="w-full bg-background py-space-xl lg:py-24">
                <div className="max-w-7xl mx-auto px-gutter-sm md:px-gutter">
                    <div className="relative w-full rounded-3xl bg-primary-container text-on-primary overflow-hidden p-space-xl lg:p-16 shadow-2xl">
                        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary-container blur-2xl opacity-60 pointer-events-none" />
                        <div data-scroll-stagger className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
                            {/* Banner Copy (7 cols) */}
                            <div className="lg:col-span-7 flex flex-col gap-space-md">
                                <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant self-start font-label-sm text-label-sm font-bold uppercase tracking-wider">
                                    {sampler ? "Limited Edition Heritage Pack" : "The Botanical Collection"}
                                </div>
                                <h2 data-scroll-reveal className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-surface-container-lowest font-extrabold leading-tight">
                                    {sampler ? sampler.name : "Discover Every Botanical Flavour"}
                                </h2>
                                <p className="font-body-lg text-body-lg text-tertiary-fixed opacity-95 max-w-lg leading-relaxed">
                                    {sampler ? sampler.description_text : "Explore the current black rice wafer collection and choose the packs you love."}
                                </p>
                                {sampler && <div className="flex flex-wrap items-baseline gap-space-md pt-space-xs">
                                    <div className="flex items-baseline gap-2">
                                        <span className="font-headline-xl text-headline-xl-mobile md:text-headline-xl text-surface-container-lowest font-black">{formatINR(sampler.sale_price)}</span>
                                        {sampler.compare_at_price > sampler.sale_price && <span className="font-body-lg text-body-lg text-tertiary-fixed-dim line-through opacity-75">{formatINR(sampler.compare_at_price)}</span>}
                                    </div>
                                </div>}
                                <div className="pt-space-md flex flex-col sm:flex-row gap-space-sm">
                                    {sampler ? <button onClick={() => void addItem(sampler.id, Math.max(sampler.min_qty, 1), sampler).catch(error => setCartError(error instanceof Error ? error.message : "Could not add product."))} disabled={sampler.stock_status !== "in_stock"} className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg rounded-full font-bold shadow-lg disabled:opacity-50" type="button"><span className="material-symbols-outlined text-[20px]">shopping_bag</span><span>Add to Cart</span></button> : <Link href="/#flavours" className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-md bg-tertiary-fixed text-on-tertiary-fixed font-label-lg text-label-lg rounded-full font-bold shadow-lg"><span className="material-symbols-outlined text-[20px]">shopping_bag</span><span>Explore Flavours</span></Link>}
                                </div>
                                {cartError && <p role="alert" className="text-tertiary-fixed">{cartError}</p>}
                            </div>

                            {/* Banner Visual (5 cols) */}
                            <div className="lg:col-span-5 relative flex justify-center">
                                <div className="w-full max-w-sm aspect-square rounded-2xl overflow-hidden bg-primary-700/60 p-2 shadow-2xl relative">
                                    <Image
                                        src="/images/stitch/sampler.jpg"
                                        alt="Illustration of the WaferKing botanical wafer collection"
                                        fill
                                        className="object-cover rounded-xl"
                                        sizes="(max-width: 1024px) 100vw, 40vw"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
