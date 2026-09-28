<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class SetWaferkingPageCopy extends Migration
{
    public function up(): void
    {
        // Existing storefront text, moved into the admin page editor without replacing later edits.
        $pages = [
            'about' => ['Wafer King, made in Erode.', 'We bring black rice and ingredients familiar to Indian kitchens together in a range of crisp, flavourful wafers.'],
            'privacy-policy' => ['Privacy Policy', "Wafer King Snacks respects your privacy and is committed to protecting the personal information you share with us.\n\nWe collect information you provide when creating an account, placing an order, or contacting support, including your name, email, phone number, and shipping and billing addresses. Payment information is processed by our payment partners.\n\nWe use this information to process orders, communicate about order status, and improve customer service. We do not sell or rent your personal data to third parties.\n\nFor privacy questions, contact waferkingindia33@gmail.com or +91 97880 90895."],
            'terms-of-service' => ['Terms of Service', "By using this website, you agree to use it for lawful purposes.\n\nWe make every effort to display accurate product images and prices. We may correct errors or update information.\n\nWebsite text, graphics, logos, and images are the property of Wafer King Snacks.\n\nThese terms are governed by the laws of India. Disputes are subject to the courts in Erode, Tamil Nadu."],
            'refund-policy' => ['Refund Policy', "Due to the perishable nature of our products, refunds are considered when a product arrives damaged or defective, the wrong product is delivered, or a product is expired at delivery.\n\nContact support@waferking.com within 48 hours of delivery with your order ID and photos of the item. We will review the request and communicate the outcome. If approved, a refund is processed to the original payment method within 5–7 business days."],
            'return-policy' => ['Return Policy', "Due to hygiene and food safety standards, Wafer King Snacks generally does not accept returns of delivered food products.\n\nIf an item arrives damaged or incorrect, contact us with photos. We will review a replacement or refund under the Refund Policy. Orders may be cancelled before shipment."],
            'shipping-policy' => ['Shipping Policy', "Wafer King Snacks delivers across India. Orders are processed within 1–2 business days, excluding weekends and holidays.\n\nFree shipping applies from ₹499 in Tamil Nadu and ₹699 elsewhere in India. Below these thresholds, the configured shipping charge is shown at checkout.\n\nEstimated delivery is 2–3 business days in Tamil Nadu, 3–5 business days in the rest of South India, and 5–7 business days in North India. Tracking details are shared after dispatch."],
        ];

        foreach ($pages as $slug => [$title, $content]) {
            DB::table('pages')->where('slug', $slug)->whereNull('content')
                ->update(['title' => $title, 'content' => $content, 'updated_at' => now()]);
        }
    }

    public function down(): void
    {
        // Preserve page edits made in admin.
    }
}
