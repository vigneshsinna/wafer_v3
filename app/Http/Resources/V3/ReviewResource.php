<?php

namespace App\Http\Resources\V3;

use App\Models\OrderDetail;
use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    public function toArray($request): array
    {
        $verified = $this->user_id && OrderDetail::where('product_id', $this->product_id)
            ->where('delivery_status', 'delivered')
            ->whereHas('order', fn ($query) => $query->where('user_id', $this->user_id)->where('payment_status', 'paid'))
            ->exists();

        return [
            'id' => $this->id,
            'product_id' => $this->product_id,
            'product_name' => $this->whenLoaded('product', fn () => $this->product?->getTranslation('name')),
            'user_name' => $this->user?->name ? explode(' ', trim($this->user->name))[0] : 'Customer',
            'rating' => (int) $this->rating,
            'comment' => $this->comment,
            'is_verified_purchase' => (bool) $verified,
            'is_approved' => (bool) $this->status,
            'created_at' => $this->created_at?->toIso8601String(),
            'updated_at' => $this->updated_at?->toIso8601String(),
        ];
    }
}
