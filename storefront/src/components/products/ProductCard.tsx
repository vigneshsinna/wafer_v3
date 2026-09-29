"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatINR } from "@/lib/money";

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addItem } = useCartStore();
    const [error, setError] = useState("");

    const handleAddToCart = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setError("");
        try {
            await addItem(product.id, Math.max(product.min_qty || 1, 1), product);
        } catch (cause) {
            setError(cause instanceof Error ? cause.message : "Could not add product.");
        }
    };

    const discount = product.compare_at_price > product.sale_price
        ? Math.round(((product.compare_at_price - product.sale_price) / product.compare_at_price) * 100)
        : null;

    // Pick badge tag styling dynamically
    const badgeText = product.category?.name || product.brand?.name;

    return (
        <div className="flex flex-col bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow group">
            {/* Product Image Container */}
            <Link href={`/product/${product.slug}`} className="block">
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-background-warm mb-space-md">
                    {product.thumbnail_url ? <Image
                        src={product.thumbnail_url}
                        alt={product.name}
                        fill
                        unoptimized
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    /> : <span className="flex h-full items-center justify-center text-primary-50"><span className="material-symbols-outlined text-[64px]">inventory_2</span></span>}
                    {/* Badge top-left */}
                    {badgeText && <span className="absolute top-space-xs left-space-xs bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm px-2 py-0.5 rounded-full font-semibold shadow-xs">{badgeText}</span>}
                    {/* Weight bottom-right */}
                    <span className="absolute bottom-space-xs right-space-xs bg-surface/90 text-primary font-label-sm text-label-sm px-2 py-0.5 rounded-md font-semibold backdrop-blur-xs">
                        {product.unit || "Pack"}
                    </span>
                </div>
            </Link>

            {/* Rating Stars */}
            {product.rating_count > 0 && <div className="flex items-center gap-1 text-accent-700 mb-1">
                <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    star
                </span>
                <span className="font-label-md text-label-md font-bold">
                    {Number(product.rating).toFixed(1)}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                    ({product.rating_count})
                </span>
            </div>}

            {/* Product Title */}
            <Link href={`/product/${product.slug}`}>
                <h3 className="font-headline-sm text-headline-sm text-primary font-bold leading-snug group-hover:text-accent-700 transition-colors">
                    {product.name}
                </h3>
            </Link>

            {/* Short Description */}
            <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1 mb-space-md">
                {product.description_text}
            </p>
            {error && <p role="alert" className="mb-2 text-xs text-error">{error}</p>}

            {/* Price and Cart Button */}
            <div className="mt-auto pt-space-xs flex items-center justify-between gap-2">
                <div className="flex items-baseline gap-space-xs flex-wrap">
                    <span className="font-headline-sm text-headline-sm text-primary font-bold">
                        {formatINR(product.sale_price)}
                    </span>
                    {product.compare_at_price > product.sale_price && (
                        <span className="font-body-sm text-body-sm text-outline line-through">
                            {formatINR(product.compare_at_price)}
                        </span>
                    )}
                    {discount && (
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                            {discount}% OFF
                        </span>
                    )}
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={product.stock_status !== "in_stock"}
                    className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:bg-primary-700 transition-transform active:scale-95 disabled:opacity-50 shrink-0"
                    title={`Add ${product.name} to Cart`}
                    type="button"
                >
                    <span className="material-symbols-outlined text-[20px]">add_shopping_cart</span>
                </button>
            </div>
        </div>
    );
}
