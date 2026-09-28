<?php

namespace Tests\Unit;

use App\Services\Checkout\CheckoutService;
use App\Services\Cart\CartService;
use PHPUnit\Framework\TestCase;

class V3CheckoutPolicyTest extends TestCase
{
    public function test_approved_free_shipping_thresholds(): void
    {
        self::assertFalse(CheckoutService::qualifiesForFreeShipping('Tamil Nadu', 498.99));
        self::assertTrue(CheckoutService::qualifiesForFreeShipping('Tamil Nadu', 499.00));
        self::assertFalse(CheckoutService::qualifiesForFreeShipping('Karnataka', 698.99));
        self::assertTrue(CheckoutService::qualifiesForFreeShipping('Karnataka', 699.00));
    }

    public function test_gst_is_extracted_from_listed_price(): void
    {
        self::assertSame(5.48, CartService::includedGst(115, 5));
        self::assertSame(5.71, CartService::includedGst(120, 5));
        self::assertSame(0.0, CartService::includedGst(115, 0));
    }
}
