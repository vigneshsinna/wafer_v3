<?php

namespace App\Http\Controllers\Api\V3;

use App\Models\Page;
use Illuminate\Http\JsonResponse;

class PageController extends Controller
{
    public function show(string $slug): JsonResponse
    {
        $page = Page::where('slug', $slug)->where('type', 'custom_page')->firstOrFail();
        $html = (string) $page->getTranslation('content');
        $text = trim(html_entity_decode(strip_tags(preg_replace('/<\/(p|div|h[1-6]|li|ul|ol)>/i', "\n", $html)), ENT_QUOTES | ENT_HTML5, 'UTF-8'));

        return $this->successResponse([
            'slug' => $page->slug,
            'title' => $page->getTranslation('title'),
            'content' => $text,
            'meta_title' => $page->meta_title,
            'meta_description' => $page->meta_description,
        ]);
    }
}
