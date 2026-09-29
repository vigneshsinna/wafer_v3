import { trackOrder } from "@/lib/api";
import TrackingResult from "@/components/tracking/TrackingResult";

interface TrackOrderPageProps {
    params: { orderId: string };
}

export default async function TrackOrderPage({ params }: TrackOrderPageProps) {
    let order = null;
    let error = null;

    try {
        order = await trackOrder(params.orderId);
    } catch (err) {
        error = err instanceof Error ? err.message : "Order not found";
    }

    return <TrackingResult order={order} error={error} orderId={params.orderId} />;
}
