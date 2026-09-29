import { getStoreSettings } from "@/lib/storeContent";
import ContactContent from "./ContactContent";

export default async function ContactPage() {
    return <ContactContent settings={await getStoreSettings()} />;
}
