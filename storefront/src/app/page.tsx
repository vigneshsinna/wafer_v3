import { getProducts } from "@/lib/api";
import HomeContent from "./HomeContent";

export default async function HomePage() {
    try {
        return <HomeContent products={await getProducts()} error={false} />;
    } catch {
        return <HomeContent products={[]} error />;
    }
}
