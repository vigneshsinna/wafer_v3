"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProducts, getProduct } from "@/lib/api";
import ProductDetail from "@/components/products/ProductDetail";
import { Product } from "@/types";
import { Loader2 } from "lucide-react";

export default function ProductPage() {
    const { slug } = useParams<{ slug: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([getProduct(slug), getProducts()])
            .then(([item, products]) => {
                setProduct(item);
                setRelatedProducts(products.filter(p => p.slug !== slug).slice(0, 3));
            })
            .catch(() => setProduct(null))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return <div className="min-h-screen pt-32 flex justify-center"><Loader2 className="w-8 h-8 text-accent animate-spin" /></div>;
    }
    if (!product) {
        return <div className="min-h-screen pt-32 text-center"><h1 className="font-display text-2xl font-bold text-primary">Product Not Found</h1></div>;
    }
    return <ProductDetail product={product} relatedProducts={relatedProducts} />;
}
