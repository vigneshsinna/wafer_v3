<?php

namespace App\Http\Controllers\Api\V3;

use App\Services\Checkout\CheckoutService;
use App\Services\Checkout\StorefrontPurchaseService;
use App\Services\Payment\RazorpayGateway;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    public function paymentConfig(RazorpayGateway $gateway): JsonResponse
    {
        return $this->successResponse(['available' => $gateway->isAvailable(), 'method' => 'razorpay']);
    }

    public function startPayment(Request $request, StorefrontPurchaseService $purchase): JsonResponse
    {
        $data = $request->validate(['address_id' => 'required|integer', 'carrier_id' => 'nullable|integer']);
        try {
            return $this->createdResponse($purchase->start($request->user()->id, $data['address_id'], $data['carrier_id'] ?? null));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Shipping address not found.');
        } catch (\InvalidArgumentException $e) {
            return $this->errorResponse($e->getMessage(), 422, 'CHECKOUT_UNAVAILABLE');
        }
    }

    public function confirmPayment(Request $request, StorefrontPurchaseService $purchase): JsonResponse
    {
        $data = $request->validate([
            'razorpay_order_id' => 'required|string|max:100',
            'razorpay_payment_id' => 'required|string|max:100',
            'razorpay_signature' => 'required|string|max:200',
        ]);
        try {
            $order = $purchase->confirm($request->user()->id, $data['razorpay_order_id'], $data['razorpay_payment_id'], $data['razorpay_signature']);
            return $this->successResponse(['order_code' => $order->code]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Payment attempt not found.');
        } catch (\InvalidArgumentException|\Razorpay\Api\Errors\SignatureVerificationError $e) {
            return $this->errorResponse($e->getMessage(), 422, 'PAYMENT_NOT_CONFIRMED');
        }
    }

    public function razorpayWebhook(Request $request, StorefrontPurchaseService $purchase, RazorpayGateway $gateway): JsonResponse
    {
        if (!$gateway->verifyWebhookSignature($request->getContent(), (string) $request->header('X-Razorpay-Signature'))) {
            return $this->errorResponse('Invalid webhook signature.', 401, 'UNAUTHORIZED');
        }
        if ($request->input('event') === 'payment.captured') {
            $payment = $request->input('payload.payment.entity', []);
            if (!empty($payment['order_id']) && !empty($payment['id'])) {
                $purchase->webhook($payment['order_id'], $payment['id']);
            }
        }
        return $this->successResponse(['received' => true]);
    }

    public function validateCart(Request $request, CheckoutService $checkout): JsonResponse
    {
        try {
            return $this->successResponse($checkout->validateCheckout($request->user()->id));
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 422, 'VALIDATION_FAILED');
        }
    }

    public function summary(Request $request, CheckoutService $checkout): JsonResponse
    {
        $data = $request->validate(['address_id' => 'required|integer', 'carrier_id' => 'nullable|integer']);
        try {
            return $this->successResponse($checkout->summary($request->user()->id, $data['address_id'], $data['carrier_id'] ?? null));
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return $this->notFoundResponse('Shipping address not found.');
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage(), 422, 'VALIDATION_FAILED');
        }
    }
}
