<?php

namespace App\Http\Resources\V3;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Services\Catalog\ProductCatalogService;
use App\Models\Product;
use App\Models\Upload;
use Illuminate\Contracts\Pagination\Paginator;

/**
 * V3 Product Resource — single product representation.
 */
class ProductResource extends JsonResource
{
    public static function collection($resource)
    {
        $products = collect($resource instanceof Paginator ? $resource->items() : $resource)
            ->filter(fn ($item) => $item instanceof Product);
        $ids = $products->flatMap(fn ($product) => array_filter(
            explode(',', (string) $product->photos),
            fn ($id) => $id !== '' && (string) $id !== (string) $product->thumbnail_img
        ))->unique();

        if ($ids->isNotEmpty()) {
            $uploads = Upload::whereIn('id', $ids)->get()->keyBy('id');
            $products->each(fn ($product) => $product->setRelation('gallery_uploads', $uploads));
        }

        return parent::collection($resource);
    }

    public function toArray($request): array
    {
        $prices = (new ProductCatalogService())->displayPrices($this->resource);
        $thumbnailUrl = $this->thumbnail_img
            ? ($this->thumbnail
                ? ($this->thumbnail->external_link ?? my_asset($this->thumbnail->file_name))
                : static_asset('assets/img/placeholder.svg'))
            : null;
        return [
            'id'                => $this->id,
            'name'              => $this->getTranslation('name'),
            'slug'              => $this->slug,
            'description'       => $this->getTranslation('description'),
            'description_text'  => trim(html_entity_decode(strip_tags((string) $this->getTranslation('description')), ENT_QUOTES | ENT_HTML5, 'UTF-8')),
            'unit_price'        => (float) $this->unit_price,
            'sale_price'        => $prices['sale'],
            'compare_at_price'  => $prices['compare_at'],
            'discount'          => (float) $this->discount,
            'discount_type'     => $this->discount_type,
            'discount_start'    => $this->discount_start_date,
            'discount_end'      => $this->discount_end_date,
            'thumbnail_url'     => $thumbnailUrl,
            'photos'            => $this->photos ? array_map(function ($id) use ($thumbnailUrl) {
                if ($thumbnailUrl && (string) $id === (string) $this->thumbnail_img) return $thumbnailUrl;
                if ($this->resource->relationLoaded('gallery_uploads')) {
                    $upload = $this->resource->getRelation('gallery_uploads')->get($id);
                    return $upload ? ($upload->external_link ?? my_asset($upload->file_name)) : static_asset('assets/img/placeholder.svg');
                }
                return uploaded_asset($id);
            }, explode(',', $this->photos)) : [],
            'category'          => $this->main_category ? [
                'id'   => $this->main_category->id,
                'name' => $this->main_category->getTranslation('name'),
                'slug' => $this->main_category->slug,
            ] : null,
            'brand'             => $this->brand ? [
                'id'   => $this->brand->id,
                'name' => $this->brand->name,
                'slug' => $this->brand->slug,
            ] : null,
            'rating'            => (float) ($this->rating ?? 0),
            'rating_count'      => (int) ($this->approved_reviews_count ?? ($this->relationLoaded('reviews')
                ? $this->reviews->where('status', 1)->count()
                : $this->reviews()->where('status', 1)->count())),
            'num_of_sale'       => (int) $this->num_of_sale,
            'stock_status'      => (array_key_exists('stock_quantity', $this->resource->getAttributes())
                ? $this->stock_quantity
                : ($this->relationLoaded('stocks') ? $this->stocks->sum('qty') : $this->stocks()->sum('qty'))) > 0
                ? 'in_stock' : 'out_of_stock',
            'min_qty'           => (int) $this->min_qty,
            'digital'           => (bool) $this->digital,
            'featured'          => (bool) $this->featured,
            'todays_deal'       => (bool) $this->todays_deal,
            'unit'              => $this->unit,
            'tags'              => $this->tags ? explode(',', $this->tags) : [],
            'meta_title'        => $this->meta_title,
            'meta_description'  => $this->meta_description,
            'created_at'        => $this->created_at?->toIso8601String(),
            'updated_at'        => $this->updated_at?->toIso8601String(),
        ];
    }
}
