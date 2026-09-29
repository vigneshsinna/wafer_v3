<?php

namespace App\Http\Controllers\Api\V3;

use App\Models\Blog;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    public function index(): JsonResponse
    {
        $blogs = Blog::with('category')->published()->latest()->paginate(12);

        return $this->successResponse([
            'items' => $blogs->getCollection()->map(fn (Blog $blog) => $this->present($blog))->all(),
            'pagination' => [
                'current_page' => $blogs->currentPage(),
                'last_page' => $blogs->lastPage(),
                'per_page' => $blogs->perPage(),
                'total' => $blogs->total(),
            ],
        ]);
    }

    public function show(string $slug): JsonResponse
    {
        $blog = Blog::with('category')->published()->where('slug', $slug)->first();
        if (!$blog) {
            return $this->notFoundResponse('Article not found');
        }

        return $this->successResponse($this->present($blog, true));
    }

    private function present(Blog $blog, bool $includeBody = false): array
    {
        $data = [
            'title' => $blog->title,
            'slug' => $blog->slug,
            'excerpt' => trim(html_entity_decode(strip_tags((string) $blog->short_description), ENT_QUOTES | ENT_HTML5, 'UTF-8')),
            'image_url' => $blog->banner ? uploaded_asset($blog->banner) : null,
            'category' => $blog->category?->category_name,
            'published_at' => $blog->created_at?->toIso8601String(),
        ];

        if ($includeBody) {
            $data['body'] = trim(html_entity_decode(strip_tags(preg_replace('/<\/(p|div|h[1-6]|li|ul|ol)>/i', "\n\n", (string) $blog->description)), ENT_QUOTES | ENT_HTML5, 'UTF-8'));
        }

        return $data;
    }
}
