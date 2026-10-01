<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (!Schema::hasTable('element_types') || !Schema::hasTable('business_settings')) return;
        DB::transaction(function () {
            $header = DB::table('element_types')->where('element_id', 1)->where('name', 'Wafer King')->first();
            $headerId = $header ? $header->id : DB::table('element_types')->insertGetId(['element_id' => 1, 'name' => 'Wafer King', 'is_default' => 1]);
            $colors = ['top_header_bg_color' => '#412700', 'top_header_text_color' => '#edbe84',
                'middle_header_bg_color' => '#fdf9f3', 'middle_header_text_color' => '#3e2723',
                'bottom_header_bg_color' => '#fdf9f3', 'bottom_header_text_color' => '#3e2723'];
            foreach ($colors as $name => $value) {
                if (!DB::table('element_styles')->where('element_type_id', $headerId)->where('name', $name)->exists()) {
                    DB::table('element_styles')->insert(['element_type_id' => $headerId, 'name' => $name, 'value' => $value]);
                }
            }
            $legacyIds = DB::table('element_types')->where('element_id', 1)->get()->filter(fn ($type) => preg_match('/^header[1-6]$/i', str_replace(' ', '', $type->name)))->pluck('id');
            DB::table('element_types')->whereIn('id', $legacyIds)->update(['is_default' => 0]);
            $selected = DB::table('business_settings')->where('type', 'header_element')->value('value');
            if (!$selected || $legacyIds->contains($selected)) {
                DB::table('business_settings')->updateOrInsert(['type' => 'header_element'], ['value' => (string) $headerId]);
                foreach ($colors as $type => $value) {
                    DB::table('business_settings')->updateOrInsert(['type' => $type], ['value' => $value]);
                }
            }
        });
        Cache::forget('business_settings');
    }

    public function down(): void
    {
        // Preserve the branded layout and any later admin edits.
    }
};
