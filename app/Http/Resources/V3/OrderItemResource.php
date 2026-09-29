<?php

namespace App\Http\Resources\V3;

use Illuminate\Http\Resources\Json\JsonResource;

class OrderItemResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'id'              => $this->id,
            'product_id'      => $this->product_id,
            'product_name'    => $this->product ? $this->product->getTranslation('name') : null,
            'thumbnail_url'   => $this->product && $this->product->thumbnail_img ? uploaded_asset($this->product->thumbnail_img) : null,
            'variation'       => $this->variation,
            'quantity'        => (int) $this->quantity,
            'price'           => (float) $this->price,
            'tax'             => (float) $this->tax,
            'shipping_cost'   => (float) $this->shipping_cost,
            'delivery_status' => $this->delivery_status,
            'created_at'      => $this->created_at?->toIso8601String(),
            'updated_at'      => $this->updated_at?->toIso8601String(),
        ];
    }
}
