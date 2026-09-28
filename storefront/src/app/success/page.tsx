"use client";

import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, Crown, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { getMyOrderDetail } from "@/lib/api";

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("order_id");
    const [verified, setVerified] = useState(false);
    const [message, setMessage] = useState("Checking your order...");

    useEffect(() => {
        if (!orderId) { setMessage("No order code was provided."); return; }
        let current = true;
        void getMyOrderDetail(orderId).then(order => {
            if (!current) return;
            if (order.payment_status === "paid") setVerified(true);
            else setMessage("Payment for this order is not confirmed yet.");
        }).catch(() => { if (current) setMessage("This paid order could not be verified. Sign in and check your orders."); });
        return () => { current = false; };
    }, [orderId]);

    if (!verified) {
        return <div className="min-h-screen pt-32 pb-20 bg-background text-center px-4">
            <h1 className="font-display text-3xl font-bold text-primary mb-4">Order status</h1>
            <p role="status" className="mb-6">{message}</p>
            <Link href="/profile" className="text-primary underline">View your orders</Link>
        </div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-lg mx-auto text-center"
                >
                    {/* Success Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-24 h-24 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <CheckCircle className="w-12 h-12 text-secondary" />
                    </motion.div>

                    {/* Crown */}
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-4"
                    >
                        <Crown className="w-8 h-8 text-accent mx-auto" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="font-display text-3xl md:text-4xl font-bold text-primary mb-4"
                    >
                        Order Placed Successfully!
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-primary/60 mb-8"
                    >
                        Thank you for choosing Wafer King. Your royal order is being prepared
                        with love.
                    </motion.p>

                    {/* Order ID Card */}
                    {orderId && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="bg-white rounded-2xl shadow-warm p-6 mb-8"
                        >
                            <div className="flex items-center justify-center gap-2 text-sm text-primary/60 mb-2">
                                <Package className="w-4 h-4" />
                                <span>Order ID</span>
                            </div>
                            <p className="font-display font-bold text-2xl text-accent">
                                {orderId}
                            </p>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        {orderId && (
                            <Link href={`/track/${orderId}`}>
                                <button className="btn-accent flex items-center justify-center gap-2 w-full sm:w-auto">
                                    <Package className="w-4 h-4" />
                                    Track Order
                                </button>
                            </Link>
                        )}
                        <Link href="/">
                            <button className="btn-outline flex items-center justify-center gap-2 w-full sm:w-auto">
                                Continue Shopping
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>
                    </motion.div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.9 }}
                        className="mt-12 p-6 bg-accent/10 rounded-xl text-left"
                    >
                        <h3 className="font-display font-semibold text-primary mb-3">
                            What happens next?
                        </h3>
                        <ul className="space-y-2 text-sm text-primary/70">
                            <li className="flex items-start gap-2">
                                <span className="text-accent">✓</span>
                                <span>Your paid order is available in your account</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-accent">✓</span>
                                <span>Our team will carefully pack your order</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-accent">✓</span>
                                <span>We&apos;ll notify you when your order ships</span>
                            </li>
                        </ul>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen pt-32 pb-20 bg-background flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
