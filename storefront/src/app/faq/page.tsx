import { getStorePage } from "@/lib/storeContent";
import FAQContent from "./FAQContent";

export default async function FAQPage() {
    return <FAQContent page={await getStorePage("faq")} />;
}
