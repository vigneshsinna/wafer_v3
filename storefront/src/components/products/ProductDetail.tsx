"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { addToWishlist, getProducts } from "@/lib/api";
import { formatINR } from "@/lib/money";
import { isOptimizableImage } from "@/lib/images";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import type { Product } from "@/types";
import ProductCard from "./ProductCard";
import ProductReviews from "./ProductReviews";

export default function ProductDetail({ product }: { product: Product }) {
    const router = useRouter();
    const { addItem, openCart } = useCartStore();
    const authenticated = useAuthStore(state => state.isAuthenticated);
    const images = Array.from(new Set([product.thumbnail_url, ...product.photos].filter((image): image is string => Boolean(image))));
    const [imageIndex, setImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(Math.max(product.min_qty || 1, 1));
    const [tab, setTab] = useState<"ingredients" | "tasting" | "storage">("ingredients");
    const [message, setMessage] = useState("");
    const [busy, setBusy] = useState(false);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    useEffect(() => {
        let active = true;
        void getProducts().then(products => {
            if (active) setRelatedProducts(products.filter(item => item.slug !== product.slug).slice(0, 3));
        }).catch(() => {});
        return () => { active = false; };
    }, [product.slug]);
    const available = product.stock_status === "in_stock";
    const packOptions = [1, 3, 6].map(count => count * Math.max(product.min_qty, 1));
    const savings = product.compare_at_price > product.sale_price
        ? Math.round((1 - product.sale_price / product.compare_at_price) * 100) : 0;

    async function add(buyNow = false) {
        setBusy(true);
        setMessage("");
        try {
            await addItem(product.id, quantity, product);
            if (buyNow) router.push("/checkout");
            else openCart();
        } catch (cause) {
            setMessage(cause instanceof Error ? cause.message : "Could not add this product.");
        } finally {
            setBusy(false);
        }
    }

    async function saveFavourite() {
        setMessage("");
        try {
            await addToWishlist(product.slug);
            setMessage("Added to your wishlist.");
        } catch (cause) {
            setMessage(cause instanceof Error ? cause.message : "Could not save this product.");
        }
    }

    return <div className="bg-background pt-20">
        <div className="border-b border-surface-container-high bg-surface-container-low py-space-sm">
            <nav aria-label="Breadcrumb" className="mx-auto flex max-w-7xl flex-wrap gap-2 px-gutter-sm text-sm text-on-surface-variant md:px-gutter">
                <Link href="/" className="hover:underline">Home</Link><span>/</span><Link href="/#flavours" className="hover:underline">Flavours</Link><span>/</span><span className="text-primary">{product.name}</span>
            </nav>
        </div>
        <section className="mx-auto grid max-w-7xl gap-space-xl px-gutter-sm py-space-xl md:px-gutter lg:grid-cols-12">
            <div className="space-y-space-md lg:col-span-7">
                <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl bg-surface-container shadow-sm">
                    {images.length ? <Image src={images[imageIndex]} alt={product.name} fill priority unoptimized={!isOptimizableImage(images[imageIndex])} sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover" /> : <span className="material-symbols-outlined text-8xl text-outline">inventory_2</span>}
                    <span className="absolute bottom-4 left-4 rounded-full bg-background-cream/95 px-4 py-1 text-sm font-semibold text-primary">{available ? "In Stock" : "Out of Stock"}</span>
                </div>
                {images.length > 1 && <div className="grid grid-cols-4 gap-space-sm">{images.map((image, index) => <button type="button" key={image} aria-label={`Show image ${index + 1}`} aria-pressed={imageIndex === index} onClick={() => setImageIndex(index)} className={`relative aspect-square overflow-hidden rounded-lg bg-surface-container ${index === imageIndex ? "ring-2 ring-accent-700" : ""}`}><Image src={image} alt="" fill unoptimized={!isOptimizableImage(image)} sizes="120px" className="object-cover" /></button>)}</div>}
                <div className="flex items-start gap-space-sm rounded-xl bg-surface-container-low p-space-md text-on-surface-variant"><span className="material-symbols-outlined text-accent-700">agriculture</span><p>Explore the product details and label before adding this item to your box.</p></div>
            </div>
            <div className="space-y-space-md lg:col-span-5">
                <div>
                    {product.category && <p className="font-label-sm uppercase tracking-widest text-accent-700">{product.category.name}</p>}
                    <h1 className="mt-2 font-headline-lg text-primary">{product.name}</h1>
                    {product.rating_count > 0 && <a href="#reviews-breakdown" className="mt-3 inline-flex items-center gap-2 text-sm text-on-surface-variant underline"><span className="material-symbols-outlined text-accent-700">star</span>{product.rating.toFixed(1)} · {product.rating_count} reviews</a>}
                </div>
                <div className="rounded-xl border border-surface-container-high bg-background-cream p-space-md shadow-sm">
                    <div className="flex flex-wrap items-baseline gap-space-sm"><strong className="font-headline-lg text-primary">{formatINR(product.sale_price)}</strong>{savings > 0 && <><span className="text-on-surface-variant line-through">{formatINR(product.compare_at_price)}</span><span className="rounded bg-accent-50 px-2 py-1 text-xs font-bold text-accent-700">Save {savings}%</span></>}</div>
                    <p className="mt-2 text-sm text-on-surface-variant">Per {product.unit || "pack"}. Final tax and shipping are calculated at checkout.</p>
                </div>
                <div>
                    <h2 className="font-semibold text-primary">Quick Quantity</h2>
                    <div className="mt-2 grid grid-cols-3 gap-space-xs">
                        {packOptions.map(count => <button key={count} type="button" aria-pressed={quantity === count} onClick={() => setQuantity(count)} className={`rounded-lg border p-space-sm text-left ${quantity === count ? "border-accent-700 bg-surface-container-high" : "border-surface-container-high bg-surface-container-low"}`}><strong className="block text-sm text-primary">{count} {count === 1 ? "pack" : "packs"}</strong><span className="text-xs text-on-surface-variant">{count} × {product.unit || "pack"}</span><span className="block text-sm font-semibold text-primary">{formatINR(product.sale_price * count)}</span></button>)}
                    </div>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-surface-container-low p-space-md">
                    <div><h2 className="font-semibold text-primary">Quantity</h2><p className="text-xs text-on-surface-variant">Minimum {product.min_qty || 1}</p></div>
                    <div className="flex items-center rounded-full border border-primary/20 bg-background-cream"><button type="button" aria-label="Decrease quantity" disabled={quantity <= Math.max(product.min_qty, 1)} onClick={() => setQuantity(quantity - 1)} className="px-4 py-2 disabled:opacity-40">−</button><output aria-live="polite" className="min-w-8 text-center font-semibold">{quantity}</output><button type="button" aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)} className="px-4 py-2">+</button></div>
                </div>
                <p className="text-sm text-on-surface-variant">Estimated item price: <strong className="text-primary">{formatINR(product.sale_price * quantity)}</strong></p>
                {message && <p role="status" className="rounded-lg bg-surface-container-low p-3 text-sm text-primary">{message}</p>}
                <div className="flex flex-wrap gap-space-sm"><button type="button" disabled={!available || busy} onClick={() => void add()} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary-container px-5 py-3 font-semibold text-on-primary disabled:opacity-50"><span className="material-symbols-outlined">shopping_bag</span>Add to Cart</button><button type="button" disabled={!available || busy} onClick={() => void add(true)} className="flex flex-1 items-center justify-center rounded-full border border-primary-container px-5 py-3 font-semibold text-primary disabled:opacity-50">Buy Now</button>{authenticated ? <button type="button" aria-label="Add to wishlist" onClick={() => void saveFavourite()} className="rounded-full border border-primary-container px-4 text-primary"><span className="material-symbols-outlined">favorite</span></button> : <Link href={`/login?next=${encodeURIComponent(`/product/${product.slug}`)}`} aria-label="Sign in to save to wishlist" className="rounded-full border border-primary-container px-4 py-3 text-primary"><span className="material-symbols-outlined">favorite</span></Link>}</div>
                <div className="rounded-xl bg-surface-container-low p-space-md"><label className="block text-sm font-semibold text-primary">Check Delivery PIN Code<div className="mt-2 flex gap-2"><input type="text" disabled placeholder="Enter PIN Code" className="input-field opacity-60" /><button type="button" disabled className="rounded-lg bg-primary-container px-4 text-on-primary opacity-50">Check</button></div></label><p className="mt-2 text-xs text-on-surface-variant">Delivery availability and rates appear at checkout.</p></div>
            </div>
        </section>
        <section className="bg-surface-container-low py-space-xl"><div className="mx-auto max-w-7xl px-gutter-sm md:px-gutter">
            <div role="tablist" aria-label="Product details" className="flex flex-wrap gap-2">{([
                ["ingredients", "Ingredients & Nutrition"], ["tasting", "Tasting & Flavour Notes"], ["storage", "Storage & Shelf Life"],
            ] as const).map(([key, label]) => <button key={key} role="tab" aria-selected={tab === key} type="button" onClick={() => setTab(key)} className={`rounded-full px-4 py-2 text-sm font-semibold ${tab === key ? "bg-primary-container text-on-primary" : "bg-background-cream text-primary"}`}>{label}</button>)}</div>
            <div role="tabpanel" className="mt-space-md rounded-xl bg-background-cream p-space-lg text-on-surface-variant">
                {tab === "ingredients" && <><h2 className="font-headline-sm text-primary">Product Information</h2><p className="mt-3 whitespace-pre-line">{product.description_text || "See the package label for ingredients, allergens and nutrition values."}</p><p className="mt-4 text-sm">Refer to the pack label for complete nutrition and allergen information.</p></>}
                {tab === "tasting" && <><h2 className="font-headline-sm text-primary">Tasting &amp; Flavour Notes</h2><p className="mt-3">{product.description_text || "Explore this product's flavour in its description and reviews."}</p>{product.tags?.length > 0 && <div className="mt-4 flex flex-wrap gap-2">{product.tags.map(tag => <span key={tag} className="rounded-full bg-accent-50 px-3 py-1 text-sm text-accent-700">{tag}</span>)}</div>}</>}
                {tab === "storage" && <><h2 className="font-headline-sm text-primary">Storage &amp; Shelf Life</h2><p className="mt-3">Follow the storage directions and best-before date printed on your package.</p></>}
            </div>
        </div></section>
        <div id="reviews-breakdown" className="mx-auto max-w-7xl px-gutter-sm py-space-xl md:px-gutter"><ProductReviews slug={product.slug} />
            {relatedProducts.length > 0 && <section className="mt-space-xl"><p className="font-label-sm uppercase tracking-widest text-accent-700">Other Harvest Wafers</p><h2 className="mt-2 font-headline-lg text-primary">Complete Your Tasting Set</h2><div className="mt-space-lg grid gap-space-lg sm:grid-cols-2 lg:grid-cols-3">{relatedProducts.map((related, index) => <ProductCard key={related.id} product={related} index={index} />)}</div></section>}
        </div>
    </div>;
}
