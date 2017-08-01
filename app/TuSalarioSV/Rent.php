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
