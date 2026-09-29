<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $path = database_path('data/india-pincodes-2026.csv');
        $handle = fopen($path, 'r');
        if ($handle === false) {
            throw new RuntimeException("PIN directory missing: {$path}");
        }

        try {
            $header = fgetcsv($handle);
            if (!$header || !in_array('pincode', $header, true) || !in_array('statename', $header, true)) {
                throw new RuntimeException('PIN directory has invalid columns.');
            }
            $columns = array_flip($header);
            $existing = [];
            foreach (DB::table('pincodes')->select('pincode', 'state')->cursor() as $row) {
                $existing[$row->pincode.'|'.strtoupper((string) $row->state)] = true;
            }

            $batch = [];
            while (($row = fgetcsv($handle)) !== false) {
                $pin = $row[$columns['pincode']] ?? '';
                $state = $row[$columns['statename']] ?? '';
                $key = $pin.'|'.strtoupper($state);
                if (!preg_match('/^[1-9][0-9]{5}$/', $pin) || !$state || isset($existing[$key])) {
                    continue;
                }
                $existing[$key] = true;
                $batch[] = ['pincode' => $pin, 'state' => $state, 'district' => $row[$columns['district']] ?? null];
                if (count($batch) === 1000) {
                    DB::table('pincodes')->insert($batch);
                    $batch = [];
                }
            }
            if ($batch) {
                DB::table('pincodes')->insert($batch);
            }
        } finally {
            fclose($handle);
        }
    }

    public function down(): void
    {
        // Keep reference rows because existing directory entries are indistinguishable from imported rows.
    }
};
