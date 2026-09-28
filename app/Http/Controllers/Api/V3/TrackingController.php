<?php

namespace App\Http\Controllers\Api\V3;

use App\Services\Order\OrderQueryService;
use Illuminate\Http\JsonResponse;

class TrackingController extends Controller
{
    public function show(string $code, OrderQueryService $orders): JsonResponse
    {
        return $this->successResponse($orders->getPublicTracking($code));
    }
}
