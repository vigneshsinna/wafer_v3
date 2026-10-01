<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasTable('pages') && !DB::table('pages')->where('slug', 'home')->exists()) {
            DB::table('pages')->insert(['slug' => 'home', 'type' => 'home_page', 'title' => 'Home', 'content' => '[]']);
        }
    }

    public function down(): void
    {
        // Preserve the page: admins may have edited its content after migration.
    }
};
