<?php

namespace App\Services\Payment;

use App\Models\PaymentMethod;
use Razorpay\Api\Api;

class RazorpayGateway
{
    public function isAvailable(): bool
    {
        return (bool) PaymentMethod::where('name', 'razorpay')->whereNull('addon_identifier')->value('active')
            && filled(config('services.razorpay.key'))
            && filled(config('services.razorpay.secret'))
            && filled(config('services.razorpay.webhook_secret'));
    }

    public function publicKey(): string
    {
        return (string) config('services.razorpay.key');
    }

    public function createOrder(int $amountPaise, string $receipt): array
    {
        return $this->api()->order->create([
            'amount' => $amountPaise,
            'currency' => 'INR',
            'receipt' => $receipt,
        ])->toArray();
    }

    public function verifyCheckoutSignature(string $orderId, string $paymentId, string $signature): void
    {
        $this->api()->utility->verifyPaymentSignature([
            'razorpay_order_id' => $orderId,
            'razorpay_payment_id' => $paymentId,
            'razorpay_signature' => $signature,
        ]);
    }

    public function verifyWebhookSignature(string $body, string $signature): bool
    {
        $secret = (string) config('services.razorpay.webhook_secret');
        return $secret !== '' && hash_equals(hash_hmac('sha256', $body, $secret), $signature);
    }

    public function payment(string $paymentId): array
    {
        return $this->api()->payment->fetch($paymentId)->toArray();
    }

    public function capture(string $paymentId, int $amountPaise): array
    {
        return $this->api()->payment->fetch($paymentId)->capture([
            'amount' => $amountPaise,
            'currency' => 'INR',
        ])->toArray();
    }

    public function refund(string $paymentId, int $amountPaise): void
    {
        $this->api()->payment->fetch($paymentId)->refund(['amount' => $amountPaise]);
    }

    private function api(): Api
    {
        return new Api(config('services.razorpay.key'), config('services.razorpay.secret'));
    }
}
