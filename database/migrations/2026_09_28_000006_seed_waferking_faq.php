<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class SeedWaferkingFaq extends Migration
{
    public function up(): void
    {
        // Admin page content remains editable; existing content is never replaced.
        $html = <<<'HTML'
<h2>Ingredients &amp; Sourcing</h2>
<h3>What makes Karuppu Kavuni (Black Rice) different from white or brown rice?</h3>
<p>Karuppu Kavuni is a dark whole-grain rice variety. Check each product label for its full ingredient and nutrition details.</p>
<h3>Where do you source your botanical flowers and herbs?</h3>
<p>Contact our team for current sourcing information for a particular batch.</p>
<h3>Do you use palm oil, refined vegetable fats, or preservatives?</h3>
<p>Ingredients can differ by product and batch. Check the package label before purchase or contact us for details.</p>
<h2>Health, Dietary &amp; Nutrition</h2>
<h3>Are WaferKing wafers 100% gluten-free?</h3>
<p>Check the allergen statement on the package for the product you are buying. Contact us if you need more information.</p>
<h3>Are your wafers suitable for diabetics?</h3>
<p>Use the nutrition label to assess the product with your healthcare professional for your individual needs.</p>
<h3>What is the calorie count per serving?</h3>
<p>Serving size and calories appear on each product package.</p>
<h2>Orders, Delivery &amp; Tracking</h2>
<h3>How fast do you deliver across India?</h3>
<p>Delivery estimates depend on your address and are shown at checkout when available.</p>
<h3>How does live order tracking work?</h3>
<p>Enter your order code on the Track Order page to see its latest status.</p>
<h3>What payment methods do you accept?</h3>
<p>Available online payment methods appear at checkout. If checkout is unavailable, contact our team.</p>
<h2>Packaging &amp; Shelf Life</h2>
<h3>What is the shelf life of the 55g artisan pack?</h3>
<p>Refer to the best-before date printed on the package for your batch.</p>
<h3>How should I store the wafers once opened?</h3>
<p>Follow the storage directions printed on the package.</p>
HTML;

        DB::table('pages')->where('slug', 'faq')->whereNull('content')
            ->update(['content' => $html, 'updated_at' => now()]);
    }

    public function down(): void
    {
        // Preserve edits made in the admin.
    }
}
