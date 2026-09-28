"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatINR } from "@/lib/money";
import { confirmRazorpayPayment, getAddresses, getCheckoutSummary, getPaymentConfig, startRazorpayPayment } from "@/lib/api";
import type { Address, CheckoutSummary } from "@/types";

declare global {
    interface Window {
        Razorpay: new (options: Record<string, unknown>) => {
            open: () => void;
            on: (event: string, handler: (response: { error?: { description?: string } }) => void) => void;
        };
    }
}

export default function CheckoutPage() {
    const router = useRouter();
    const { cart, fetchCart } = useCartStore();
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [addressId, setAddressId] = useState<number>(0);
    const [summary, setSummary] = useState<CheckoutSummary | null>(null);
    const [error, setError] = useState("");
    const [paymentAvailable, setPaymentAvailable] = useState(false);
    const [paying, setPaying] = useState(false);

    useEffect(() => {
        void getPaymentConfig().then(data => setPaymentAvailable(data.available))
            .catch(() => setPaymentAvailable(false));
    }, []);

    async function pay() {
        if (!summary || !addressId || paying) return;
        setPaying(true);
        setError("");
        try {
            const order = await startRazorpayPayment(addressId);
            await new Promise<void>((resolve, reject) => {
                if (window.Razorpay) { resolve(); return; }
                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve();
                script.onerror = () => reject(new Error("Could not load Razorpay checkout."));
                document.body.appendChild(script);
            });
            const razorpay = new window.Razorpay({
                key: order.key, order_id: order.razorpay_order_id,
                amount: order.amount, currency: order.currency, name: "Wafer King",
                description: "Wafer King order", prefill: { name: order.name, email: order.email, contact: order.phone },
                handler: async (payment: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
                    try {
                        const result = await confirmRazorpayPayment(payment);
                        await fetchCart();
                        router.push(`/success?order_id=${encodeURIComponent(result.order_code)}`);
                    } catch (e) {
                        setError(e instanceof Error ? e.message : "Payment could not be confirmed. Check your orders or contact support.");
                    } finally { setPaying(false); }
                },
                modal: { ondismiss: () => setPaying(false) },
            });
            razorpay.on("payment.failed", (response: { error?: { description?: string } }) => {
                setError(response.error?.description || "Payment failed. Please try again.");
                setPaying(false);
            });
            razorpay.open();
        } catch (e) {
            setError(e instanceof Error ? e.message : "Could not start payment.");
            setPaying(false);
        }
    }

    useEffect(() => { void fetchCart(); }, [fetchCart]);
    useEffect(() => {
        if (!isAuthenticated) return;
        void getAddresses().then(data => {
            setAddresses(data);
            setAddressId(current => current || data.find(address => address.set_default)?.id || data[0]?.id || 0);
        }).catch(e => setError(e instanceof Error ? e.message : "Could not load addresses."));
    }, [isAuthenticated]);
    useEffect(() => {
        if (!isAuthenticated || !addressId || !cart.items.length) { setSummary(null); return; }
        let current = true;
        setSummary(null);
        void getCheckoutSummary(addressId).then(data => {
            if (current) { setSummary(data); setError(""); }
        }).catch(e => { if (current) setError(e instanceof Error ? e.message : "Could not load checkout summary."); });
        return () => { current = false; };
    }, [addressId, isAuthenticated, cart.items]);

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-2xl">
                <h1 className="font-display text-3xl font-bold text-primary text-center mb-8">Checkout</h1>
                {cart.items.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-warm p-8 text-center">
                        <ShoppingBag className="w-14 h-14 text-primary/30 mx-auto mb-4" aria-hidden="true" />
                        <p className="text-primary/70 mb-6">Your cart is empty.</p>
                        <Link href="/" className="btn-accent inline-block">Continue shopping</Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-warm p-6 md:p-8">
                        <h2 className="font-display text-xl font-bold text-primary mb-5">Order summary</h2>
                        <div className="space-y-3">
                            {cart.items.map(item => (
                                <div key={item.id} className="flex justify-between gap-4 text-sm">
                                    <span>{item.product_name} × {item.quantity}</span>
                                    <span>{formatINR(item.price * item.quantity)}</span>
                                </div>
                            ))}
                        </div>
                        {isAuthenticated && <div className="border-t border-primary/10 mt-5 pt-4">
                            <label htmlFor="shipping-address" className="block font-medium mb-2">Shipping address</label>
                            <select id="shipping-address" value={addressId || ""}
                                onChange={event => setAddressId(Number(event.target.value))}
                                className="w-full rounded-lg border p-3 mb-2">
                                {addresses.length === 0 && <option value="">No saved addresses</option>}
                                {addresses.map(address => <option key={address.id} value={address.id}>
                                    {address.address}, {address.city}, {address.state} {address.postal_code}
                                </option>)}
                            </select>
                            <Link href="/profile?tab=settings" className="text-primary underline text-sm">Manage addresses</Link>
                        </div>}
                        {summary && (
                            <div className="border-t border-primary/10 mt-5 pt-4 space-y-2">
                                <div className="flex justify-between"><span>Subtotal</span><span>{formatINR(summary.sub_total)}</span></div>
                                <div className="flex justify-between"><span>Tax</span><span>{formatINR(summary.tax)}</span></div>
                                <div className="flex justify-between"><span>Shipping</span><span>{formatINR(summary.shipping_cost)}</span></div>
                                {summary.discount > 0 && <div className="flex justify-between"><span>Discount</span><span>−{formatINR(summary.discount)}</span></div>}
                                <div className="flex justify-between font-bold text-lg"><span>Estimated total</span><span>{formatINR(summary.grand_total)}</span></div>
                            </div>
                        )}
                        {error && <p role="alert" className="mt-4 text-red-700">{error}</p>}
                        {paymentAvailable && summary ? (
                            <button type="button" onClick={() => void pay()} disabled={paying} className="btn-accent mt-6 w-full disabled:opacity-50">
                                {paying ? "Processing payment…" : `Pay ${formatINR(summary.grand_total)} with Razorpay`}
                            </button>
                        ) : (
                            <p className="mt-6 rounded-lg bg-background-warm border border-accent-100 p-4 text-sm text-primary" role="status">
                                {paymentAvailable ? "Select a valid shipping address to continue." : "Razorpay checkout is awaiting admin configuration. No payment can be taken yet."}
                            </p>
                        )}
                        {!isAuthenticated && <Link href="/login?next=%2Fcheckout" className="btn-accent inline-block mt-5">Sign in to continue</Link>}
                    </div>
                )}
            </div>
        </div>
    );
}
