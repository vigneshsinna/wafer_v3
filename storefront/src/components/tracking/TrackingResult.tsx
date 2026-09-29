"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { TrackingResponse } from "@/types";

interface TrackingResultProps {
    order: TrackingResponse | null;
    error: string | null;
    orderId: string;
}

const milestones = [
    { status: "pending", label: "Order received", icon: "receipt_long" },
    { status: "confirmed", label: "Order confirmed", icon: "check_circle" },
    { status: "picked_up", label: "Picked up", icon: "inventory_2" },
    { status: "on_the_way", label: "On the way", icon: "local_shipping" },
    { status: "delivered", label: "Delivered", icon: "home" },
];

export default function TrackingResult({ order, error, orderId }: TrackingResultProps) {
    const router = useRouter();
    const [searchOrderNo, setSearchOrderNo] = useState(orderId);
    const status = order?.delivery_status || "";
    const currentStep = status === "shipped" ? 3 : Math.max(0, milestones.findIndex(step => step.status === status));
    const placedDate = order?.created_at
        ? new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
        : "";

    function handleSearch(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (searchOrderNo.trim()) router.push(`/track/${encodeURIComponent(searchOrderNo.trim().toUpperCase())}`);
    }

    return (
        <div className="min-h-screen bg-background pt-20 text-primary">
            <div className="border-b border-surface-container-high bg-surface-container-low px-gutter-sm py-space-sm md:px-gutter">
                <div className="mx-auto flex max-w-7xl items-center gap-2 text-label-sm text-on-surface-variant">
                    <span className="material-symbols-outlined text-[18px] text-secondary">local_shipping</span>
                    <span>Order reference: <strong className="text-primary">{order?.code || orderId}</strong></span>
                </div>
            </div>
            <div className="mx-auto flex max-w-7xl flex-col gap-space-lg px-gutter-sm py-space-lg md:px-gutter lg:py-space-xl">
                <section className="rounded-xl border border-surface-container-high bg-background-cream p-space-md shadow-sm md:p-space-lg">
                    <div className="flex flex-col justify-between gap-space-md lg:flex-row lg:items-center">
                        <div>
                            <span className="font-label-sm text-label-sm font-semibold uppercase tracking-wider text-accent-700">Order tracking</span>
                            <h1 className="font-headline-md text-headline-md font-bold">Track Consignment</h1>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">Check the latest order status using your reference code.</p>
                        </div>
                        <form onSubmit={handleSearch} className="flex gap-2 rounded-lg border border-surface-container-high bg-surface-container-low p-1.5">
                            <label className="sr-only" htmlFor="track-another">Order reference</label>
                            <input id="track-another" required value={searchOrderNo} onChange={event => setSearchOrderNo(event.target.value)} placeholder="Order reference" className="min-w-0 flex-1 bg-transparent px-3 py-2 text-body-sm uppercase outline-none" />
                            <button type="submit" className="flex items-center gap-1 rounded-md bg-primary-container px-space-md py-2 text-on-primary hover:bg-primary-700"><span className="material-symbols-outlined text-[18px]">search</span>Track</button>
                        </form>
                    </div>
                </section>

                {!order ? (
                    <section className="rounded-xl border border-surface-container-high bg-background-cream p-space-xl text-center shadow-sm">
                        <span className="material-symbols-outlined mb-3 text-[48px] text-accent-700">inventory_2</span>
                        <h2 className="font-headline-sm text-headline-sm font-bold">Consignment Not Found</h2>
                        <p className="mx-auto mb-6 mt-2 max-w-lg text-on-surface-variant">{error || "Check the order reference and try again."}</p>
                        <Link href="/contact" className="inline-flex rounded-full bg-primary-container px-space-lg py-space-sm text-on-primary">Contact support</Link>
                    </section>
                ) : (
                    <div className="grid grid-cols-1 items-start gap-space-lg lg:grid-cols-12">
                        <div className="flex flex-col gap-space-lg lg:col-span-8">
                            <section className="rounded-xl border border-surface-container-high bg-background-cream p-space-lg shadow-sm md:p-space-xl">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <div>
                                        <h2 className="font-headline-sm text-headline-sm font-bold">Consignment #{order.code}</h2>
                                        <p className="mt-1 text-body-sm text-on-surface-variant">Placed {placedDate}</p>
                                    </div>
                                    <span className={`rounded-full px-3 py-1 text-label-sm font-semibold uppercase ${status === "cancelled" ? "bg-error text-on-error" : "bg-secondary text-on-secondary"}`}>{status.replaceAll("_", " ")}</span>
                                </div>
                                <div className="mt-space-md grid gap-space-md rounded-lg bg-surface-container p-space-md sm:grid-cols-2">
                                    <div><p className="text-label-sm uppercase text-primary-50">Order reference</p><p className="font-semibold">{order.code}</p></div>
                                    <div><p className="text-label-sm uppercase text-primary-50">Latest status</p><p className="font-semibold capitalize">{status.replaceAll("_", " ")}</p></div>
                                </div>
                            </section>
                            <section className="rounded-xl border border-surface-container-high bg-background-cream p-space-lg shadow-sm md:p-space-xl">
                                <h2 className="font-headline-sm text-headline-sm font-bold">Tracking Timeline</h2>
                                <p className="mt-1 text-body-sm text-on-surface-variant">Milestones reflect the latest status recorded for your order.</p>
                                {status === "cancelled" ? <p className="mt-space-md rounded-lg bg-error/10 p-space-md text-error">This order was cancelled. Contact support if you need help.</p> : (
                                    <ol className="relative mt-space-lg space-y-space-lg border-l-2 border-surface-container-high pl-space-lg">
                                        {milestones.map((step, index) => {
                                            const reached = currentStep >= index;
                                            return <li key={step.status} className="relative rounded-lg border border-surface-container-high bg-surface-container-low p-space-md">
                                                <span className={`absolute -left-[35px] top-4 flex h-6 w-6 items-center justify-center rounded-full ${reached ? "bg-secondary text-on-secondary" : "bg-surface-container-high text-primary-50"}`}><span className="material-symbols-outlined text-[15px]">{reached ? "check" : step.icon}</span></span>
                                                <div className="flex items-center justify-between gap-3"><h3 className="font-semibold">{step.label}</h3><span className="text-label-sm text-on-surface-variant">{index === 0 ? placedDate : reached ? "Complete" : "Pending"}</span></div>
                                            </li>;
                                        })}
                                    </ol>
                                )}
                            </section>
                        </div>
                        <aside className="flex flex-col gap-space-lg lg:col-span-4">
                            <section className="rounded-xl border border-surface-container-high bg-background-cream p-space-lg shadow-sm">
                                <h2 className="font-headline-sm text-headline-sm font-bold">Consignment Contents</h2>
                                <p className="mt-2 text-body-sm text-on-surface-variant">Sign in to view the items and delivery address for your order.</p>
                                <Link href="/profile?tab=orders" className="mt-space-md inline-flex items-center gap-1 text-label-md font-semibold text-accent-700 underline">View my orders<span className="material-symbols-outlined text-[18px]">arrow_forward</span></Link>
                            </section>
                            <section className="rounded-xl border border-surface-container-high bg-surface-container-low p-space-md">
                                <h2 className="flex items-center gap-2 font-semibold text-secondary"><span className="material-symbols-outlined">verified</span>Order information</h2>
                                <p className="mt-2 text-body-sm text-on-surface-variant">For packing and handling details, refer to the label on your product.</p>
                            </section>
                            <section className="rounded-xl border border-accent-100 bg-accent-50/70 p-space-md">
                                <h2 className="font-semibold uppercase tracking-wider text-accent-700">Need Assistance?</h2>
                                <p className="my-2 text-body-sm text-on-surface-variant">Our team can help with your order.</p>
                                <Link href="/contact" className="font-semibold text-accent-700 underline">Contact us</Link>
                            </section>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}
