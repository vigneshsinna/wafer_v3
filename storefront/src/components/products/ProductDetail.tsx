"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Truck, Heart, Loader2, Package } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatINR } from "@/lib/money";
import { useAuthStore } from "@/store/authStore";
import { addToWishlist, removeFromWishlist, getUserWishlist } from "@/lib/api";
import ProductCard from "./ProductCard";
import ProductReviews from "./ProductReviews";

interface ProductDetailProps {
    product: Product;
    relatedProducts: Product[];
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
    const { addItem, openCart } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const [isInWishlist, setIsInWishlist] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);

    useEffect(() => {
        async function checkWishlist() {
            if (!isAuthenticated) return;
            try {
                const wishlist = await getUserWishlist();
                setIsInWishlist(wishlist.some((item: any) => item.product.id === product.id));
            } catch (error) {
                console.error("Failed to check wishlist:", error);
            }
        }
        checkWishlist();
    }, [isAuthenticated, product.id]);

    const handleAddToCart = async () => {
        await addItem(product.id, Math.max(product.min_qty, 1), product);
    };

    const handleToggleWishlist = async () => {
        if (!isAuthenticated) {
            window.location.href = "/login";
            return;
        }

        setWishlistLoading(true);
        try {
            if (isInWishlist) {
                await removeFromWishlist(product.slug);
                setIsInWishlist(false);
            } else {
                await addToWishlist(product.slug);
                setIsInWishlist(true);
            }
        } catch (error) {
            console.error("Failed to update wishlist:", error);
        } finally {
            setWishlistLoading(false);
        }
    };

    const imageUrl = product.thumbnail_url || "/images/hibiscus-wafer.png";

    return (
        <div className="min-h-screen pt-28 pb-20 bg-background">
            <div className="container mx-auto px-4">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Products
                </Link>

                {/* Product Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    {/* Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="surface-panel sticky top-28 p-4 sm:p-6">
                            <div className="relative aspect-square">
                                <Image
                                    src={imageUrl}
                                    alt={product.name}
                                    fill
                                    className="rounded-md object-cover"
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    priority
                                />
                            </div>

                            {/* Badges */}
                            <div className="flex gap-2 mt-6 justify-center">
                                <span className="rounded-md bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                                    {product.unit || "Pack"}
                                </span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:py-8"
                    >
                        {/* Title */}
                        <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                            {product.name}
                        </h1>

                        {/* Description */}
                        <p className="text-primary/70 text-lg mb-8">
                            {product.description}
                        </p>

                        {/* Price */}
                        <div className="surface-panel mb-8 p-6">
                            <div className="font-display font-bold text-4xl text-primary mb-1">
                                {formatINR(product.unit_price)}
                            </div>
                            <div className="text-sm text-primary/50">
                                GST included; shipping shown at checkout
                            </div>

                            {/* Add to Cart */}
                            <div className="flex gap-3 mt-6">
                                <motion.button
                                    onClick={handleAddToCart}
                                    type="button"
                                    disabled={product.stock_status !== "in_stock"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex-1 btn-accent flex items-center justify-center gap-2 py-4 text-lg"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    {product.stock_status === "in_stock" ? "Add to Cart" : "Out of Stock"}
                                </motion.button>
                                <motion.button
                                    onClick={handleToggleWishlist}
                                    disabled={wishlistLoading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-4 rounded-xl border-2 transition-colors ${isInWishlist
                                        ? "bg-red-50 border-red-200 text-red-500"
                                        : "bg-white border-primary/15 text-primary/50 hover:text-red-500 hover:border-red-200"
                                        }`}
                                >
                                    {wishlistLoading ? (
                                        <Loader2 className="w-6 h-6 animate-spin" />
                                    ) : (
                                        <Heart className={`w-6 h-6 ${isInWishlist ? "fill-current" : ""}`} />
                                    )}
                                </motion.button>
                            </div>
                        </div>

                        <div className="grid gap-3 sm:grid-cols-2">
                            <div className="surface-panel flex items-center gap-3 p-4 text-sm text-primary/75">
                                <Package className="h-5 w-5 text-accent-700" aria-hidden="true" /> Pack details on label
                            </div>
                            <div className="surface-panel flex items-center gap-3 p-4 text-sm text-primary/75">
                                <Truck className="h-5 w-5 text-accent-700" aria-hidden="true" /> Shipping calculated at checkout
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section>
                        <h2 className="font-display text-2xl font-bold text-primary mb-8 text-center">
                            You May Also Like
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedProducts.map((relProduct, index) => (
                                <ProductCard key={relProduct.id} product={relProduct} index={index} />
                            ))}
                        </div>
                    </section>
                )}

                {/* Reviews Section */}
                <ProductReviews slug={product.slug} />
            </div>
        </div>
    );
}
