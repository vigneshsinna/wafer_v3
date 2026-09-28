<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class EnableIndianShippingLocations extends Migration
{
    public function up(): void
    {
        $india = DB::table('countries')->where('code', 'IN')->value('id');
        if (!$india) return;
        DB::table('countries')->where('id', $india)->update(['status' => 1]);
        DB::table('states')->where('country_id', $india)->update(['status' => 1]);
        DB::table('cities')->whereIn('state_id', DB::table('states')->where('country_id', $india)->select('id'))
            ->update(['status' => 1]);
    }

    public function down(): void
    {
        // Preserve locations that an administrator may have edited.
    }
}
