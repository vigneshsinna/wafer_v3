import Link from "next/link";
import { Package } from "lucide-react";
import type { TrackingResponse } from "@/types";

interface TrackingResultProps {
    order: TrackingResponse | null;
    error: string | null;
    orderId: string;
}

const labels: Record<string, string> = {
    pending: "Processing",
    confirmed: "Confirmed",
    picked_up: "Picked up",
    on_the_way: "On the way",
    delivered: "Delivered",
    cancelled: "Cancelled",
};

export default function TrackingResult({ order, error, orderId }: TrackingResultProps) {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-background">
            <div className="container mx-auto px-4 max-w-xl text-center">
                <Package className="w-14 h-14 text-accent mx-auto mb-4" aria-hidden="true" />
                {order ? (
                    <>
                        <h1 className="font-display text-3xl font-bold text-primary mb-3">Order {order.code}</h1>
                        <p className="text-primary/70 mb-6">Placed {new Date(order.created_at).toLocaleDateString("en-IN")}</p>
                        <div className="bg-white rounded-2xl shadow-warm p-8">
                            <p className="text-sm text-primary/60">Current delivery status</p>
                            <p className="text-2xl font-bold text-accent mt-2">{labels[order.delivery_status] || order.delivery_status}</p>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="font-display text-3xl font-bold text-primary mb-3">Order not found</h1>
                        <p className="text-primary/70 mb-6" role="alert">{error || `Check order code ${orderId} and try again.`}</p>
                    </>
                )}
                <Link href="/track" className="btn-outline inline-block mt-8">Track another order</Link>
            </div>
        </main>
    );
}
