<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStorefrontPaymentAttemptsTable extends Migration
{
    public function up(): void
    {
        Schema::create('storefront_payment_attempts', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('address_id');
            $table->unsignedBigInteger('order_id')->nullable();
            $table->string('razorpay_order_id')->unique();
            $table->string('razorpay_payment_id')->nullable()->unique();
            $table->unsignedInteger('amount_paise');
            $table->string('cart_fingerprint', 64);
            $table->longText('snapshot');
            $table->string('status', 24)->default('created');
            $table->timestamps();
            $table->index(['user_id', 'cart_fingerprint', 'status'], 'storefront_payment_cart_lookup');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('storefront_payment_attempts');
    }
}
