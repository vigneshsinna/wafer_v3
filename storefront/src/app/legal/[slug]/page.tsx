import { notFound } from "next/navigation";
import { getStorePage } from "@/lib/storeContent";

export function generateStaticParams() {
    return [
        { slug: "privacy-policy" },
        { slug: "terms-of-service" },
        { slug: "refund-policy" },
        { slug: "return-policy" },
        { slug: "shipping-policy" },
    ];
}

const legalContent: Record<string, { title: string; content: React.ReactNode }> = {
    "privacy-policy": {
        title: "Privacy Policy",
        content: (
            <div className="space-y-4">
                <p>Last updated: January 2026</p>
                <p>
                    Wafer King Snacks ("we", "our", or "us") respects your privacy and is committed to protecting the personal information you share with us. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website or make a purchase.
                </p>

                <h3>1. Information We Collect</h3>
                <p>We collect information you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes:</p>
                <ul className="list-disc pl-5">
                    <li>Name, email address, phone number</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (processed securely by our payment partners)</li>
                </ul>

                <h3>2. How We Use Your Information</h3>
                <p>We use your information to:</p>
                <ul className="list-disc pl-5">
                    <li>Process and fulfill your orders</li>
                    <li>Communicate with you about your order status</li>
                    <li>Send you updates and promotional offers (if you opt-in)</li>
                    <li>Improve our website and customer service</li>
                </ul>

                <h3>3. Data Security</h3>
                <p>
                    We implement appropriate security measures to protect your personal information. We do not sell or rent your personal data to third parties.
                </p>

                <h3>4. Contact Us</h3>
                <p>
                    If you have questions about this Privacy Policy, please contact us at:<br />
                    Email: waferkingindia33@gmail.com<br />
                    Phone: +91 97880 90895
                </p>
            </div>
        ),
    },
    "terms-of-service": {
        title: "Terms of Service",
        content: (
            <div className="space-y-4">
                <p>Welcome to Wafer King Snacks. By accessing or using our website, you agree to be bound by these Terms of Service.</p>

                <h3>1. Use of Our Service</h3>
                <p>
                    By using our website and services, you agree to use them only for lawful purposes and in accordance with these terms. You agree not to use our products for any illegal or unauthorized purpose.
                </p>

                <h3>2. Products and Pricing</h3>
                <p>
                    We make every effort to display accurate images and pricing of our products. However, we reserve the right to correct any errors or inaccuracies and to change or update information at any time without prior notice.
                </p>

                <h3>3. Intellectual Property</h3>
                <p>
                    All content on this website, including text, graphics, logos, and images, is the property of Wafer King Snacks and is protected by copyright laws.
                </p>

                <h3>4. Governing Law</h3>
                <p>
                    These Terms of Service shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Erode, Tamil Nadu.
                </p>
            </div>
        ),
    },
    "refund-policy": {
        title: "Refund Policy",
        content: (
            <div className="space-y-4">
                <p>
                    We want you to be completely satisfied with your purchase. However, due to the perishable nature of our products, we have specific guidelines for refunds.
                </p>

                <h3>1. Eligibility for Refunds</h3>
                <p>
                    Refunds are only issued in the following circumstances:
                </p>
                <ul className="list-disc pl-5">
                    <li>The product received is damaged or defective.</li>
                    <li>The wrong product was delivered.</li>
                    <li>The product is expired at the time of delivery.</li>
                </ul>

                <h3>2. Refund Process</h3>
                <p>
                    To request a refund, please contact us within 48 hours of delivery at support@waferking.com with photos of the damaged or incorrect item. We will inspect your request and notify you of the approval or rejection of your refund.
                </p>
                <p>
                    If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
                </p>
            </div>
        ),
    },
    "return-policy": {
        title: "Return Policy",
        content: (
            <div className="space-y-4">
                <p>
                    Due to hygiene and food safety standards, Wafer King Snacks generally does not accept returns of food products once delivered.
                </p>

                <h3>1. Damaged or Incorrect Items</h3>
                <p>
                    If you receive a damaged or incorrect item, you do not need to return it. Please contact us with photographic evidence, and we will arrange for a replacement or refund as per our Refund Policy.
                </p>

                <h3>2. Cancellation</h3>
                <p>
                    You may cancel your order before it has been shipped. Once shipped, orders cannot be cancelled or returned.
                </p>
            </div>
        ),
    },
    "shipping-policy": {
        title: "Shipping Policy",
        content: (
            <div className="space-y-4">
                <p>
                    Delivery options and charges are shown during checkout for your saved address.
                </p>

                <h3>1. Processing Time</h3>
                <p>
                    Processing times can vary. Contact our team if you need an update on an order.
                </p>

                <h3>2. Free Shipping</h3>
                <p>
                    Shipping charges are calculated for your address at checkout.
                </p>

                <h3>3. Delivery Estimates</h3>
                <p>
                    Delivery timing depends on the destination and carrier.
                </p>

                <h3>4. Shipment Tracking</h3>
                <p>
                    Enter your order reference on the Track Order page to see its latest recorded status.
                </p>
            </div>
        ),
    },
};

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = legalContent[slug];

    if (!page) {
        notFound();
    }
    const managedPage = await getStorePage(slug);

    return (
        <div className="min-h-screen bg-background pb-20 pt-32">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="font-display text-4xl font-bold text-primary mb-8 text-center">
                    {managedPage?.content ? managedPage.title : page.title}
                </h1>

                <div data-scroll-reveal className="surface-panel legal-content max-w-none p-8 text-primary/80 md:p-12">
                    {managedPage?.content ? <div className="whitespace-pre-line leading-relaxed">{managedPage.content}</div> : page.content}
                </div>
            </div>
        </div>
    );
}
