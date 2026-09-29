"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getMyOrderDetail, getProducts } from "@/lib/api";
import { formatINR } from "@/lib/money";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import type { Order, Product } from "@/types";

function SuccessContent() {
    const code = useSearchParams().get("order_id");
    const user = useAuthStore(state => state.user);
    const addItem = useCartStore(state => state.addItem);
    const [order, setOrder] = useState<Order | null>(null);
    const [suggested, setSuggested] = useState<Product[]>([]);
    const [error, setError] = useState("");
    const [cartError, setCartError] = useState("");

    useEffect(() => {
        if (!code) { setError("No order code was provided."); return; }
        let current = true;
        void getMyOrderDetail(code).then(data => {
            if (!current) return;
            if (data.payment_status !== "paid") { setError("Payment for this order is not confirmed yet."); return; }
            setOrder(data);
            void getProducts().then(products => {
                if (current) setSuggested(products.filter(product => !data.items.some(item => item.product_id === product.id)).slice(0, 3));
            }).catch(() => {});
        }).catch(cause => { if (current) setError(cause instanceof Error ? cause.message : "Could not verify this order."); });
        return () => { current = false; };
    }, [code]);

    if (!order) return <div className="min-h-screen bg-background px-4 pb-20 pt-36 text-center">
        <h1 className="font-headline-lg text-primary">Order status</h1>
        <p role="status" className="mt-3 text-on-surface-variant">{error || "Checking your order…"}</p>
        <Link href="/profile" className="mt-5 inline-block font-semibold text-accent-700 underline">View your orders</Link>
    </div>;

    return <div className="min-h-screen bg-background pt-20">
        <section className="bg-secondary-container/40 px-gutter-sm py-space-xl text-center md:px-gutter lg:py-20">
            <div className="mx-auto max-w-3xl">
                <span className="material-symbols-outlined rounded-full bg-secondary p-5 text-5xl text-on-secondary">check_circle</span>
                <p className="mt-5 font-label-sm uppercase tracking-widest text-secondary">Payment confirmed</p>
                <h1 className="mt-2 font-headline-xl text-primary">Thank You for Your Order{user?.name ? `, ${user.name.split(" ")[0]}` : ""}!</h1>
                <p className="mt-4 text-on-surface-variant">Your order is confirmed. Follow its status from your account.</p>
                <div className="mt-space-lg flex flex-wrap items-center justify-center gap-space-sm">
                    <Link href={`/track/${encodeURIComponent(order.code)}`} className="rounded-full bg-primary-container px-6 py-3 font-semibold text-on-primary">Track Shipment</Link>
                    <Link href="/" className="rounded-full border border-primary-container px-6 py-3 font-semibold text-primary">Continue Shopping</Link>
                </div>
            </div>
        </section>
        <div className="mx-auto grid max-w-7xl gap-space-xl px-gutter-sm py-space-xl md:px-gutter lg:grid-cols-12">
            <section className="space-y-space-lg lg:col-span-8">
                <div className="rounded-xl bg-background-cream p-space-lg shadow-warm">
                    <div className="flex flex-wrap justify-between gap-3 border-b border-surface-container-high pb-space-md">
                        <div><p className="font-label-sm uppercase tracking-widest text-accent-700">Order Reference</p><p className="font-headline-md text-primary">{order.code}</p></div>
                        <div className="text-right"><p className="text-sm text-on-surface-variant">Placed on</p><p className="font-semibold text-primary">{new Date(order.created_at).toLocaleDateString("en-IN")}</p></div>
                    </div>
                    <h2 className="mt-space-lg font-headline-md text-primary">Consignment Contents</h2>
                    <div className="mt-space-md divide-y divide-surface-container-high">
                        {order.items.map(item => <div key={item.id} className="flex items-center gap-space-md py-space-md">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-container">{item.thumbnail_url ? <img src={item.thumbnail_url} alt="" className="h-full w-full object-cover" /> : <span className="material-symbols-outlined text-3xl text-outline">inventory_2</span>}</div>
                            <div className="min-w-0 flex-1"><h3 className="font-semibold text-primary">{item.product_name || "Product"}</h3><p className="text-sm text-on-surface-variant">Quantity {item.quantity}</p></div>
                            <p className="font-semibold text-primary">{formatINR(item.price * item.quantity)}</p>
                        </div>)}
                    </div>
                    <div className="flex justify-between border-t border-surface-container-high pt-space-md font-headline-sm text-primary"><span>Order total</span><strong>{formatINR(order.grand_total)}</strong></div>
                </div>
                <div className="rounded-xl bg-background-cream p-space-lg shadow-sm">
                    <h3 className="font-headline-sm text-primary">Order Information</h3>
                    <p className="mt-2 text-on-surface-variant">Keep your order code when contacting customer support.</p>
                </div>
            </section>
            <aside className="space-y-space-lg lg:col-span-4">
                <div className="rounded-xl bg-background-cream p-space-lg shadow-sm">
                    <h2 className="font-headline-sm text-primary">Delivery Details</h2>
                    {order.shipping_address ? <address className="mt-3 not-italic text-on-surface-variant">{order.shipping_address.name && <strong className="block text-primary">{order.shipping_address.name}</strong>}{order.shipping_address.address}<br />{[order.shipping_address.city, order.shipping_address.state, order.shipping_address.postal_code].filter(Boolean).join(", ")}{order.shipping_address.phone && <span className="block">{order.shipping_address.phone}</span>}</address> : <p className="mt-3 text-on-surface-variant">Address details are available in your account.</p>}
                    <p className="mt-4 text-sm text-on-surface-variant">Status: <span className="font-semibold capitalize text-primary">{order.delivery_status.replaceAll("_", " ")}</span></p>
                </div>
                <div className="rounded-xl bg-background-cream p-space-lg shadow-sm">
                    <h2 className="font-headline-sm text-primary">Payment</h2>
                    <p className="mt-3 text-on-surface-variant">Paid{order.payment_type ? ` · ${order.payment_type}` : ""}</p>
                    <button type="button" disabled title="PDF invoice is not available from the storefront API" className="mt-4 flex items-center gap-2 rounded-lg border border-primary/20 px-4 py-2 font-semibold text-primary opacity-50"><span className="material-symbols-outlined">receipt_long</span>Tax Invoice (PDF)</button>
                </div>
                <Link href="/contact" className="block rounded-xl bg-primary-container p-space-lg font-semibold text-on-primary">Need help with this order? Contact our team.</Link>
            </aside>
        </div>
        {suggested.length > 0 && <section className="bg-surface-container-low py-space-xl">
            <div className="mx-auto max-w-7xl px-gutter-sm md:px-gutter">
                <h2 className="font-headline-lg text-primary">Explore More Products</h2>
                {cartError && <p role="alert" className="mt-3 text-error">{cartError}</p>}
                <div className="mt-space-lg grid gap-space-md sm:grid-cols-2 lg:grid-cols-3">
                    {suggested.map(product => <article key={product.id} className="rounded-xl bg-background-cream p-space-md">
                        <Link href={`/product/${product.slug}`} className="block">{product.thumbnail_url && <img src={product.thumbnail_url} alt="" className="h-48 w-full rounded-lg object-cover" />}<h3 className="mt-3 font-headline-sm text-primary">{product.name}</h3></Link>
                        <p className="mt-1 font-semibold text-primary">{formatINR(product.sale_price)}</p>
                        <button type="button" disabled={product.stock_status !== "in_stock"} onClick={() => void addItem(product.id, Math.max(product.min_qty, 1), product).catch(cause => setCartError(cause instanceof Error ? cause.message : "Could not add product."))} className="mt-3 rounded-full bg-primary-container px-4 py-2 text-sm font-semibold text-on-primary disabled:opacity-50">Add to Next Box</button>
                    </article>)}
                </div>
            </div>
        </section>}
    </div>;
}

export default function SuccessPage() {
    return <Suspense fallback={<div className="min-h-screen bg-background pt-36 text-center">Checking your order…</div>}><SuccessContent /></Suspense>;
}
