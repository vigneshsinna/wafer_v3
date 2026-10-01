<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasIndex('pincodes', 'pincodes_pincode_state_index')) {
            Schema::table('pincodes', fn (Blueprint $table) => $table->index(['pincode', 'state'], 'pincodes_pincode_state_index'));
        }
        if (Schema::hasIndex('pincodes', 'pincodes_pincode_index')) {
            Schema::table('pincodes', fn (Blueprint $table) => $table->dropIndex('pincodes_pincode_index'));
        }
    }

    public function down(): void
    {
        if (Schema::hasIndex('pincodes', 'pincodes_pincode_state_index')) {
            Schema::table('pincodes', fn (Blueprint $table) => $table->dropIndex('pincodes_pincode_state_index'));
        }
        if (!Schema::hasIndex('pincodes', 'pincodes_pincode_index')) {
            Schema::table('pincodes', fn (Blueprint $table) => $table->index('pincode'));
        }
    }
};
