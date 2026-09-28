"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Package } from "lucide-react";
import Input from "@/components/ui/Input";

export default function TrackPage() {
    const router = useRouter();
    const [orderId, setOrderId] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!orderId.trim()) {
            setError("Please enter an order ID");
            return;
        }

        router.push(`/track/${orderId.trim().toUpperCase()}`);
    };

    return (
        <div className="min-h-screen pt-32 pb-20 bg-background">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto text-center"
                >
                    {/* Icon */}
                    <div className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Package className="w-10 h-10 text-accent" />
                    </div>

                    <h1 className="font-display text-3xl md:text-4xl font-bold text-primary mb-4">
                        Track Your Order
                    </h1>

                    <p className="text-primary/60 mb-8">
                        Enter your order ID to see the current status of your royal delivery.
                    </p>

                    {/* Search Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            name="orderId"
                            placeholder="Enter Order ID (e.g., WK-1234)"
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            error={error}
                        />

                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full btn-accent flex items-center justify-center gap-2"
                        >
                            <Search className="w-4 h-4" />
                            Track Order
                        </motion.button>
                    </form>

                    {/* Help Text */}
                    <p className="mt-6 text-sm text-primary/50">
                        Your order ID was sent to your email after placing the order.
                        It looks like: WK-XXXX
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
