<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pincode extends Model
{
    protected $table = 'pincodes';

    public $timestamps = false;

    protected $guarded = ['id'];

    public static function matchesIndianAddress(string $pin, string $state): bool
    {
        if (!preg_match('/^[1-9][0-9]{5}$/', $pin)) {
            return false;
        }

        return self::where('pincode', $pin)->whereRaw('UPPER(state) = ?', [self::canonicalIndianState($state)])->exists();
    }

    public static function canonicalIndianState(string $state): string
    {
        return match (strtoupper(trim($state))) {
            'PONDICHERRY' => 'PUDUCHERRY',
            'DADRA AND NAGAR HAVELI', 'DAMAN AND DIU' => 'THE DADRA AND NAGAR HAVELI AND DAMAN AND DIU',
            default => strtoupper(trim($state)),
        };
    }
}
