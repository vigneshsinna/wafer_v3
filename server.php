<?php

/**
 * Laravel - A PHP Framework For Web Artisans
 *
 * @package  Laravel
 * @author   Taylor Otwell <taylor@laravel.com>
 */

$uri = urldecode(
    parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH)
);

$publicFile = __DIR__ . '/public' . $uri;

// This file allows us to emulate Apache's "mod_rewrite" functionality from the
// built-in PHP web server.
if ($uri !== '/' && file_exists($publicFile) && !is_dir($publicFile)) {
    // If the built-in server's document root is already public/, return false lets PHP serve it natively.
    if (isset($_SERVER['DOCUMENT_ROOT']) && realpath($_SERVER['DOCUMENT_ROOT']) === realpath(__DIR__ . '/public')) {
        return false;
    }

    // If the document root is the repo root, PHP's return false would look in root instead of public/ and return 404.
    // Directly stream the static asset with proper Content-Type:
    $mimeTypes = [
        'css'   => 'text/css',
        'js'    => 'application/javascript',
        'json'  => 'application/json',
        'png'   => 'image/png',
        'jpg'   => 'image/jpeg',
        'jpeg'  => 'image/jpeg',
        'gif'   => 'image/gif',
        'svg'   => 'image/svg+xml',
        'webp'  => 'image/webp',
        'ico'   => 'image/x-icon',
        'woff'  => 'font/woff',
        'woff2' => 'font/woff2',
        'ttf'   => 'font/ttf',
        'eot'   => 'application/vnd.ms-fontobject',
        'map'   => 'application/json',
        'txt'   => 'text/plain',
    ];

    $ext = strtolower(pathinfo($publicFile, PATHINFO_EXTENSION));
    $mime = $mimeTypes[$ext] ?? (function_exists('mime_content_type') ? @mime_content_type($publicFile) : null) ?: 'application/octet-stream';

    header("Content-Type: {$mime}");
    header("Content-Length: " . filesize($publicFile));
    readfile($publicFile);
    exit;
}

require_once __DIR__ . '/public/index.php';
