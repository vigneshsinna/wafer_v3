"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types";
import { getProducts } from "@/lib/api";
import Hero from "@/components/home/Hero";
import ProductGrid from "@/components/products/ProductGrid";
import { Package, MapPin, Loader2, Leaf } from "lucide-react";

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const data = await getProducts();
                setProducts(data);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to load products");
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen">
            <Hero />

            {/* Products Section */}
            <section id="products" className="scroll-mt-20 bg-background py-16 md:py-24">
                <div className="container mx-auto px-4">
                    <div className="mb-8 max-w-2xl">
                        <p className="eyebrow mb-3">The collection</p>
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                            Find your favourite flavour
                        </h2>
                        <p className="text-primary/70">
                            Four black rice wafer varieties, each with its own distinct character.
                        </p>
                    </div>

                    {/* Trust Badges - Above Product Grid */}
                    <div className="mb-10 flex flex-wrap gap-x-8 gap-y-3 border-y border-primary/10 py-4 text-sm">
                        <div className="flex items-center gap-2 text-primary/80">
                            <Leaf className="w-4 h-4 text-accent-700" />
                            <span className="font-medium">Black rice wafers</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary/80">
                            <Package className="w-4 h-4 text-accent-700" />
                            <span className="font-medium">55 g packs</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary/80">
                            <MapPin className="w-4 h-4 text-accent-700" />
                            <span className="font-medium">Made in Erode</span>
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-8 h-8 text-accent animate-spin" />
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-20">
                            <p className="text-red-500 mb-4">{error}</p>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-outline"
                            >
                                Try Again
                            </button>
                        </div>
                    )}

                    {/* Products */}
                    {!loading && !error && <ProductGrid products={products} />}
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-primary py-16 text-background-cream">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-[1fr_1fr] md:gap-16">
                        <div>
                            <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-accent-200">Why Wafer King</p>
                            <h2 className="font-display text-3xl font-bold md:text-4xl">A distinctive bite from Tamil Nadu.</h2>
                        </div>
                        <div className="space-y-4 text-background-cream/75">
                            <p>Made with black rice and a selection of floral, leafy and pantry ingredients.</p>
                            <p>Explore the story behind our flavours and pick a pack that suits your taste.</p>
                            <Link href="/about" className="inline-block font-semibold text-accent-200 underline underline-offset-4 hover:text-white">Learn about us</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
