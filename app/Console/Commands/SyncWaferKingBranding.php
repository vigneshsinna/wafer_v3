<?php

namespace App\Console\Commands;

use App\Models\BusinessSetting;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class SyncWaferKingBranding extends Command
{
    protected $signature = 'waferking:sync-branding {--dry-run : Preview changes without saving}';
    protected $aliases = ['shivarudraksha:sync'];
    protected $description = 'Replace missing or legacy branding while preserving admin edits and catalog data';

    public function handle(): int
    {
        $defaults = [
            'website_name' => 'Wafer King',
            'site_name' => 'Wafer King',
            'system_name' => 'Wafer King',
            'frontend_title' => 'Wafer King',
            'site_motto' => 'Premium Quality Wafer Snacks',
            'meta_title' => 'Wafer King | Premium Quality Wafer Snacks',
            'meta_description' => 'Shop Wafer King black rice wafers in Hibiscus, Avarampoo, Vallarai and Makhana flavours.',
            'meta_keywords' => 'wafer king, black rice wafers, wafer biscuits, hibiscus, avarampoo, vallarai, makhana',
            'homepage_select' => 'waferking',
            'authentication_layout_select' => 'boxed',
            'rudraspirit_root_category' => 'wafer-biscuits',
        ];
        $changed = 0;
        DB::transaction(function () use ($defaults, &$changed): void {
            foreach ($defaults as $type => $value) {
                $settings = BusinessSetting::where('type', $type)->lockForUpdate()->get();
                if ($settings->isEmpty()) {
                    $setting = new BusinessSetting();
                    $setting->type = $type;
                    $settings->push($setting);
                }
                foreach ($settings as $setting) {
                    $current = trim((string) $setting->value);
                    if ($current !== '' && !preg_match('/rudra|shiva|mukhi|zolo\s*cart/i', $current)) {
                        continue;
                    }
                    $this->line("{$type}: {$value}");
                    $changed++;
                    if (!$this->option('dry-run')) {
                        $setting->value = $value;
                        $setting->save();
                    }
                }
            }
        });
        if (!$this->option('dry-run')) {
            Cache::forget('business_settings');
        }
        $this->info($this->option('dry-run') ? "Would update {$changed} settings." : "Updated {$changed} settings.");
        return self::SUCCESS;
    }
}
