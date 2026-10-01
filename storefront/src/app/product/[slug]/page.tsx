import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getProduct, getRelatedProducts } from "@/lib/api";
import ProductDetail from "@/components/products/ProductDetail";
import ProductCard from "@/components/products/ProductCard";

async function RelatedProducts({ slug }: { slug: string }) {
    const products = await getRelatedProducts(slug).catch(() => []);
    if (!products.length) return null;
    return <section className="mx-auto max-w-7xl px-gutter-sm pb-space-xl md:px-gutter">
        <p className="font-label-sm uppercase tracking-widest text-accent-700">Other Harvest Wafers</p>
        <h2 className="mt-2 font-headline-lg text-primary">Complete Your Tasting Set</h2>
        <div className="mt-space-lg grid gap-space-lg sm:grid-cols-2 lg:grid-cols-3">
            {products.map((related, index) => <ProductCard key={related.id} product={related} index={index} />)}
        </div>
    </section>;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProduct(slug).catch(() => null);
    if (!product) notFound();
    return <><ProductDetail product={product} /><Suspense fallback={null}><RelatedProducts slug={slug} /></Suspense></>;
}
