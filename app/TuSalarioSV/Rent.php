<?php

namespace App\TuSalarioSV;

use Illuminate\Database\Eloquent\Model;

class Rent extends Model
{
    protected $fillable = ['section', 'since', 'until', 'percentage', 'excess', 'fee', 'type'];

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
     *     *.
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
}
