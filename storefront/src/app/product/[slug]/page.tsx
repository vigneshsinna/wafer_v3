import { notFound } from "next/navigation";
import { getProduct } from "@/lib/api";
import ProductDetail from "@/components/products/ProductDetail";

export default async function ProductPage({ params }: { params: { slug: string } }) {
    const product = await getProduct(params.slug).catch(() => null);
    if (!product) notFound();
    return <ProductDetail product={product} />;
}
