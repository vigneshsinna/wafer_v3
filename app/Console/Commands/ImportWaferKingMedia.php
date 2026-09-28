<?php

namespace App\Console\Commands;

use App\Models\Product;
use App\Models\Upload;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class ImportWaferKingMedia extends Command
{
    protected $signature = 'waferking:import-media {--dry-run : Check source files without changing products or uploads}';
    protected $description = 'Attach existing Wafer King product images to matching Laravel products';

    private const IMAGES = [
        'hibiscus-wafer-biscuit' => 'hibiscus-wafer.png',
        'avarampoo-wafer-biscuit' => 'avarampoo-wafer.png',
        'vallarai-wafer-biscuit' => 'vallarai-wafer.png',
        'makhana-wafer-biscuit' => 'makhana-wafer.png',
    ];

    public function handle(): int
    {
        $sourceDir = base_path('storefront/public/images');
        foreach (self::IMAGES as $file) {
            if (!is_file($sourceDir . DIRECTORY_SEPARATOR . $file)) {
                $this->error("Missing source image: {$file}");
                return self::FAILURE;
            }
        }
        if ($this->option('dry-run')) {
            foreach (self::IMAGES as $slug => $file) {
                $this->line("{$slug}: {$file}");
            }
            return self::SUCCESS;
        }

        $disk = Storage::disk(config('filesystems.default'));
        $missing = 0;
        foreach (self::IMAGES as $slug => $file) {
            $product = Product::where('slug', $slug)->first();
            if (!$product) {
                $this->warn("Product missing: {$slug}");
                $missing++;
                continue;
            }
            if ($product->thumbnail_img && $product->photos) {
                $this->line("Existing media kept: {$slug}");
                continue;
            }

            $source = $sourceDir . DIRECTORY_SEPARATOR . $file;
            $path = 'uploads/all/waferking-' . $file;
            $contents = file_get_contents($source);
            if ($contents === false) {
                $this->error("Cannot read {$file}");
                return self::FAILURE;
            }
            if ($disk->exists($path)) {
                if (hash('sha256', $disk->get($path)) !== hash('sha256', $contents)) {
                    $this->error("Existing media path has different content: {$path}");
                    return self::FAILURE;
                }
            } elseif (!$disk->put($path, $contents)) {
                $this->error("Cannot store {$file}");
                return self::FAILURE;
            }

            $upload = Upload::firstOrCreate(['file_name' => $path], [
                'file_original_name' => pathinfo($file, PATHINFO_FILENAME),
                'user_id' => $product->user_id,
                'extension' => 'png',
                'type' => 'image',
                'file_size' => round(strlen($contents) / 1024, 2) . ' kb',
            ]);
            if (!$product->thumbnail_img) {
                $product->thumbnail_img = $upload->id;
            }
            if (!$product->photos) {
                $product->photos = (string) $upload->id;
            }
            $product->save();
            $this->info("Media attached: {$slug}");
        }

        return $missing === 0 ? self::SUCCESS : self::FAILURE;
    }
}
