<?php

namespace App\TuSalarioSV;

use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
            'section',
            'since',
            'until',
            'percentage',
            'excess',
            'fee',
            'type',
        ];

    /**
     * The storage format of the model's date columns.
     *
     * @var string
     */
    protected $dates = ['created_at', 'updated_at'];

    /**
     * Return Type Rent.
     *
     * @return string
     */
    public function getTypeRentAttribute()
    {
        return $this->attributes['type'] == 1 ? 'Mensual' : 'Quincenal';
    }

    /**
     * Return Section Name.
     *
     * @return string
     */
    public function getSectionNameAttribute()
    {
        $value = $this->attributes['section'];

        switch ($value) {
            case 1:
                return 'Tramo I';
                break;
            case 2:
                return 'Tramo II';
                break;
            case 3:
                return 'Tramo III';
                break;
            case 4:
                return 'Tramo IV';
                break;
        }
    }

    public function getUntilStringAttribute()
    {
        $fee = $this->attributes['until'];

        return $fee > 99999 ? 'En Adelante' : $fee;
    }

    public function getPercentageStringAttribute()
    {
        $percentage = $this->attributes['percentage'];

        return $percentage > 0 ? $percentage.'%' : 'Sin Retención';
    }

    /**
     * Rent Table Calculation.
     *
     * @param float $mount
     * @param int   $type
     *
     * @return float
     */
    public function calculation(float $mount, int $type): float
    {
        $rent = $this->where('since', '<=', $mount)
                     ->where('until', '>=', $mount)
                     ->where('type', $type)->first();
        $excess = $mount - $rent->excess;
        $percentage = $excess * $rent->percentage / 100;
        $total = $percentage + $rent->fee;

        return round($total, 2, PHP_ROUND_HALF_DOWN);
    }
}
