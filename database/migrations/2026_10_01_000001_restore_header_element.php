<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        if (Schema::hasTable('elements')) {
            // Header layouts use the built-in element ID 1 throughout the admin.
            DB::table('elements')->insertOrIgnore(['id' => 1, 'name' => 'Header']);
        }
    }

    public function down(): void
    {
        // Keep the repaired parent: deleting it would orphan existing layouts.
    }
};
