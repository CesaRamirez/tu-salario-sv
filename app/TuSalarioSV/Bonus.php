<?php

namespace App\TuSalarioSV;

use Illuminate\Database\Eloquent\Model;

class Bonus extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['days', 'start', 'end'];

    /**
     * Get days from bonus register.
     *
     * @param int $id
     *
     * @return int
     */
    public function days(int $id): int
    {
        return $this->find($id)->first()->days;
    }
}
