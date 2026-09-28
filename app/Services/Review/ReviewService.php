<?php

namespace App\Services\Review;

use App\Models\OrderDetail;
use App\Models\Product;
use App\Models\Review;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\DB;

class ReviewService
{
    public function listPublic(string $slug, int $perPage): LengthAwarePaginator
    {
        $product = Product::where('slug', $slug)->where('published', 1)->firstOrFail();

        return Review::where('product_id', $product->id)
            ->where('status', 1)
            ->with('user')
            ->latest()
            ->paginate($perPage);
    }

    public function summary(string $slug): array
    {
        $product = Product::where('slug', $slug)->where('published', 1)->firstOrFail();
        $counts = Review::where('product_id', $product->id)
            ->where('status', 1)
            ->selectRaw('rating, COUNT(*) as total')
            ->groupBy('rating')
            ->pluck('total', 'rating');
        $total = (int) $counts->sum();
        $weighted = $counts->reduce(fn ($sum, $count, $rating) => $sum + (int) $rating * (int) $count, 0);

        return [
            'average_rating' => $total ? round($weighted / $total, 1) : 0,
            'total_reviews' => $total,
            'rating_distribution' => [
                1 => (int) ($counts[1] ?? 0),
                2 => (int) ($counts[2] ?? 0),
                3 => (int) ($counts[3] ?? 0),
                4 => (int) ($counts[4] ?? 0),
                5 => (int) ($counts[5] ?? 0),
            ],
        ];
    }

    public function listMine(int $userId): Collection
    {
        return Review::where('user_id', $userId)->with('product')->latest()->get();
    }

    public function create(string $slug, int $userId, array $data): Review
    {
        return DB::transaction(function () use ($slug, $userId, $data) {
            User::whereKey($userId)->lockForUpdate()->firstOrFail();
            $product = Product::where('slug', $slug)->where('published', 1)->firstOrFail();
            if (Review::where('product_id', $product->id)->where('user_id', $userId)->exists()) {
                throw new \InvalidArgumentException('You have already reviewed this product.');
            }
            if (!OrderDetail::where('product_id', $product->id)
                ->where('delivery_status', 'delivered')
                ->whereHas('order', fn ($query) => $query->where('user_id', $userId)->where('payment_status', 'paid'))
                ->exists()) {
                throw new \InvalidArgumentException('You can review this product after delivery.');
            }

            $review = new Review();
            $review->product_id = $product->id;
            $review->user_id = $userId;
            $review->rating = $data['rating'];
            $review->comment = $data['comment'];
            $review->status = 0;
            $review->viewed = 0;
            $review->save();

            return $review->load('user', 'product');
        });
    }

    public function update(int $id, int $userId, array $data): Review
    {
        return DB::transaction(function () use ($id, $userId, $data) {
            $review = Review::whereKey($id)->where('user_id', $userId)->lockForUpdate()->firstOrFail();
            $wasApproved = (bool) $review->status;
            $review->rating = $data['rating'];
            $review->comment = $data['comment'];
            $review->status = 0;
            $review->viewed = 0;
            $review->save();
            if ($wasApproved) $this->refreshProductRating($review->product_id);

            return $review->load('user', 'product');
        });
    }

    public function delete(int $id, int $userId): void
    {
        DB::transaction(function () use ($id, $userId) {
            $review = Review::whereKey($id)->where('user_id', $userId)->lockForUpdate()->firstOrFail();
            $productId = $review->product_id;
            $wasApproved = (bool) $review->status;
            $review->delete();
            if ($wasApproved) $this->refreshProductRating($productId);
        });
    }

    private function refreshProductRating(int $productId): void
    {
        $rating = Review::where('product_id', $productId)->where('status', 1)->avg('rating');
        Product::whereKey($productId)->update(['rating' => $rating ?? 0]);
    }
}
