"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatINR } from "@/lib/money";
import { isOptimizableImage } from "@/lib/images";
import AddressManager from "@/components/profile/AddressManager";
import {
    confirmRazorpayPayment,
    getCheckoutSummary,
    getPaymentConfig,
    startRazorpayPayment,
} from "@/lib/api";
import type { Address, CheckoutSummary } from "@/types";

declare global {
    interface Window {
        Razorpay: new (options: Record<string, unknown>) => {
            open: () => void;
            on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
        };
    }
}

let razorpayScript: Promise<void> | null = null;

function ensureRazorpayScript(): Promise<void> {
    if (window.Razorpay) return Promise.resolve();
    if (razorpayScript) return razorpayScript;
    razorpayScript = new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve();
        script.onerror = () => {
            script.remove();
            razorpayScript = null;
            reject(new Error("Could not load Razorpay checkout SDK."));
        };
        document.body.appendChild(script);
    });
    return razorpayScript;
}

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, fetchCart, ensureCartLoaded } = useCartStore();
    const { isAuthenticated, user } = useAuthStore();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [addressId, setAddressId] = useState<number>(0);
    const [addressRevision, setAddressRevision] = useState(0);
    const [addressDirty, setAddressDirty] = useState(false);
    const [carrierId, setCarrierId] = useState<number>();
    const [summary, setSummary] = useState<CheckoutSummary | null>(null);
    const [error, setError] = useState<string>("");
    const [paymentAvailable, setPaymentAvailable] = useState<boolean>(false);
    const [paying, setPaying] = useState<boolean>(false);
    const [cartReady, setCartReady] = useState(false);

    useEffect(() => {
        void getPaymentConfig()
            .then((data) => setPaymentAvailable(data.available))
            .catch(() => setPaymentAvailable(false));
    }, []);

    useEffect(() => {
        let active = true;
        const loadCart = () => void ensureCartLoaded().finally(() => {
            if (active) setCartReady(true);
        });
        if (useCartStore.persist.hasHydrated()) loadCart();
        else {
            const unsubscribe = useCartStore.persist.onFinishHydration(loadCart);
            return () => { active = false; unsubscribe(); };
        }
        return () => { active = false; };
    }, [ensureCartLoaded]);

    useEffect(() => {
        if (cartReady && paymentAvailable && cart.items.length > 0) void ensureRazorpayScript().catch(() => {});
    }, [cartReady, paymentAvailable, cart.items.length]);

    useEffect(() => {
        if (!isAuthenticated || !addressId || !cart.items.length || addressDirty) {
            setSummary(null);
            return;
        }
        let current = true;
        setSummary(null);
        void getCheckoutSummary(addressId, carrierId)
            .then((data) => {
                if (current) {
                    setSummary(data);
                    setError("");
                }
            })
            .catch((e) => {
                if (current) setError(e instanceof Error ? e.message : "Could not load checkout summary.");
            });
        return () => {
            current = false;
        };
    }, [addressId, addressRevision, addressDirty, carrierId, isAuthenticated, cart.items]);

    async function handlePay() {
        if (!isAuthenticated || !addressId || !summary || !paymentAvailable || addressDirty) {
            setError("Sign in, save and select a shipping address, and wait for the server total before paying.");
            return;
        }
        if (paying) return;

        setPaying(true);
        setError("");

        try {
            const order = await startRazorpayPayment(addressId, carrierId ?? summary.carrier_id ?? undefined);
            await ensureRazorpayScript();

            const razorpay = new window.Razorpay({
                key: order.key,
                order_id: order.razorpay_order_id,
                amount: order.amount,
                currency: order.currency,
                name: "WaferKing",
                prefill: {
                    name: addresses.find((address) => address.id === addressId)?.recipient_name || order.name,
                    email: order.email,
                    contact: addresses.find((address) => address.id === addressId)?.phone || order.phone,
                },
                theme: { color: "#271310" },
                handler: async (payment: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
                    try {
                        const result = await confirmRazorpayPayment(payment);
                        await fetchCart();
                        router.push(`/success?order_id=${encodeURIComponent(result.order_code)}`);
                    } catch (e) {
                        setError(e instanceof Error ? e.message : "Payment confirmation failed. Please check orders or contact support.");
                    } finally {
                        setPaying(false);
                    }
                },
                modal: {
                    ondismiss: () => setPaying(false),
                },
            });

            razorpay.on("payment.failed", (response: { error?: { description?: string } }) => {
                setError(response.error?.description || "Payment was not successful. Please try again.");
                setPaying(false);
            });

            razorpay.open();
        } catch (e) {
            setError(e instanceof Error ? e.message : "Could not initiate payment.");
            setPaying(false);
        }
    }

    const subtotal = summary?.sub_total;
    const discount = summary?.discount;
    const shippingCost = summary?.shipping_cost;
    const tax = summary?.tax;
    const grandTotal = summary?.grand_total;

    return (
        <div className="w-full pt-[104px] bg-background min-h-screen">
            {/* Minimalist Checkout Breadcrumb Bar */}
            <div className="w-full bg-surface-container-low py-space-sm px-gutter-sm md:px-gutter border-b border-surface-container-high/40">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-space-xs font-label-md text-label-md text-on-surface-variant">
                        <Link className="hover:text-primary transition-colors flex items-center gap-1" href="/">
                            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                            <span>Return to Pantry</span>
                        </Link>
                        <span>/</span>
                        <span className="text-primary font-semibold">One-Page Express Checkout</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-space-sm">
                        <span className="inline-flex items-center gap-1 px-space-sm py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold">
                            <span className="material-symbols-outlined text-[15px]">verified_user</span>
                            Secure Payment
                        </span>
                        <span className="text-outline-variant">•</span>
                        <span className="font-label-sm text-label-sm text-primary-50">Erode Heritage Kitchens</span>
                    </div>
                </div>
            </div>

            {/* Empty Cart State */}
            {!cartReady ? (
                <div className="flex justify-center py-24" role="status" aria-label="Loading cart">
                    <span className="material-symbols-outlined animate-spin text-[36px] text-accent-700">progress_activity</span>
                </div>
            ) : cart.items.length === 0 ? (
                <div className="max-w-2xl mx-auto px-4 py-24 text-center">
                    <div className="w-16 h-16 rounded-full bg-surface-container mx-auto flex items-center justify-center text-primary mb-4">
                        <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
                    </div>
                    <h1 className="font-headline-md text-headline-md text-primary font-bold mb-2">
                        Your Harvest Box is Empty
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                        Explore our botanical crisp collection crafted with whole grain Karuppu Kavuni.
                    </p>
                    <Link
                        href="/#flavours"
                        className="inline-flex items-center justify-center gap-space-xs px-space-xl py-space-sm bg-primary-container text-on-primary font-label-lg text-label-lg rounded-full shadow-md hover:bg-primary-700 transition-colors"
                    >
                        Explore Flavours
                    </Link>
                </div>
            ) : (
                /* Main Checkout Container */
                <div className="max-w-7xl mx-auto w-full px-gutter-sm md:px-gutter py-space-xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
                        {/* LEFT COLUMN: Multi-Step Interactive Form (7 of 12 cols) */}
                        <div className="lg:col-span-7 flex flex-col gap-space-lg">
                            {/* Banner Alert: Freshness */}
                            <div className="bg-accent-50 rounded-lg p-space-md flex items-start gap-space-sm border border-accent-100">
                                <div className="w-9 h-9 rounded-full bg-accent-700/10 flex items-center justify-center shrink-0 text-accent-700">
                                    <span className="material-symbols-outlined text-[20px]">spa</span>
                                </div>
                                <div className="flex-1">
                                    <p className="font-label-lg text-label-lg text-accent-700 font-semibold">
                                        Review Your Order Details
                                    </p>
                                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                                        Confirm your saved address and the server-calculated total before payment.
                                    </p>
                                </div>
                            </div>

                            {/* STEP 1: CONTACT INFORMATION */}
                            <section className="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high/40">
                                <div className="flex items-center justify-between pb-space-xs">
                                    <div className="flex items-center gap-space-sm">
                                        <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">
                                            1
                                        </span>
                                        <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                                            Contact Information
                                        </h2>
                                    </div>
                                    {isAuthenticated && (
                                        <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1 font-semibold">
                                            <span className="material-symbols-outlined text-[16px]">check_circle</span> Signed In
                                        </span>
                                    )}
                                </div>

                                {isAuthenticated ? (
                                    <div className="flex items-center justify-between p-space-sm rounded-lg bg-surface-container-low border border-surface-container-high/40">
                                        <div className="flex items-center gap-space-sm min-w-0">
                                            <div className="w-10 h-10 rounded-full bg-primary-container text-tertiary-fixed flex items-center justify-center font-headline-sm text-[16px] font-bold shrink-0">
                                                {user?.name?.slice(0, 2).toUpperCase() || "WK"}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-label-lg text-label-lg text-primary font-semibold truncate">
                                                    {user?.name || "Customer"}
                                                </span>
                                                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                                                    {user?.email}
                                                </span>
                                            </div>
                                        </div>
                                        <Link
                                            href="/profile"
                                            className="text-accent-700 hover:text-primary font-label-md text-label-md font-semibold px-space-sm py-1 rounded hover:bg-surface-container transition-colors"
                                        >
                                            Profile
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between text-sm">
                                        <span>Sign in to continue to payment</span>
                                        <Link href="/login?next=%2Fcheckout" className="text-accent-700 font-semibold underline">
                                            Sign In
                                        </Link>
                                    </div>
                                )}

                            </section>

                            {/* STEP 2: SHIPPING ADDRESS */}
                            <section className="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high/40">
                                <div className="flex items-center justify-between pb-space-xs">
                                    <div className="flex items-center gap-space-sm">
                                        <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">
                                            2
                                        </span>
                                        <div>
                                            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                                                Shipping Address
                                            </h2>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                Choose a saved address
                                            </p>
                                        </div>
                                    </div>
                                    {summary && <span className="font-label-sm text-label-sm text-secondary bg-secondary/10 px-space-sm py-1 rounded-full font-medium flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[14px]">local_shipping</span> Address accepted
                                    </span>}
                                </div>

                                {isAuthenticated ? (
                                    <AddressManager
                                        embedded
                                        selectedId={addressId}
                                        onSelect={(id) => { setAddressId(id); setCarrierId(undefined); }}
                                        onEditingChange={setAddressDirty}
                                        onChange={(updated) => {
                                            setAddresses(updated);
                                            setAddressId((current) => updated.some((address) => address.id === current)
                                                ? current : (updated.find((address) => address.set_default) || updated[0])?.id || 0);
                                            setAddressRevision((revision) => revision + 1);
                                        }}
                                    />
                                ) : (
                                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                                        <Link href="/login?next=%2Fcheckout" className="text-accent-700 underline font-semibold">Sign in</Link> to add or edit your delivery address here.
                                    </p>
                                )}
                            </section>

                            {/* STEP 3: SHIPPING METHOD */}
                            <section className="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high/40">
                                <div className="flex items-center gap-space-sm pb-space-xs">
                                    <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">
                                        3
                                    </span>
                                    <div>
                                        <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                                            Shipping Method
                                        </h2>
                                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                                            Calculated for your selected address
                                        </p>
                                    </div>
                                </div>
                                {summary?.shipping_options.length ? summary.shipping_options.map((option) => (
                                    <label key={option.id} className="p-space-md rounded-lg bg-surface-container-low flex items-start gap-space-md border border-surface-container-high/40 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="courier"
                                            value={option.id}
                                            checked={(carrierId ?? summary.carrier_id) === option.id}
                                            onChange={() => setCarrierId(option.id)}
                                            className="w-5 h-5 accent-secondary mt-0.5"
                                        />
                                        <span className="flex-1 font-label-lg text-label-lg text-primary font-bold">{option.name}
                                            <span className="block font-body-sm text-body-sm text-on-surface-variant font-normal">{option.transit_time}</span>
                                        </span>
                                        <span className="font-headline-sm text-headline-sm text-secondary font-bold">{option.cost === 0 ? "FREE" : formatINR(option.cost)}</span>
                                    </label>
                                )) : <div className="p-space-md rounded-lg bg-surface-container-low border border-surface-container-high/40 flex justify-between gap-4">
                                    <span className="font-label-lg text-label-lg text-primary font-bold">Shipping</span>
                                    <span className="font-headline-sm text-headline-sm text-secondary font-bold">{shippingCost === undefined ? "Waiting for address and rate" : shippingCost === 0 ? "FREE" : formatINR(shippingCost)}</span>
                                </div>}
                                {error && !summary && <p role="alert" className="text-error text-sm">{error}</p>}
                            </section>

                            {/* STEP 4: PAYMENT OPTIONS */}
                            <section className="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high/40">
                                <div className="flex items-center justify-between pb-space-xs">
                                    <div className="flex items-center gap-space-sm">
                                        <span className="w-7 h-7 rounded-full bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center font-bold">
                                            4
                                        </span>
                                        <div>
                                            <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                                                Payment Options
                                            </h2>
                                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                                                Online payment through Razorpay
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                                        <span>Secure checkout</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-space-sm">
                                    {/* Option 1: Razorpay Secure */}
                                    <label
                                        className="p-space-md rounded-lg flex flex-col gap-space-sm border bg-surface-container-low border-primary-container"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-space-sm">
                                                <input
                                                    checked
                                                    readOnly
                                                    className="w-5 h-5 accent-primary-container"
                                                    type="radio"
                                                />
                                                <div>
                                                    <span className="font-label-lg text-label-lg text-primary font-bold">
                                                        Razorpay Secure Online
                                                    </span>
                                                    <span className="ml-2 font-label-sm text-label-sm bg-accent-50 text-accent-700 px-2 py-0.5 rounded-full font-semibold">
                                                        Recommended
                                                    </span>
                                                </div>
                                            </div>
                                            <span className="font-label-sm text-label-sm text-secondary font-semibold">{paymentAvailable ? "Available" : "Unavailable"}</span>
                                        </div>
                                        <div className="pl-8 flex flex-wrap items-center gap-space-xs pt-1">
                                            <span className="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span> UPI
                                            </span>
                                            <span className="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">credit_card</span> Cards
                                            </span>
                                            <span className="px-2 py-1 bg-surface-container rounded font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[14px]">account_balance</span> NetBanking
                                            </span>
                                        </div>
                                    </label>

                                    {/* Option 2: COD */}
                                    <label
                                        className="p-space-md rounded-lg flex items-center justify-between border bg-surface-container-low/60 border-transparent opacity-60"
                                    >
                                        <div className="flex items-center gap-space-sm">
                                            <input
                                                disabled
                                                className="w-5 h-5 accent-primary-container"
                                                type="radio"
                                            />
                                            <div className="flex flex-col">
                                                <span className="font-label-lg text-label-lg text-primary font-semibold">
                                                    Cash on Delivery (COD)
                                                </span>
                                                <span className="font-body-sm text-body-sm text-on-surface-variant">
                                                    Not available through this checkout
                                                </span>
                                            </div>
                                        </div>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-1 rounded">
                                            Unavailable
                                        </span>
                                    </label>
                                </div>
                            </section>

                            {/* PRIMARY SUBMIT ACTION */}
                            <div className="flex flex-col gap-space-sm pt-space-xs">
                                {error && (
                                    <div className="p-space-md bg-error/10 border border-error/20 rounded-lg text-error text-sm font-medium">
                                        {error}
                                    </div>
                                )}

                                <button
                                    onClick={() => void handlePay()}
                                    disabled={paying || !isAuthenticated || !addressId || !summary || !paymentAvailable || addressDirty}
                                    className="w-full py-space-md px-space-xl bg-primary-container hover:bg-primary-700 active:scale-[0.99] text-on-primary rounded-lg font-headline-sm text-headline-sm transition-all shadow-md flex items-center justify-center gap-space-sm disabled:opacity-50"
                                    type="button"
                                >
                                    <span className="material-symbols-outlined text-[24px]">lock</span>
                                    <span>
                                        {paying ? "Processing Payment..." : grandTotal === undefined ? "Waiting for server total" : `Pay ${formatINR(grandTotal)} & Place Order`}
                                    </span>
                                </button>

                                <div className="flex flex-wrap items-center justify-center gap-space-md text-on-surface-variant font-label-sm text-label-sm pt-space-xs">
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">verified</span>
                                        Razorpay checkout
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">replay</span>
                                        Review return policy
                                    </span>
                                    <span>•</span>
                                    <span className="flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[16px] text-secondary">eco</span>
                                        Shipping shown above
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Sticky Order Summary (5 of 12 cols) */}
                        <div className="lg:col-span-5 flex flex-col gap-space-lg lg:sticky lg:top-24">
                            {/* Cart Summary Card */}
                            <div className="bg-background-cream rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md border border-surface-container-high/40">
                                <div className="flex items-center justify-between pb-space-xs border-b border-surface-container">
                                    <div className="flex items-center gap-space-xs">
                                        <h2 className="font-headline-sm text-headline-sm text-primary font-bold">Your Harvest Box</h2>
                                        <span className="w-6 h-6 rounded-full bg-accent-50 text-accent-700 font-label-sm text-label-sm flex items-center justify-center font-bold">
                                            {cart.item_count}
                                        </span>
                                    </div>
                                    <Link className="font-label-md text-label-md text-accent-700 hover:text-primary underline" href="/#flavours">
                                        Edit Items
                                    </Link>
                                </div>

                                {/* Order Items List */}
                                <div className="flex flex-col divide-y divide-surface-container gap-space-sm">
                                    {cart.items.map((item) => (
                                        <div key={item.id} className="flex items-center justify-between gap-space-sm pt-space-xs">
                                            <div className="flex items-center gap-space-sm min-w-0">
                                                <div className="relative shrink-0">
                                                    <div className="w-16 h-16 rounded-lg bg-surface-container flex items-center justify-center overflow-hidden relative">
                                                        {item.thumbnail_url ? <Image
                                                            src={item.thumbnail_url}
                                                            alt={item.product_name}
                                                            fill
                                                            unoptimized={!isOptimizableImage(item.thumbnail_url)}
                                                            sizes="64px"
                                                            className="object-cover"
                                                        /> : <span className="material-symbols-outlined text-primary-50">inventory_2</span>}
                                                    </div>
                                                    <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm flex items-center justify-center font-bold">
                                                        {item.quantity}
                                                    </span>
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <h3 className="font-label-lg text-label-lg text-primary truncate font-semibold">
                                                        {item.product_name}
                                                    </h3>
                                                    <span className="font-body-sm text-body-sm text-on-surface-variant">Quantity {item.quantity}</span>
                                                </div>
                                            </div>
                                            <div className="text-right shrink-0">
                                                <span className="font-label-lg text-label-lg text-primary font-bold">
                                                    {formatINR(item.price * item.quantity)}
                                                </span>
                                                <span className="block font-label-sm text-label-sm text-primary-50">
                                                    {formatINR(item.price)} each
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Coupon Code Section */}
                                <div className="pt-space-sm flex flex-col gap-space-xs border-t border-surface-container">
                                    <label className="font-label-sm text-label-sm text-primary-300 uppercase tracking-wider font-semibold">
                                        Promo Code / Heritage Voucher
                                    </label>
                                    <div className="flex items-center gap-space-xs">
                                        <input
                                            className="flex-1 bg-surface-container-low px-space-md py-space-xs rounded-lg font-body-sm text-body-sm text-primary uppercase border border-surface-container-high/40"
                                            placeholder="Promo codes unavailable"
                                            type="text"
                                            value=""
                                            readOnly
                                            disabled
                                        />
                                        <button disabled className="px-space-md py-space-xs rounded-lg bg-surface-container text-primary font-label-md text-label-md font-semibold opacity-50" type="button">Apply</button>
                                    </div>
                                </div>

                                {/* Cost Breakdown List */}
                                <div className="pt-space-xs flex flex-col gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                                    <div className="flex items-center justify-between">
                                        <span>Items Subtotal</span>
                                        <span className="font-label-md text-label-md text-primary font-semibold">
                                            {subtotal === undefined ? "—" : formatINR(subtotal)}
                                        </span>
                                    </div>
                                    {discount !== undefined && discount > 0 && (
                                        <div className="flex items-center justify-between text-secondary">
                                            <span className="flex items-center gap-1">
                                                <span>Discount</span>
                                            </span>
                                            <span className="font-label-md text-label-md font-semibold">
                                                -{formatINR(discount)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="flex items-center gap-1">
                                            <span>Shipping</span>
                                        </span>
                                        <span className="font-label-md text-label-md text-secondary font-bold">{shippingCost === undefined ? "—" : shippingCost === 0 ? "FREE" : formatINR(shippingCost)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-on-surface-variant">
                                        <span className="text-xs">Tax</span>
                                        <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                                            {tax === undefined ? "—" : formatINR(tax)}
                                        </span>
                                    </div>

                                    {/* Grand Total */}
                                    <div className="pt-space-sm mt-space-xs flex items-baseline justify-between bg-surface-container-low p-space-md rounded-lg border border-surface-container-high/40">
                                        <div className="flex flex-col">
                                            <span className="font-label-lg text-label-lg text-primary font-bold">Total Amount</span>
                                            <span className="font-label-sm text-label-sm text-primary-50">Calculated by the store</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="font-headline-md text-headline-md text-primary font-bold">
                                                {grandTotal === undefined ? "—" : formatINR(grandTotal)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Credentials Card */}
                            <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm shadow-sm border border-surface-container-high/40">
                                <div className="flex items-center gap-space-sm">
                                    <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center text-secondary shrink-0">
                                        <span className="material-symbols-outlined text-[18px]">verified</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-label-md text-label-md text-primary font-bold">Need help with your order?</span>
                                        <Link href="/contact" className="font-body-sm text-body-sm text-on-surface-variant underline">Contact our team before payment.</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
