"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function TrackPage() {
    const router = useRouter();
    const [orderId, setOrderId] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!orderId.trim()) {
            setError("Please enter your consignment or order reference number.");
            return;
        }

        router.push(`/track/${encodeURIComponent(orderId.trim().toUpperCase())}`);
    };

    return (
        <div className="w-full pt-20 bg-background min-h-screen">
            {/* Top Bar Notification */}
            <div className="w-full bg-surface-container-low py-space-sm px-gutter-sm md:px-gutter border-b border-surface-container-high/40">
                <div className="max-w-7xl mx-auto flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                    <div className="flex items-center gap-space-xs">
                        <span className="material-symbols-outlined text-[16px] text-secondary">local_shipping</span>
                        <span>Order status lookup</span>
                    </div>
                    <div className="flex items-center gap-1 text-secondary">
                        <span>Use your order reference</span>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">
                <div className="bg-background-cream p-space-lg md:p-space-xl rounded-2xl shadow-sm border border-surface-container-high/40 flex flex-col gap-space-lg">
                    <div className="text-center max-w-xl mx-auto">
                        <div className="w-14 h-14 rounded-full bg-accent-50 text-accent-700 flex items-center justify-center mx-auto mb-3">
                            <span className="material-symbols-outlined text-[28px]">local_shipping</span>
                        </div>
                        <span className="font-label-sm text-label-sm uppercase tracking-wider text-accent-700 font-semibold">
                            Artisan Consignment Dispatch
                        </span>
                        <h1 className="font-headline-lg text-headline-lg text-primary font-bold mt-1">
                            Track Your Consignment
                        </h1>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                            Enter the reference code from your order confirmation to see its latest recorded status.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-space-md max-w-xl mx-auto w-full">
                        <div className="flex flex-col gap-1">
                            <label className="font-label-md text-label-md text-primary font-semibold">
                                Order / Consignment ID *
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary-50">
                                    tag
                                </span>
                                <input
                                    type="text"
                                    placeholder="e.g. WK-2026-9821"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    className="w-full bg-surface-container-low pl-10 pr-4 py-3 rounded-lg font-body-sm text-body-sm text-primary uppercase focus:bg-background-cream focus:outline-none focus:ring-2 focus:ring-accent-700/20 border border-surface-container-high/40"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <label className="font-label-md text-label-md text-primary font-semibold">
                                Mobile Number (Unavailable)
                            </label>
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-primary-50">
                                    phone_iphone
                                </span>
                                <input
                                    type="tel"
                                    placeholder="Phone verification is not available"
                                    disabled
                                    className="w-full bg-surface-container-low pl-10 pr-4 py-3 rounded-lg font-body-sm text-body-sm text-primary focus:bg-background-cream focus:outline-none focus:ring-2 focus:ring-accent-700/20 border border-surface-container-high/40"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="text-error text-sm font-medium">{error}</p>
                        )}

                        <button
                            type="submit"
                            className="w-full py-3.5 px-6 rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg hover:bg-primary-700 transition-colors shadow-md flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined text-[20px]">search</span>
                            <span>Track Consignment</span>
                        </button>
                    </form>

                    <div className="border-t border-surface-container pt-space-md grid grid-cols-1 sm:grid-cols-3 gap-space-sm text-center text-on-surface-variant font-label-sm text-label-sm">
                        <div className="flex flex-col items-center gap-1">
                            <span className="material-symbols-outlined text-[20px] text-primary">verified</span>
                            <span>Order milestones</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="material-symbols-outlined text-[20px] text-primary">local_shipping</span>
                            <span>Latest delivery status</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="material-symbols-outlined text-[20px] text-primary">support_agent</span>
                            <Link href="/contact" className="underline">Contact support</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
