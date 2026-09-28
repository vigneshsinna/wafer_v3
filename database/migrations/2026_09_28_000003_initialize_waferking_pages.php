<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class InitializeWaferkingPages extends Migration
{
    public function up(): void
    {
        foreach ([
            'about' => 'About Wafer King',
            'faq' => 'Frequently Asked Questions',
            'privacy-policy' => 'Privacy Policy',
            'terms-of-service' => 'Terms of Service',
            'refund-policy' => 'Refund Policy',
            'return-policy' => 'Return Policy',
            'shipping-policy' => 'Shipping Policy',
        ] as $slug => $title) {
            if (!DB::table('pages')->where('slug', $slug)->exists()) {
                DB::table('pages')->insert([
                    'type' => 'custom_page', 'slug' => $slug, 'title' => $title,
                    'content' => null, 'created_at' => now(), 'updated_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        // Preserve content entered in admin after installation.
    }
}
