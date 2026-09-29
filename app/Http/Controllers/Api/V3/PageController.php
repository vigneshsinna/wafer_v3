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
            'faq_sections' => $slug === 'faq' ? $this->faqSections($html) : null,
        ]);
    }

    private function faqSections(string $html): array
    {
        if ($html === '') {
            return [];
        }
        $document = new \DOMDocument();
        $previous = libxml_use_internal_errors(true);
        $document->loadHTML('<?xml encoding="utf-8" ?>' . $html);
        libxml_clear_errors();
        libxml_use_internal_errors($previous);
        $sections = [];
        foreach ((new \DOMXPath($document))->query('//h2|//h3|//p') as $node) {
            $value = trim($node->textContent);
            if ($value === '') {
                continue;
            }
            if ($node->nodeName === 'h2') {
                $sections[] = ['title' => $value, 'questions' => []];
            } elseif ($node->nodeName === 'h3' && $sections) {
                $last = count($sections) - 1;
                $sections[$last]['questions'][] = ['question' => $value, 'answer' => ''];
            } elseif ($node->nodeName === 'p' && $sections) {
                $last = count($sections) - 1;
                $question = count($sections[$last]['questions']) - 1;
                if ($question >= 0) {
                    $sections[$last]['questions'][$question]['answer'] .= ($sections[$last]['questions'][$question]['answer'] ? "\n" : '') . $value;
                }
            }
        }
        return $sections;
    }
}
