"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { formatINR } from "@/lib/money";

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const { addItem, openCart } = useCartStore();

    const handleAddToCart = async () => {
        await addItem(product.id, Math.max(product.min_qty, 1), product);
    };

    const imageUrl = product.thumbnail_url || "/images/hibiscus-wafer.png";

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
        >
            <div className="surface-panel overflow-hidden transition-colors duration-200 group-hover:border-accent/60">
                {/* Product Image */}
                <Link href={`/product/${product.slug}`}>
                    <div className="relative aspect-square overflow-hidden bg-background-warm">
                        <Image
                            src={imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        />

                        {/* Weight Badge */}
                        <div className="absolute top-3 right-3 rounded-md bg-primary px-2.5 py-1.5 text-xs font-medium text-white">
                            {product.unit || "Pack"}
                        </div>
                    </div>
                </Link>

                {/* Product Info */}
                <div className="p-5">
                    <Link href={`/product/${product.slug}`}>
                        <h3 className="font-display font-bold text-lg text-primary mb-1.5 group-hover:text-accent-700 transition-colors">
                            {product.name}
                        </h3>
                    </Link>

                    <p className="text-primary/60 text-sm mb-4 line-clamp-2">
                        {product.description}
                    </p>

                    {/* Price - Clean Premium Layout */}
                    <div className="mb-4">
                        <div className="font-display font-bold text-2xl text-primary">
                            {formatINR(product.unit_price)}
                        </div>
                        <div className="text-xs text-primary/50 mt-0.5">
                            GST included; shipping shown at checkout
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                        onClick={handleAddToCart}
                        disabled={product.stock_status !== "in_stock"}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full btn-accent flex items-center justify-center gap-2 py-3"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        {product.stock_status === "in_stock" ? "Add to Cart" : "Out of Stock"}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}
